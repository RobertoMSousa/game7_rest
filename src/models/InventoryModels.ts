import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


export class InventoryModel {
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
      throw error; // Or handle the error as appropriate for your application
    }
  }
}