import { Router, Request, Response } from 'express';

import { UserController } from '../controllers/UserController';
import { UserService } from '../services/UserService';
import { UserModels } from '../models/UserModels';
const UsersRouter = Router();

const userModel = new UserModels();
const userService = new UserService(userModel);
const userController = new UserController(userService);


UsersRouter.get('/', (req: Request, res: Response) => userController.fetchAllUsers(req, res));
UsersRouter.post('/', (req: Request, res: Response) => userController.createUser(req, res));


export default UsersRouter;