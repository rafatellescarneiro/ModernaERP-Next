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
import type { CentralMarketplace } from "../types/CentralMarketplace";

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

    return this.provider.findByCodigo(
      codigo
    );

  }


  /**
   * Busca um produto por SKU
  */
  async findBySku(
    sku: string
  ): Promise<Product | undefined>{

    return this.provider.findBySku(
      sku
    );
  }


  /**
   * Busca produto por termo determinado
  */
  async search(
    term: string,
  ): Promise<Product[]>{

    return this.provider.search(
      term,
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
  );

  }


  async updateStep(
    id: string,
    step: Product["etapa"],
  ): Promise<Product>{

    return this.provider.updateStep(
      id,
      step,
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


  async addMarketplace(
    productId: string,
    marketplaceId: number,
  ): Promise<Product>{
    return this.provider.addMarketplace(
      productId,
      marketplaceId,
    )
  }

  async updateMarketplaceStatus(
    productId: string,
    marketplaceId: number,
    status: Product["marketplaces"][0]["status"],
  ): Promise<Product>{

    return this.provider.updateMarketplaceStatus(
      productId,
      marketplaceId,
      status,
    );
  }

  async deleteMarketplace(
    productId: string,
    marketplaceId: number,
  ): Promise<Product> {
    return this.provider.deleteMarketplace(
      productId,
      marketplaceId,
    );
  }

  async getMarketplaces(
  ): Promise<CentralMarketplace[]>{
    return this.provider.getMarketplaces();
  }
}
