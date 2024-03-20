import { PrismaClient } from '@prisma/client';
import { CreateUserInput } from '../types/UserTypes';

const prisma = new PrismaClient();

export class UserModels {
  async addUser(userData: CreateUserInput) {
    try {
      console.log(
        '🚀  roberto --  ~ UserModels ~ addUser ~ userData:',
        userData
      );
      // Direct interaction with the database
      return prisma.user.create({
        data: userData,
      });
    } catch (error) {
      console.error('Error creating new user:', error);
      // throw error; // Or handle the error as appropriate for your application
    }
  }
  async fetchAllUsers() {
    try {
      const users = await prisma.user.findMany();
      return users;
    } catch (error) {
      console.error('Error fetching users:', error);
      // throw error; // Or handle the error as appropriate for your application
    }
  }

  async fetchUser(email: string) {
    try {
      const user = await prisma.user.findUnique({
        where: {
          email: email,
        },
      });
      return user;
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  }
}
