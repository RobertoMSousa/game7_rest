import { InventoryService } from '../InventoryService';
import { ItemModel } from '../../models/ItemModels';
import { InventoryModel } from '../../models/InventoryModels';
import { UserModels } from '../../models/UserModels';

describe('InventoryService', () => {
  let service: InventoryService;

  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();
    service = new InventoryService();
  });

  it('returns 404 if the user does not exist', async () => {
    UserModels.prototype.fetchUserById = jest.fn().mockResolvedValue(null);
    ItemModel.prototype.fetchItemById = jest.fn().mockResolvedValue({}); // Assuming item exists

    const response = await service.addItemToIventory(1, 1);
    expect(response).toEqual({
      code: 404,
      error: 'User or item not found',
      data: null,
    });
  });

  it('successfully adds an item to inventory', async () => {
    UserModels.prototype.fetchUserById = jest.fn().mockResolvedValue({});
    ItemModel.prototype.fetchItemById = jest.fn().mockResolvedValue({});
    InventoryModel.prototype.addItemToInvetory = jest
      .fn()
      .mockResolvedValue('Inventory Updated');

    const response = await service.addItemToIventory(1, 1);
    expect(response).toEqual({ data: 'Inventory Updated' });
  });

});
