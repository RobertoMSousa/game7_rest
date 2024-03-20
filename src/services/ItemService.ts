import { ItemRepository } from '../models/ItemModels';
import { CreateItemInput } from '../types/ItemTypes';

export class ItemService {
  constructor(private itemRepository: ItemRepository) {}

  async createItem(itemData: CreateItemInput) {
    // Business logic here, like validating data, applying business rules
    return this.itemRepository.addItem(itemData);
  }

  // Other methods like deleteItem, transferItem, etc.
}
