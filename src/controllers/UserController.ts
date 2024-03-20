import { Request, Response } from 'express';
import { UserService } from '../services/UserService';

export class UserController {
  constructor(private userService: UserService) {}

  async createUser(req: Request, res: Response) {
    try {
      const itemData = req.body;
      console.log('🚀  roberto --  ~ UserController ~ createUser ~ itemData:', itemData);

      // check if user exists
      const existingUser = await this.userService.fetchUser(itemData.email);
      if (existingUser) {
        return res.status(409).json({ message: 'User already exists' });
      }
      const newItem = await this.userService.createUser(itemData);
      res.json(newItem);  
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async fetchAllUsers(_req: Request, res: Response) {
    const userList = await this.userService.fetchAllUsers();
    res.json(userList);
  }
}
