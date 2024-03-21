import { PerkModel } from './../models/PerkModels';
import { ItemModel } from '../models/ItemModels';
import { CreateItemInput } from '../types/ItemTypes';

export class ItemService {
  private itemModel: ItemModel;
  private perkModel: PerkModel;

  constructor() {
    this.itemModel = new ItemModel();
    this.perkModel = new PerkModel();
  }

  async createItem(itemData: CreateItemInput) {
    let perks: { perkId: number }[] = [];
    if (itemData.itemPerks) {
      const perksPromises = itemData.itemPerks?.map(async (perkData) => {
        const perk = await this.perkModel.addPerk(perkData);
        return { perkId: perk.id };
      });

      perks = await Promise.all(perksPromises);
    }

    const itemType = await this.itemModel.createItemType(itemData.typeName);

    return this.itemModel.addItem({
      name: itemData.name,
      typeId: itemType.id,
      itemPerks: {
        create: perks,
      },
    });
  }

  async getAllItems() {
    const originalObjectList = await this.itemModel.getAllItems();
  
    const transformedObjectList = originalObjectList.map((originalObject) => {
      return {
        id: originalObject.id,
        name: originalObject.name,
        type: {
          name: originalObject.type.name,
        },
        itemPerks: originalObject.itemPerks.map((perk) => perk.perk.name),
      };
    });

    return transformedObjectList;
  }
}
