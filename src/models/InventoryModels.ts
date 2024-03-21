import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class InventoryModel {
  /**
   * Add the given item to the inventory for the given user.
   *
   * @param {number} userId - description of parameter
   * @param {number} itemId - description of parameter
   * @return {Promise<InventoryItem>} description of return value
   */
  async addItemToInvetory(userId: number, itemId: number) {
    try {
      const inventoryItem = await prisma.inventoryItem.create({
        data: {
          userId: userId,
          itemId: itemId,
        },
      });
      console.log('Item added to inventory:', inventoryItem);
      return inventoryItem;
    } catch (error) {
      console.error('Error adding item to inventory:', error);
    }
  }

  /**
   * Finds the first inventory item that matches the given user ID and item ID.
   *
   * @param {number} userId - The ID of the user.
   * @param {number} itemId - The ID of the item.
   * @return {Promise<InventoryItem | null>} A promise that resolves to the first inventory item that matches the given user ID and item ID, or null if no match is found.
   */
  async findFirstInventoryItem(userId: number, itemId: number) {
    try {
      const inventoryItem = await prisma.inventoryItem.findFirst({
        where: {
          userId: userId,
          itemId: itemId,
        },
      });
      return inventoryItem;
    } catch (error) {
      console.error('Error finding item in inventory:', error);
    }
  }

  async deleteItemFromInventoryById(id: number) {
    try {
      const deletedItem = await prisma.inventoryItem.delete({
        where: {
          id,
        },
      });

      console.log('Deleted inventory item:', deletedItem);
      return deletedItem;
    } catch (error) {
      console.error('Error deleting item from inventory:', error);
    }
  }

  async loadAllUserInventory(userId: number) {
    try {
      const inventoryItems = await prisma.inventoryItem.findMany({
        where: {
          userId: userId,
        },
      });
      return inventoryItems;
    } catch (error) {
      console.error('Error loading inventory items:', error);
    }
  }
  async equipItemFromInventoryById(
    inventoryItemId: number,
    equippedState: boolean
  ) {
    try {
      const toogleEquippedItem = await prisma.inventoryItem.update({
        where: {
          id: inventoryItemId,
        },
        data: {
          equipped: !equippedState, // Toggle the equipped value
        },
      });
      return toogleEquippedItem;
    } catch (error) {
      console.error('Error loading inventory items:', error);
    }
  }
}
