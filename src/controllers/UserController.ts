import { Request, Response } from 'express';
import { UserService } from '../services/UserService';

export class UserController {
  constructor(private userService: UserService) {}

  async createUser(req: Request, res: Response) {
    try {
      const userData = req.body;
      
      // Check if user already exists
      const existingUser = await this.userService.fetchUser(userData.email);
      if (existingUser) {
        return res.status(409).json({ message: 'User already exists' });
      }

      const userRes = await this.userService.createUser(userData);
      res.json(userRes);  
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async fetchAllUsers(_req: Request, res: Response) {
    const userList = await this.userService.fetchAllUsers();
    res.json(userList);
  }
}
