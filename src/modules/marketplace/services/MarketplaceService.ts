import type {
  Marketplace,
} from '../types/Marketplace';

import type {
  MarketplaceRepository,
} from '../repositories/MarketplaceRepository';

export class MarketplaceService{

  constructor(
    private readonly repository: MarketplaceRepository,
  ){}

  async getAll(): Promise<Marketplace[]>{
    return this.repository.getAll();
  }

  async create(
    nome: string,
  ): Promise<Marketplace>{

    const normalizedName=
      nome.trim();

    if(!normalizedName){
      throw new Error(
        "Informe o nome do marketplace.",
      );
    }

    return this.repository.create(
      normalizedName,
    );
  }

  async update(
    id: number,
    nome: string,
  ): Promise<Marketplace> {

    const normalizedName=
      nome.trim();

    if(!normalizedName){
      throw new Error(
        "Informe o nome do marketplace."
      );
    }

    return this.repository.update(
      id,
      normalizedName,
    )
  }

  async updateActive(
    id: number,
    ativo: boolean,
  ): Promise<Marketplace>{

    return this.repository.updateActive(
      id,
      ativo,
    );
  }

  

}
