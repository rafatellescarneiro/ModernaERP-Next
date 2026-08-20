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



/**
 * Todos os produtos cadastrados
 */
  async findAll(): Promise<Product[]>{
    return this.provider.findAll();
  }



/**
 * Busca um produto por código do produto
 */
  async findByCodigo(
    codigo: string
  ): Promise<Product | undefined>{
    const products = await this.provider.findAll();

    return products.find(
      (product) => product.codigo === codigo
    );
  }

/**
 * Busca um produto por SKU
*/

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
*/
  async save(
    product: Product,
  ): Promise<Product> {

    return this.provider.save(
      product,
    );
  }



/**
 * Atualiza um produto.
*/
  async update(
    product: Product,
  ): Promise<Product> {

    return this.provider.update(
      product,
    )
  }



/**
 * Exclui um produto.
*/
  async delete(
    id: string,
  ): Promise<void> {

    return this.provider.delete(
      id,

    );
  }



}
