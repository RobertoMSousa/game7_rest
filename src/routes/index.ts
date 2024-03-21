
import { Router } from 'express';

import itemsRouter from './items';
import usersRouter from './users';
import inventoryRouter from './inventory';

const router = Router();

router.use('/items', itemsRouter);
router.use('/users', usersRouter);
router.use('/inventory', inventoryRouter);

export default router;