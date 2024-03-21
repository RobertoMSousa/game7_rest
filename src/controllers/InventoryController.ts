import { Request, Response } from 'express';
import { InventoryService } from '../services/InventoryService';

import Joi from 'joi';

const addItemToInventorySchema = Joi.object({
  userId: Joi.number().required(),
  itemId: Joi.number().required(),
});

export class InventoryController {
  constructor(private inventoryService: InventoryService) {}

  async addItemToInventory(req: Request, res: Response) {
    try {
      const { error } = addItemToInventorySchema.validate(req.body);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }
      const { userId, itemId } = req.body;
      
      const inventoryResponse = await this.inventoryService.addItemToIventory(
        userId,
        itemId
      );

      if (inventoryResponse.code === 404) {
        res.statusCode = inventoryResponse.code;
        res.end(inventoryResponse.error);
        return;
      }
      
      res.json(inventoryResponse.data);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}
