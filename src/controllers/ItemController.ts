import { Request, Response } from 'express';
import Joi from 'joi';

import { ItemService } from '../services/ItemService';

const createItemSchema = Joi.object({
  name: Joi.string().required(),
  typeName: Joi.string().required(),
  itemPerks: Joi.array().items(Joi.string()).optional()
});


export class ItemController {
  constructor(private itemService: ItemService) {}

  /**
   * Adds an item to the database.
   *
   * @param {Request} req - The request object containing the item data.
   * @param {Response} res - The response object used to send the result.
   * @return {Promise<void>} - A promise that resolves when the item is added successfully.
   */
  async addItem(req: Request, res: Response) {
    const { error } = createItemSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    
    const itemData = req.body;
    const newItem = await this.itemService.createItem(itemData);
    res.json(newItem);
  }
  async getAllItems(req: Request, res: Response) {
    res.json({
      message: 'Getting all the items'
    });
  }
}
