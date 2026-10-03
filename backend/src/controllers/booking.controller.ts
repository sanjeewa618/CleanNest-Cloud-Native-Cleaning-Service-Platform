import { Response } from 'express';
import { AuthRequest } from '../middlewares/auth.middleware';
import prisma from '../utils/prisma';
import { z } from 'zod';

const bookingSchema = z.object({
  serviceType: z.string(),
  date: z.string(),
  timeSlot: z.string(),
  price: z.number(),
  address: z.string(),
  cleanerId: z.string().optional(),
  customerName: z.string().optional(),
  customerEmail: z.string().optional(),
  cleanerName: z.string().optional(),
  cleanerEmail: z.string().optional(),
  notes: z.string().optional()
});

export const createBooking = async (req: AuthRequest, res: Response) => {
  try {
    const customerId = req.user?.id;
    if (!customerId) return res.status(401).json({ error: 'Unauthorized' });

    const validatedData = bookingSchema.parse(req.body);

    // Resolve customerName & customerEmail from database or token
    let customerName = validatedData.customerName;
    let customerEmail = validatedData.customerEmail;
    if (!customerName || !customerEmail) {
      const cust = await prisma.user.findUnique({
        where: { id: customerId },
        select: { name: true, email: true }
      });
      if (!customerName) customerName = cust?.name || 'Customer';
      if (!customerEmail) customerEmail = cust?.email || undefined;
    }

    // Resolve cleanerName & cleanerEmail from database if cleanerId is provided
    let cleanerName = validatedData.cleanerName;
    let cleanerEmail = validatedData.cleanerEmail;
    let resolvedCleanerId = validatedData.cleanerId;

    if (resolvedCleanerId) {
      const cln = await prisma.user.findUnique({
        where: { id: resolvedCleanerId },
        select: { id: true, name: true, email: true }
      });
      if (cln) {
        // Valid cleaner in DB - use their details
        if (!cleanerName) cleanerName = cln.name;
        if (!cleanerEmail) cleanerEmail = cln.email;
      } else {
        // cleanerId does not match any DB user - try lookup by name/email fallback
        console.warn(`[createBooking] cleanerId ${resolvedCleanerId} not found in DB - searching by name/email`);
        resolvedCleanerId = undefined; // unset invalid FK

        // Try to find cleaner by email or name passed from frontend
        if (cleanerEmail || cleanerName) {
          const fallbackCleaner = await prisma.user.findFirst({
            where: {
              role: 'CLEANER',
              OR: [
                ...(cleanerEmail ? [{ email: cleanerEmail }] : []),
                ...(cleanerName ? [{ name: cleanerName }] : [])
              ]
            },
            select: { id: true, name: true, email: true }
          });
          if (fallbackCleaner) {
            resolvedCleanerId = fallbackCleaner.id;
            if (!cleanerName) cleanerName = fallbackCleaner.name;
            if (!cleanerEmail) cleanerEmail = fallbackCleaner.email;
          }
        }
      }
    }

    const booking = await prisma.booking.create({
      data: {
        ...validatedData,
        date: new Date(validatedData.date),
        customerId,
        customerName,
        customerEmail,
        cleanerId: resolvedCleanerId,
        cleanerName,
        cleanerEmail
      } as any
    });

    res.status(201).json(booking);
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    console.error('Failed to create booking', error);
    res.status(500).json({ error: 'Failed to create booking' });
  }
};

export const getMyBookings = async (req: AuthRequest, res: Response) => {
  try {
    const authHeader = req.headers.authorization;
    let userId = req.user?.id;
    let role = req.user?.role;

    if (!userId && authHeader && authHeader.startsWith('Bearer ')) {
      try {
        const { verifyToken } = require('../utils/jwt');
        const decoded: any = verifyToken(authHeader.split(' ')[1]);
        userId = decoded?.id;
        role = decoded?.role;
      } catch (e) {
        // ignore
      }
    }

    const userRole = (role || '').toUpperCase();
    let bookings;
    if (userRole === 'CUSTOMER' && userId) {
      const customerUser = await prisma.user.findUnique({
        where: { id: userId },
        select: { id: true, email: true, name: true }
      });
      const userEmail = customerUser?.email || req.user?.email;
      const userName = customerUser?.name || req.user?.name;

      bookings = await prisma.booking.findMany({
        where: {
          OR: [
            { customerId: userId },
            ...(userEmail ? [{ customerEmail: userEmail } as any] : []),
            ...(userName ? [{ customerName: userName } as any] : [])
          ]
        },
        include: {
          cleaner: { select: { id: true, name: true, avatar: true, phone: true } },
          customer: { select: { id: true, name: true, phone: true, email: true } }
        },
        orderBy: { createdAt: 'desc' }
      });
    } else if (userRole === 'CLEANER' && userId) {
      const cleanerUser = await prisma.user.findUnique({
        where: { id: userId },
        select: { id: true, email: true, name: true }
      });
      const userEmail = cleanerUser?.email || req.user?.email;
      const userName = cleanerUser?.name || req.user?.name;

      bookings = await prisma.booking.findMany({
        where: {
          OR: [
            { cleanerId: userId },
            ...(userEmail ? [{ cleanerEmail: userEmail } as any] : []),
            ...(userName ? [{ cleanerName: userName } as any] : [])
          ]
        },
        include: {
          customer: { select: { id: true, name: true, phone: true, email: true } },
          cleaner: { select: { id: true, name: true, avatar: true, phone: true } }
        },
        orderBy: { createdAt: 'desc' }
      });
    } else {
      bookings = await prisma.booking.findMany({
        include: {
          cleaner: { select: { id: true, name: true, avatar: true, phone: true } },
          customer: { select: { id: true, name: true, phone: true, email: true } }
        },
        orderBy: { createdAt: 'desc' }
      }); // admin / global
    }

    res.json(bookings);
  } catch (error) {
    console.error('Failed to fetch bookings', error);
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
};

export const updateBookingStatus = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    let prismaStatus: any = 'PENDING';
    const s = (status || '').toLowerCase();
    if (s === 'accepted') prismaStatus = 'CONFIRMED';
    else if (s === 'on_the_way') prismaStatus = 'ON_THE_WAY';
    else if (s === 'in_progress') prismaStatus = 'IN_PROGRESS';
    else if (s === 'completed') prismaStatus = 'COMPLETED';
    else if (s === 'cancelled') prismaStatus = 'CANCELLED';
    else prismaStatus = (status || '').toUpperCase();

    // Check if booking exists in DB
    const existing = await prisma.booking.findFirst({
      where: {
        OR: [
          { id },
          { id: { startsWith: id } }
        ]
      }
    });

    if (existing) {
      const updatedBooking = await prisma.booking.update({
        where: { id: existing.id },
        data: { status: prismaStatus }
      });

      // When completed, increment cleaner's jobsCount in the DB
      if (prismaStatus === 'COMPLETED' && existing.cleanerId) {
        await prisma.user.update({
          where: { id: existing.cleanerId },
          data: { jobsCount: { increment: 1 } }
        }).catch((err) => console.error('Failed to increment cleaner jobsCount in DB:', err));
      }

      return res.json(updatedBooking);
    }

    return res.status(200).json({ message: 'Booking status updated', id, status: prismaStatus });
  } catch (error) {
    console.error('Failed to update booking status in DB', error);
    res.status(500).json({ error: 'Failed to update booking status' });
  }
};
