import { Router } from 'express';
import { getCleaners, getCleanerById, updateCleanerStatus, updateCleanerProfile } from '../controllers/cleaner.controller';

const router = Router();

router.get('/', getCleaners);
router.get('/:id', getCleanerById);
router.patch('/:id/status', updateCleanerStatus);
router.patch('/:id/profile', updateCleanerProfile);

export default router;
