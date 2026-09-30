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
  notes: z.string().optional()
});

export const createBooking = async (req: AuthRequest, res: Response) => {
  try {
    const customerId = req.user?.id;
    if (!customerId) return res.status(401).json({ error: 'Unauthorized' });

    const validatedData = bookingSchema.parse(req.body);

    const booking = await prisma.booking.create({
      data: {
        ...validatedData,
        date: new Date(validatedData.date),
        customerId
      }
    });

    res.status(201).json(booking);
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    res.status(500).json({ error: 'Failed to create booking' });
  }
};

export const getMyBookings = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const role = req.user?.role;
    
    if (!userId) return res.status(401).json({ error: 'Unauthorized' });

    let bookings;
    if (role === 'CUSTOMER') {
      bookings = await prisma.booking.findMany({
        where: { customerId: userId },
        include: { cleaner: { select: { name: true, avatar: true } } },
        orderBy: { createdAt: 'desc' }
      });
    } else if (role === 'CLEANER') {
      bookings = await prisma.booking.findMany({
        where: { cleanerId: userId },
        include: { customer: { select: { name: true, phone: true } } },
        orderBy: { createdAt: 'desc' }
      });
    } else {
      bookings = await prisma.booking.findMany(); // admin
    }

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
};
