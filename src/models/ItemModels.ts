import { PrismaClient } from '@prisma/client';
import { CreateItemInput } from '../types/ItemTypes';

const prisma = new PrismaClient();

export class ItemRepository {
  async addItem(itemData: CreateItemInput) {
    // Direct interaction with the database
    return prisma.item.create({
      data: itemData,
    });
  }

  // Other data management methods
}