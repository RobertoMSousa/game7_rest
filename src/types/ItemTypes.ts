export type CreateItemInput = {
  name: string;
  typeName: string; // Sword, Armor, Axe
  itemPerks?: string[]; // Array of perks
};
