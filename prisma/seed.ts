import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Add Users
  const user1 = await prisma.user.create({
    data: { email: 'user1@example.com' },
  });

  // Add ItemTypes
  const itemType1 = await prisma.itemType.create({
    data: { name: 'Weapon' },
  });

  // Add Items
  const item1 = await prisma.item.create({
    data: {
      name: 'Sword of Destiny',
      typeId: itemType1.id,
    },
  });

  // Add Perks
  const perk1 = await prisma.perk.create({
    data: { name: 'Sharpness' },
  });

  // Associate Perks with Items (ItemPerks)
  await prisma.itemPerks.create({
    data: {
      itemId: item1.id,
      perkId: perk1.id,
    },
  });

  // Add Items to User Inventory
  await prisma.inventoryItem.create({
    data: {
      userId: user1.id,
      itemId: item1.id,
      equipped: false,
    },
  });

  console.log('Database has been seeded!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
