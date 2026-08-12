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

export interface ProductListSearchResult {

  products: Product[];

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

  /**
   * Pesquisa um produto utilizando código ou SKU.
   *
   * Regra:
   *
   * 1. Procura pelo código.
   * 2. Procura pelo SKU.
   * 3. Se forem produtos diferentes,
   *    retorna conflito.
   */

  async search(
    term: string,
  ): Promise<ProductSearchResult>{

    const normalizedTerm =
      term.trim();

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

  /**
   * Pesquisa produtos por código ou SKU.
   *
   * Essa pesquisa é utilizada pela listagem da página.
   *
   * Diferentemente do método search(), este método
   * pode retornar vários produtos.
   */

  async searchList(
    term: string,
  ): Promise<ProductListSearchResult>{

    const products =
      await this.repository.findAll();

    const normalizedTerm =
      term.trim().toLowerCase();


    if(!normalizedTerm){

      return {
        products,

        conflict: false,

      };

    }

    const filteredProducts =
      products.filter(
        (product) =>
          product.codigo
            .toLowerCase()
            .includes(normalizedTerm) ||
          product.sku
            .toLowerCase()
            .includes(normalizedTerm),
      );

    return {
      products: filteredProducts,

      conflict: false,
    };

  }

}


