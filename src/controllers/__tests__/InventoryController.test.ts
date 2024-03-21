import { InventoryController } from '../InventoryController';
import { InventoryService } from '../../services/InventoryService';
import { Request, Response } from 'express';

// Mocking InventoryService
jest.mock('../../services/InventoryService', () => {
  return {
    InventoryService: jest.fn().mockImplementation(() => {
      return {
        addItemToInventory: jest.fn()
      };
    })
  };
});

describe('InventoryController', () => {
  let controller: InventoryController;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockSend: jest.Mock;

  beforeEach(() => {
    controller = new InventoryController(new InventoryService());

    mockSend = jest.fn();
    mockResponse = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
      send: mockSend,
      end: jest.fn()
    };
  });

  it('successfully adds an item to inventory', async () => {
    // Mock implementation of addItemToInventory to resolve successfully
    controller['inventoryService'].addItemToIventory = jest.fn().mockResolvedValue({ data: 'Success' });

    mockRequest = {
      body: { userId: 1, itemId: 1 }
    };

    await controller.addItemToInventory(mockRequest as Request, mockResponse as Response);

    expect(mockResponse.json).toBeCalledWith('Success');
  });

  it('responds with 400 status code if userId is missing', async () => {
    mockRequest = {
      body: { itemId: 1 } // Missing userId
    };

    await controller.addItemToInventory(mockRequest as Request, mockResponse as Response);

    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith(expect.objectContaining({
      error: expect.stringContaining('userId')
    }));
  });

  it('responds with 400 status code if itemId is missing', async () => {
    mockRequest = {
      body: { userId: 1 } // Missing itemId
    };

    await controller.addItemToInventory(mockRequest as Request, mockResponse as Response);

    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith(expect.objectContaining({
      error: expect.stringContaining('itemId')
    }));
  });

  it('responds with 404 status code when the item or user is not found', async () => {
    // Mock the service method to simulate a 404 response
    controller['inventoryService'].deleteItemFromInventory = jest.fn().mockResolvedValue({
      code: 404,
      error: 'Item or User not found'
    });

    mockRequest = {
      body: { userId: 1, itemId: 1 }
    };

    await controller.deleteItemFromInventory(mockRequest as Request, mockResponse as Response);

    // Check if the status code was set to 404 and the correct error message was returned
    expect(mockResponse.statusCode).toBe(404);
    expect(mockResponse.end).toHaveBeenCalledWith('Item or User not found');
  });


});
