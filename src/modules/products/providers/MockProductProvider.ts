/**
 * ==========================================================
 * Arquivo: MockProductProvider.ts
 *
 * Provider utilizado durante o desenvolvimento.
 * ==========================================================
*/

import type { ProductProvider } from '../providers/ProductProvider';
import type { Product } from '../types/Product';
import { productsMock } from '../data/products.mock';

export class MockProductProvider
  implements ProductProvider {

  private products: Product[] =[
    ...productsMock,
  ];

  async findAll(): Promise<Product[]> {

    return [
      ...this.products,
    ];

  }

  async save(
    product: Product,

  ): Promise<Product>{
    this.products.push(product);

    return product;
  }

  async update(
    product: Product,
  ): Promise<Product>{

    const index =
      this.products.findIndex(
        (current) =>
          current.id === product.id,
      );

      if(index === -1){

        throw new Error(
          "Produto não encontrado"
        );
      }

      this.products[index] = product;

      return product;

  }

  async delete(
    id:string,
  ): Promise<void>{

    const index =
      this.products.findIndex(
        (product) =>
          product.id === id,

      );

      if(index === -1){

        throw new Error(
          "Produto não encontrado"
        );
      }

      this.products.splice(
        index,
        1,
      );

  }

}
