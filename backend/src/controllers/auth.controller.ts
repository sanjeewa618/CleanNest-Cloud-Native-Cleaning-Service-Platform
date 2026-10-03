import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import prisma from '../utils/prisma';
import { generateToken } from '../utils/jwt';
import { z } from 'zod';

const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
  phone: z.string().optional(),
  role: z.enum(['CUSTOMER', 'CLEANER']).default('CUSTOMER'),
  category: z.string().optional()
});

export const register = async (req: Request, res: Response) => {
  try {
    const validatedData = registerSchema.parse(req.body);
    const normalizedEmail = validatedData.email.trim().toLowerCase();
    
    // Check if user already exists (case-insensitive)
    const existingUser = await prisma.user.findFirst({
      where: { email: { equals: normalizedEmail, mode: 'insensitive' } }
    });

    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(validatedData.password, 10);

    // Create user with normalized email
    const user = await prisma.user.create({
      data: {
        ...validatedData,
        email: normalizedEmail,
        password: hashedPassword,
        avatar: validatedData.role === 'CLEANER' 
          ? 'https://ui-avatars.com/api/?name=' + validatedData.name + '&background=random'
          : 'https://ui-avatars.com/api/?name=' + validatedData.name,
        status: validatedData.role === 'CLEANER' ? 'PENDING' : 'ACTIVE',
      }
    });

    const token = generateToken(user.id, user.role);

    res.status(201).json({
      message: user.role === 'CLEANER' ? 'Registration pending admin approval' : 'User registered successfully',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        avatar: user.avatar,
        status: user.status
      }
    });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Hardcoded Admin Login
    if (normalizedEmail === 'admin@cleannest.com' && password === 'Admin@1234') {
      const token = generateToken('adm-1', 'ADMIN');
      return res.json({
        message: 'Admin Login successful',
        token,
        user: {
          id: 'adm-1',
          name: 'System Admin',
          email: 'admin@cleannest.com',
          role: 'ADMIN',
          avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80'
        }
      });
    }

    const user = await prisma.user.findFirst({
      where: { email: { equals: normalizedEmail, mode: 'insensitive' } }
    });

    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    if (user.role === 'CLEANER' && user.status === 'PENDING') {
      return res.status(403).json({ error: 'Your account is pending admin approval' });
    }
    
    if (user.role === 'CLEANER' && user.status === 'REJECTED') {
      return res.status(403).json({ error: 'Your registration was rejected' });
    }

    const token = generateToken(user.id, user.role);

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        avatar: user.avatar,
        status: user.status
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getAllCustomers = async (req: Request, res: Response) => {
  try {
    const customers = await prisma.user.findMany({
      where: { role: 'CUSTOMER' },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        avatar: true,
        phone: true,
        createdAt: true
      },
      orderBy: { createdAt: 'desc' }
    });
    res.json(customers);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
