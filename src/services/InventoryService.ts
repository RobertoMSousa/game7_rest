import { ItemModel } from '../models/ItemModels';
import { InventoryModel } from './../models/InventoryModels';
import { UserModels } from './../models/UserModels';


export class InventoryService {
  
  private inventoryModels: InventoryModel;
  private userModels: UserModels;
  private itemModels: ItemModel;

  constructor() {
    this.inventoryModels = new InventoryModel();
    this.userModels = new UserModels();
    this.itemModels = new ItemModel();
  }

  async addItemToIventory(userId: number, itemId: number) {
    const [userExists, itemExists] = await Promise.all([
      this.userModels.fetchUserById(userId),
      this.itemModels.fetchItemById(itemId),
    ]);
    if (!userExists|| !itemExists) {
      return {
        code: 404,
        error: 'User or item not found',
        data: null
      };
    }
    
    const inventoryResult = await this.inventoryModels.addItemToInvetory(userId, itemId);
    return {data: inventoryResult};
  }

}
