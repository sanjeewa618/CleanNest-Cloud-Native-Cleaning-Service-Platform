import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

import authRoutes from './routes/auth.routes';
import cleanerRoutes from './routes/cleaner.routes';
import bookingRoutes from './routes/booking.routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Basic health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'CleanNest API is running perfectly!' });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/cleaners', cleanerRoutes);
app.use('/api/bookings', bookingRoutes);

// Backfill existing booking records with customer and cleaner name/email
async function syncDatabaseSchema() {
  try {
    const prisma = require('./utils/prisma').default;

    // Each statement must be a separate executeRawUnsafe call (PostgreSQL does not
    // allow multiple commands in a single prepared statement).

    // Backfill customer names & emails from User table
    await prisma.$executeRawUnsafe(`
      UPDATE "Booking" b
      SET "customerName" = u.name,
          "customerEmail" = u.email
      FROM "User" u
      WHERE b."customerId" = u.id
        AND (b."customerEmail" IS NULL OR b."customerEmail" = ''
             OR b."customerName" IS NULL OR b."customerName" = '')
    `);

    // Backfill cleaner names & emails from User table
    await prisma.$executeRawUnsafe(`
      UPDATE "Booking" b
      SET "cleanerName" = u.name,
          "cleanerEmail" = u.email
      FROM "User" u
      WHERE b."cleanerId" = u.id
        AND (b."cleanerEmail" IS NULL OR b."cleanerEmail" = ''
             OR b."cleanerName" IS NULL OR b."cleanerName" = '')
    `);

    console.log('✅ Booking records backfilled with customerName, customerEmail, cleanerName, cleanerEmail!');
  } catch (error) {
    console.error('Database sync notice:', error);
  }
}

syncDatabaseSchema();

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
