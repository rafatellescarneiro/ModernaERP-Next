import type {
  Marketplace,
} from "../types/Marketplace";

import type {
  MarketplaceProvider,
} from "../providers/MarketplaceProvider";

export class MarketplaceRepository{
  constructor(
    private readonly provider: MarketplaceProvider,
  ){}

  async getAll(): Promise<Marketplace[]>{
    return this.provider.getAll();
  }

  async create(
    nome: string,
  ): Promise<Marketplace>{
    return this.provider.create(
      nome,
    )
  }

  async update(
    id: number,
    nome: string,
  ): Promise<Marketplace>{

    return this.provider.update(
      id,
      nome,
    )
  }

  async updateActive(
    id: number,
    ativo: boolean,
  ): Promise<Marketplace>{

    return this.provider.updateActive(
      id,
      ativo
    );
  }
}
