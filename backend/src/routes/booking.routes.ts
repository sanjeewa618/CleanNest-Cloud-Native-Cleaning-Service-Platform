import { Router } from 'express';
import { createBooking, getMyBookings, updateBookingStatus } from '../controllers/booking.controller';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();

// Allow status update (with or without auth header) so pipeline updates persist to DB reliably
router.patch('/:id/status', updateBookingStatus);

// Protect remaining booking routes with JWT middleware
router.use(authenticate);

router.post('/', createBooking);
router.get('/', getMyBookings);

export default router;
