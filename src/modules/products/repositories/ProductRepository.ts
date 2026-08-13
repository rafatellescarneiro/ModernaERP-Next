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

/**
 * Salva um produto.
 *
 * Ainda será implementado quando tivermos
 * uma fonte de dados persistente.
*/

  async save(
    product: Product,
  ): Promise<Product> {

    void product;

    throw new Error(
      "ProductRepository.save ainda não foi implementado.",
    );
  }

/**
 * Atualiza um produto.
*/
  async update(
    product: Product,
  ): Promise<Product> {

    void product;

    throw new Error(
      "ProductRepository.update ainda não foi implementado.",
    );
  }

/**
 * Exclui um produto.
*/
  async delete(
    id: string,
  ): Promise<void> {

    void id;

    throw new Error(
      "ProductRepository.delete ainda não foi implementado.",
    );
  }
}
