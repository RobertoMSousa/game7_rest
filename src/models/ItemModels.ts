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
    return await prisma.item.create({ data: itemData });
  }

  async getAllItems() {
    return await prisma.item.findMany({
      include: {
        type: true, 
        itemPerks: {
          include: {
            perk: true,
          },
        },
      },
    });
  }

  /**
   * Fetches an item by its ID.
   *
   * @param {number} id - The ID of the item to fetch.
   * @return {Promise<Item>} A promise that resolves to the fetched item.
   */
  async fetchItemById(id: number) {
    return await prisma.item.findUnique({
      where: {
        id: id,
      },
    });
  }
}
