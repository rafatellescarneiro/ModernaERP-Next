/**
 * ==========================================================
 * Arquivo: Product.ts
 *
 * Entidade principal do módulo de Produtos.
 * ==========================================================
 */


import { ProductMarketplace } from "./Marketplace";
import { ProductStep } from "./ProductStep";

export interface Product {

  id: string;

  codigo: string;

  sku: string;

  titulo: string;

  descricao: string;

  quantidade: number;

  dataCadastro: Date;

  previsaoMarketplace?: Date;

  etapa: ProductStep;

  marketplaces: ProductMarketplace[];
}

export enum ProductStatus {

  CADASTRO = "CADASTRO",

  DESCRICAO = "DESCRICAO",

  IMAGENS = "IMAGENS",

  PROCODE = "PROCODE",

  CONFERENCIA = "CONFERENCIA",

  CONCLUIDO = "CONCLUIDO",

}

export interface SearchResult {

  product?: Product;

  confict: boolean;

  message?: string;

}
