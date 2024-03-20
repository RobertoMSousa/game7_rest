
import { Router } from 'express';

import itemsRouter from './items';
import usersRouter from './users';

const router = Router();

router.use('/items', itemsRouter);
router.use('/users', usersRouter);

export default router;