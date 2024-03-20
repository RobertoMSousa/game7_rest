import { CreateItemPerksInput } from './PerkTypes';

// Represents the shape of data when creating a new ItemType
export type CreateItemTypeInput = {
  name: string;
};

// Represents the shape of data when creating a new Item, including relational data
export type CreateItemInput = {
  name: string;
  typeId: number; // Assuming `typeId` is the foreign key for ItemType
//   itemPerks?: CreateItemPerksInput[]; // Optional, as items may not have perks initially
};
