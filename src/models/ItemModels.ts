import { PrismaClient } from '@prisma/client';


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

  async getAllItems() {
    return await prisma.item.findMany({
      include: {
        type: true, // Assuming 'type' is the relation name for ItemType in the Item model
        itemPerks: {
          include: {
            perk: true, // Assuming 'perk' is the relation name in the ItemPerks model pointing to the Perk model
          }
        },
      
      },
    });
  }

  // fetch item by id
  async fetchItemById(id: number) {
    return await prisma.item.findUnique({
      where: {
        id: id,
      },
    });
  }
}