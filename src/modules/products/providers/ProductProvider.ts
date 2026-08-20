/**
 * ==========================================================
 * Arquivo: ProductProvider.ts
 *
 * Contrato que todas as fontes de dados de produtos
 * deverão implementar.
 *
 * Exemplos futuros:
 *
 * Mock
 * Excel
 * SQLite
 * API
 * ==========================================================
*/

import { Product } from '../types/Product';

export interface ProductProvider {

  findAll(): Promise<Product[]>;

  save(
    product: Product,
  ): Promise<Product>;

  update(
    product: Product,
  ): Promise<Product>;

  delete(
    id: string,
  ): Promise<void>;
}
