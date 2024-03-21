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

      
      const newItem = await this.inventoryService.addItemToIventory(
        userId,
        itemId
      );
      res.json(newItem);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}
