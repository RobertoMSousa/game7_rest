import { Router, Request, Response } from 'express';

import { ItemController } from '../controllers/ItemController';
import { ItemService } from '../services/ItemService';
const itemsRouter = Router();


const itemService = new ItemService();
const itemController = new ItemController(itemService);


itemsRouter.get('/', (req: Request, res: Response) => itemController.getAllItems(req, res));
itemsRouter.post('/', (req: Request, res: Response) => itemController.addItem(req, res));


export default itemsRouter;