import { PerkModel } from '../models/PerkModels';

export class PerkService {
  
  private perkModel: PerkModel;

  constructor() {
    this.perkModel = new PerkModel();
  }

  async createPerk(perkName: string) {
  
    return this.perkModel.addPerk(perkName);
  }
}
