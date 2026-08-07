/**
 * ==========================================================
 * Arquivo: ProductService.ts
 *
 * Contém as regras de negócio relacionadas aos produtos.
 *
 * O Service não conhece detalhes de interface.
 * ==========================================================
*/

import type { Product } from "../types";

import {
  ProductRepository,

} from "../repositories";

export interface ProductSearchResult {
  product?: Product;

  conflict: boolean;

  message?: string;


}

export class ProductService {
  constructor(
    private readonly repository: ProductRepository,

  ){}

  async getProducts(): Promise<Product[]>{
    return this.repository.findAll();

  }

  async search(
    term: string,
  ): Promise<ProductSearchResult>{
    const normalizedTerm = term.trim();

    if(!normalizedTerm){
      return{
        conflict: false,
      };
    }

    const productByCodigo =
      await this.repository.findByCodigo(
        normalizedTerm,
      );

    const productBySku =
      await this.repository.findBySku(
        normalizedTerm,
      );

    if (!productByCodigo && !productBySku){
      return{
        conflict: false,

        message: "Produto não encontrado",
      };
    }

    if(
      productByCodigo &&
      productBySku &&
      productByCodigo.id !== productBySku.id
    ){
      return{
        conflict: true,

        message:
          "O código e o SKU informados pertencem a produtos diferentes."

      };
    }

    if(productByCodigo){
      return{
        product: productByCodigo,

        conflict: false,
      };
    }

    return {
      product: productBySku,

      conflict: false,
    };
  }
}


