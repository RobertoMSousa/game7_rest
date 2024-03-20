import { Router, Request, Response } from 'express';

import { ItemController } from '../controllers/ItemController';
import { ItemService } from '../services/ItemService';
import { ItemRepository } from '../models/ItemModels';
const itemsRouter = Router();

const itemRepository = new ItemRepository();
const itemService = new ItemService(itemRepository);
const itemController = new ItemController(itemService);


itemsRouter.get('/', (req: Request, res: Response) => itemController.getAllItems(req, res));
itemsRouter.post('/', (req: Request, res: Response) => itemController.addItem(req, res));


export default itemsRouter;