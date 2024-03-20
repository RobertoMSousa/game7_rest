// Represents the shape of data when creating a new Perk
export type CreatePerkInput = {
  name: string;
};

// Represents the shape of data for associating an Item with Perks
export type CreateItemPerksInput = {
  itemId: number;
  perkId: number;
};
