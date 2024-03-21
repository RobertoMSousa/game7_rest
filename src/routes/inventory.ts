import { Router, Request, Response } from 'express';

import { InventoryController } from '../controllers/InventoryController';
import { InventoryService } from '../services/InventoryService';
const InventorysRouter = Router();

const inventoryService = new InventoryService();
const inventoryController = new InventoryController(inventoryService);


// InventorysRouter.get('/', (req: Request, res: Response) => inventoryController.fetchAllInventorys(req, res));
InventorysRouter.post('/', (req: Request, res: Response) => inventoryController.addItemToInventory(req, res));


export default InventorysRouter;