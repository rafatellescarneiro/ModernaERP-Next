/**
 * ==========================================================
 * Arquivo: ProductRepository.ts
 *
 * Responsável pelo acesso aos dados dos produtos.
 *
 * IMPORTANTE:
 *
 * O Repository não contém regras de negócio.
 * Ele apenas conversa com o Provider.
 * ==========================================================
*/

import type { Product } from "../types";
import type { ProductProvider } from "../providers";

export class ProductRepository {

  constructor(
    private readonly provider: ProductProvider

  ){}

  async findAll(): Promise<Product[]>{
    return this.provider.findAll();
  }

  async findByCodigo(
    codigo: string
  ): Promise<Product | undefined>{
    const products = await this.provider.findAll();

    return products.find(
      (product) => product.codigo === codigo
    );
  }

  async findBySku(
    sku: string
  ): Promise<Product | undefined>{
    const products = await this.provider.findAll();

    return products.find(
      (product) => product.sku === sku
    );
  }

  async save(
    _product: Product,
  ): Promise<Product> {
    throw new Error(
      "ProductRepository.save ainda não foi implementado.",
    );
  }


  async update(
    _product: Product,
  ): Promise<Product> {
    throw new Error(
      "ProductRepository.update ainda não foi implementado.",
    );
  }

  async delete(
    _id: string,
  ): Promise<void> {
    throw new Error(
      "ProductRepository.delete ainda não foi implementado.",
    );
  }
}
