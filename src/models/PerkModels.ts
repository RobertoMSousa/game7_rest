import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class PerkModel {
  async addPerk(perkName: string) {
    return prisma.perk.upsert({
      where: { name: perkName},
      update: {},
      create: { name: perkName },
    });
  }
}