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

    // check if user exists
    const userExists = await this.userModels.fetchUserById(userId);
    const itemExists = await this.itemModels.fetchItemById(itemId);
    if (!userExists) {
      throw new Error('User does not exist');
    }

    // check if item exists
    if (!itemExists) {
      throw new Error('Item does not exist');
    }
    return this.inventoryModels.addItemToInvetory(userId, itemId);
  }

}
