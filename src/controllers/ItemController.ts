import { Request, Response } from 'express';
import { ItemService } from '../services/ItemService';

export class ItemController {
  constructor(private itemService: ItemService) {}

  async addItem(req: Request, res: Response) {
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
