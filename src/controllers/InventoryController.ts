import { Request, Response } from 'express';
import { InventoryService } from '../services/InventoryService';

import Joi from 'joi';

const addItemToInventorySchema = Joi.object({
  userId: Joi.number().required(),
  itemId: Joi.number().required(),
});

const transferItemToInventorySchema = Joi.object({
  userIdOrigin: Joi.number().required(),
  userIdDestination: Joi.number().required(),
  itemId: Joi.number().required(),
});

export class InventoryController {
  constructor(private inventoryService: InventoryService) {}

  /**
   * Adds an item to the inventory for a specific user.
   *
   * @param {Request} req - The request object containing the userId and itemId in the body.
   * @param {Response} res - The response object used to send the result of the operation.
   * @return {Promise<void>} - A promise that resolves when the item is added to the inventory successfully, or rejects with an error if there was a problem.
   */
  async addItemToInventory(req: Request, res: Response) {
    try {
      const { error } = addItemToInventorySchema.validate(req.body);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }
      const { userId, itemId } = req.body;

      const inventoryResponse = await this.inventoryService.addItemToIventory(
        userId,
        itemId
      );

      if (inventoryResponse.code === 404) {
        res.statusCode = inventoryResponse.code;
        res.end(inventoryResponse.error);
        return;
      }

      res.json(inventoryResponse.data);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  /**
   * Deletes an item from the inventory.
   *
   * @param {Request} req - The request object.
   * @param {Response} res - The response object.
   * @return {Promise<void>} The function does not return anything.
   */
  async deleteItemFromInventory(req: Request, res: Response) {
    try {
      const { error } = addItemToInventorySchema.validate(req.body);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }
      const { userId, itemId } = req.body;

      const inventoryResponse =
        await this.inventoryService.deleteItemFromInventory(userId, itemId);
      if (inventoryResponse.code === 404) {
        res.statusCode = inventoryResponse.code;
        res.end(inventoryResponse.error);
        return;
      }
      res.json(inventoryResponse.data);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  /**
   * Gets all items in the inventory for a specific user.
   *
   * @param {Request} req - The request object.
   * @param {Response} res - The response object.
   * @return {Promise<void>} The function does not return anything.
   */
  async getAllUserInventory(req: Request, res: Response) {
    try {
      const userId = parseInt(req.params.id);
      const inventoryList = await this.inventoryService.getAllUserInventory(
        userId
      );
      res.json(inventoryList);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  /**
   * Transfers an item from one user's inventory to another.
   *
   * @param {Request} req - the request object
   * @param {Response} res - the response object
   * @return {Promise<void>} - a promise that resolves to void
   */
  async transferItemFromInventory(req: Request, res: Response) {
    try {
      const { error } = transferItemToInventorySchema.validate(req.body);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }
      const { userIdOrigin, userIdDestination, itemId } = req.body;

      if (userIdOrigin === userIdDestination) {
        return res
          .status(400)
          .json({ error: 'Origin and destination users must be different.' });
      }

      const inventoryResponse =
        await this.inventoryService.transferItemFromInventory(
          userIdOrigin,
          userIdDestination,
          itemId
        );
      if (inventoryResponse.code === 404) {
        res.statusCode = inventoryResponse.code;
        res.end(inventoryResponse.error);
        return;
      }
      res.json(inventoryResponse.data);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
  /**
   * A function to equip an item from the inventory.
   *
   * @param {Request} req - the request object
   * @param {Response} res - the response object
   * @return {Promise<void>} a promise that resolves with no value
   */
  async equipItemFromInventory(req: Request, res: Response) {
    try {
      const { error } = addItemToInventorySchema.validate(req.body);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }
      const { userId, itemId } = req.body;
      const inventoryResponse =
        await this.inventoryService.equipItemFromInventory(
          userId,
          itemId
        );
      if (inventoryResponse.code === 404) {
        res.statusCode = inventoryResponse.code;
        res.end(inventoryResponse.error);
        return;
      }
      res.json(inventoryResponse.data);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}
