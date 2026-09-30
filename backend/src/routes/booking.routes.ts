import { Router } from 'express';
import { createBooking, getMyBookings } from '../controllers/booking.controller';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();

// Protect all booking routes with JWT middleware
router.use(authenticate);

router.post('/', createBooking);
router.get('/', getMyBookings);

export default router;
