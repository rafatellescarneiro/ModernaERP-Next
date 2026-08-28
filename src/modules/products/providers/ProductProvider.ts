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

import {
  ProductStep,
  Product,
 } from '../types';

export interface ProductProvider {

  findAll(): Promise<Product[]>;

  findByCodigo(
    codigo: string,
  ): Promise<Product | undefined>;

  findBySku(
    codigo: string,
  ):Promise<Product | undefined>;

  search(
    term: string,
  ): Promise<Product[]>;

  save(
    product: Product,
  ): Promise<Product>;

  update(
    product: Product,
  ): Promise<Product>;

  updateStep(
    id: string,
    step: ProductStep,
  ): Promise<Product>;

  delete(
    id: string,
  ): Promise<void>;
}
