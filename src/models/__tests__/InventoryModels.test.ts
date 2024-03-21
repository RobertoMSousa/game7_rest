import { InventoryModel } from '../InventoryModels';
import { PrismaClient } from '@prisma/client';

jest.mock('@prisma/client', () => {
  const originalModule = jest.requireActual('@prisma/client');

  // Mock the specific method used in addItemToInventory
  return {
    ...originalModule,
    PrismaClient: jest.fn().mockImplementation(() => ({
      inventoryItem: {
        create: jest.fn().mockResolvedValue({ id: 1, userId: 1, itemId: 1 }),
        findFirst: jest
          .fn()
          .mockResolvedValue({ id: 1, userId: 1, itemId: 1, equipped: false }),
      },
    })),
  };
});

describe('InventoryModel', () => {
  let model: InventoryModel;
  let prisma: PrismaClient;

  beforeEach(() => {
    prisma = new PrismaClient();
    model = new InventoryModel();
  });

  it('adds an item to the inventory successfully', async () => {
    const inventoryItem = await model.addItemToInvetory(1, 1);
    expect(inventoryItem).toEqual({ id: 1, userId: 1, itemId: 1 });
  });

  it('finds the first inventory item matching user and item IDs', async () => {
    const inventoryItem = await model.findFirstInventoryItem(1, 1);
    expect(inventoryItem).toEqual({
      id: 1,
      userId: 1,
      itemId: 1,
      equipped: false,
    });
  });
});
