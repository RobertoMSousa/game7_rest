import { UserModels } from './../models/UserModels';
import { CreateUserInput } from '../types/UserTypes';

export class UserService {
  
  private userModels: UserModels;

  constructor() {
    this.userModels = new UserModels();
  }

  async createUser(userData: CreateUserInput) {
    return this.userModels.addUser(userData);
  }

  async fetchAllUsers() {
    return this.userModels.fetchAllUsers();
  }

  async fetchUser(email: string) {
    return this.userModels.fetchUser(email);
  }

}
