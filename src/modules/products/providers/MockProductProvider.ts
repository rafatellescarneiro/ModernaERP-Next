/**
 * ==========================================================
 * Arquivo: MockProductProvider.ts
 *
 * Provider utilizado durante o desenvolvimento.
 * ==========================================================
*/

import type {
  ProductProvider
} from '../providers/ProductProvider';

import type {
  Product,
  ProductStep,
 } from '../types';

import {
  productsMock
} from '../data/products.mock';

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

  async findByCodigo(
    codigo: string,
  ): Promise<Product | undefined> {

    return this.products.find(
      (product)=>
        product.codigo === codigo,
    );

  }

  async findBySku(
    sku: string,
  ): Promise<Product | undefined> {

    return this.products.find(
      (product)=>
        product.sku === sku,
    );

  }

  async search(
    term: string,
  ): Promise<Product[]>{

    const normalizedTerm =
      term.trim().toLowerCase();

    if (!normalizedTerm){
      return this.findAll();
    }

    return this.products.filter(
      (product)=>
        product.codigo
        .toLowerCase()
        .includes(normalizedTerm) ||
        product.sku
        .toLowerCase()
        .includes(normalizedTerm),
    );

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

  async updateStep(
    id: string,
    step: ProductStep,
  ): Promise<Product>{

    const index =
      this.products.findIndex(
        (product) =>
            product.id === id,
      );

    if(index===-1){
      throw new Error(
        "Produto não encontrado."
      );
    }

    const updatedProduct: Product = {
      ...this.products[index],
      etapa: step,
    };

    this.products[index]=
      updatedProduct;


    return updatedProduct;

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
