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
    }
  }

  /**
   * Fetches a user from the database based on their email.
   *
   * @param {string} email - The email of the user to fetch.
   * @return {Promise<User | null>} A Promise that resolves to the fetched user object, or null if no user is found.
   */
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

  /**
   * Fetches a user by their ID.
   *
   * @param {number} id - The ID of the user to fetch.
   * @return {Promise<User | null>} The user with the specified ID, or null if not found.
   */
  async fetchUserById(id: number) {
    try {
      const user = await prisma.user.findUnique({
        where: {
          id: id,
        },
      });
      return user;
    } catch (error) {
      console.error('Error fetching user by id:', error);
    }
  }
}
