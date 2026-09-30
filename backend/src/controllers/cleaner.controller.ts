import { Request, Response } from 'express';
import prisma from '../utils/prisma';

export const getCleaners = async (req: Request, res: Response) => {
  try {
    const { category } = req.query;
    
    const filter = category ? { role: 'CLEANER' as const, category: category as string } : { role: 'CLEANER' as const };
    
    const cleaners = await prisma.user.findMany({
      where: filter,
      select: {
        id: true,
        name: true,
        avatar: true,
        category: true,
        rating: true,
        jobsCount: true,
        bio: true,
        status: true
      }
    });
    
    res.json(cleaners);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch cleaners' });
  }
};

export const getCleanerById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const cleaner = await prisma.user.findUnique({
      where: { id, role: 'CLEANER' },
      select: {
        id: true,
        name: true,
        avatar: true,
        category: true,
        rating: true,
        jobsCount: true,
        bio: true,
        reviewsReceived: {
          include: {
            author: { select: { name: true, avatar: true } }
          }
        }
      }
    });
    
    if (!cleaner) return res.status(404).json({ error: 'Cleaner not found' });
    
    res.json(cleaner);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch cleaner' });
  }
};

export const updateCleanerStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    if (!['ACTIVE', 'PENDING', 'REJECTED', 'SUSPENDED'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }
    
    const cleaner = await prisma.user.update({
      where: { id, role: 'CLEANER' },
      data: { status }
    });
    
    res.json(cleaner);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update cleaner status' });
  }
};
