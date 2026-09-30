import { Router } from 'express';
import { getCleaners, getCleanerById, updateCleanerStatus } from '../controllers/cleaner.controller';

const router = Router();

router.get('/', getCleaners);
router.get('/:id', getCleanerById);
router.patch('/:id/status', updateCleanerStatus);

export default router;
