import { Router, Request, Response } from 'express';

import { InventoryController } from '../controllers/InventoryController';
import { InventoryService } from '../services/InventoryService';
const InventorysRouter = Router();

const inventoryService = new InventoryService();
const inventoryController = new InventoryController(inventoryService);


InventorysRouter.get('/:id', (req: Request, res: Response) => inventoryController.getAllUserInventory(req, res));
InventorysRouter.post('/', (req: Request, res: Response) => inventoryController.addItemToInventory(req, res));
InventorysRouter.delete('/', (req: Request, res: Response) => inventoryController.deleteItemFromInventory(req, res));
InventorysRouter.post('/transfer', (req: Request, res: Response) => inventoryController.transferItemFromInventory(req, res));


export default InventorysRouter;