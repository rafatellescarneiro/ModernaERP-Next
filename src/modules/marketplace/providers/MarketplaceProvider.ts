import type {
  Marketplace,
} from "../types/Marketplace";

export interface MarketplaceProvider {


  getAll(): Promise<Marketplace[]>;

  create(
    nome: string,
  ): Promise<Marketplace>;

  update(
    id: number,
    nome: string,
  ): Promise<Marketplace>;

  updateActive(
    id: number,
    ativo: boolean,
  ): Promise<Marketplace>;

  
}
