import { PrismaClient } from '@prisma/client';
// import { CreateItem } from '../types/ItemTypes';


type CreateItem = {
  name: string;
  typeId: number;
  itemPerks: {
    create: Array<{ perkId: number }>;
  };
};


const prisma = new PrismaClient();

export class ItemModel {
  async createItemType(typeName: string) {
    return prisma.itemType.upsert({
      where: { name: typeName },
      update: {},
      create: { name: typeName },
    });
  }

  async addItem(itemData: CreateItem) {
    
    const newItem = await prisma.item.create({data: itemData});
    console.log('🚀  roberto --  ~ ItemRepository ~ addItem ~ newItem:', newItem);
  }

  // Other data management methods
}