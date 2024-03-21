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

  /**
   * Adds an item to the inventory for a specific user.
   *
   * @param {number} userId - The ID of the user.
   * @param {number} itemId - The ID of the item.
   * @return {Promise<{ code: number, error: string, data: null } | { data: any }>} - A promise that resolves to an object with either a code, error, and data properties (if the user or item is not found), or a data property (if the item is successfully added to the inventory).
   */
  async addItemToIventory(userId: number, itemId: number) {
    const [userExists, itemExists] = await Promise.all([
      this.userModels.fetchUserById(userId),
      this.itemModels.fetchItemById(itemId),
    ]);
    if (!userExists || !itemExists) {
      return {
        code: 404,
        error: 'User or item not found',
        data: null,
      };
    }

    const inventoryResult = await this.inventoryModels.addItemToInvetory(
      userId,
      itemId
    );
    return { data: inventoryResult };
  }

  /**
   * Delete an item from the inventory for a given user.
   *
   * @param {number} userId - The ID of the user
   * @param {number} itemId - The ID of the item to be deleted
   * @return {Promise<object>} The result of the delete operation
   */
  async deleteItemFromInventory(userId: number, itemId: number) {
    const [userExists, itemExists] = await Promise.all([
      this.userModels.fetchUserById(userId),
      this.itemModels.fetchItemById(itemId),
    ]);
    if (!userExists || !itemExists) {
      return {
        code: 404,
        error: 'User or item not found',
        data: null,
      };
    }

    const findFirstInventoryItem =
      await this.inventoryModels.findFirstInventoryItem(userId, itemId);
    if (!findFirstInventoryItem) {
      return {
        code: 404,
        error: 'Item not found in inventory',
        data: null,
      };
    }
    const inventoryResult =
      await this.inventoryModels.deleteItemFromInventoryById(
        findFirstInventoryItem.id
      );
    return { data: inventoryResult };
  }

  /**
   * Fetches all inventory items for a given user.
   *
   * @param {number} userId - The ID of the user
   * @return {Object} An object containing the inventory items data
   */
  async getAllUserInventory(userId: number) {
    const userExists = await this.userModels.fetchUserById(userId);

    // if the user do not exist, return an empty array. No need to return too much data
    if (!userExists) {
      return {
        data: [],
      };
    }
    const inventoryItems = await this.inventoryModels.loadAllUserInventory(
      userId
    );
    return { data: inventoryItems };
  }

  /**
   * Transfers an item from one user's inventory to another user's inventory.
   *
   * @param {number} userIdOrigin - The ID of the user from whom the item is being transferred.
   * @param {number} userIdDestination - The ID of the user to whom the item is being transferred.
   * @param {number} itemId - The ID of the item being transferred.
   * @return {Promise<{code: number, error: string, data: any} | {data: any}>} - A promise that resolves to an object containing the transfer result. If the transfer is successful, the object will have a `data` property with the added inventory item. If the transfer fails, the object will have a `code` property indicating the error code, an `error` property with a descriptive error message, and a `data` property set to `null`.
   */
  async transferItemFromInventory(
    userIdOrigin: number,
    userIdDestination: number,
    itemId: number
  ) {
    const [userOriginExists, userDestinationExists, itemExists] = await Promise.all([
      this.userModels.fetchUserById(userIdOrigin),
      this.userModels.fetchUserById(userIdDestination),
      this.itemModels.fetchItemById(itemId),
    ]);
    if (!userOriginExists ||!userDestinationExists || !itemExists) {
      return {
        code: 404,
        error: 'User or item not found',
        data: null,
      };
    }

    const findFirstInventoryItem =
      await this.inventoryModels.findFirstInventoryItem(userIdOrigin, itemId);
    if (!findFirstInventoryItem) {
      return {
        code: 404,
        error: 'Item not found in user inventory',
        data: null,
      };
    }    
    await this.inventoryModels.deleteItemFromInventoryById(findFirstInventoryItem.id);
    const addInventoryItem = await this.inventoryModels.addItemToInvetory(userIdDestination, itemId);
    return { data: addInventoryItem };

  }
}
