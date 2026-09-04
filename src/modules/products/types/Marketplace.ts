/**
 * ==========================================================
 * Arquivo: Marketplace.ts
 *
 * Define os marketplaces disponíveis e os possíveis
 * estados de cadastro de um produto.
 * ==========================================================
 */

/**
 * Status de cadastro de um produto em um marketplace.
*/

export enum MarketplaceStatus {
  NOT_SENT = "NOT_SENT",
  SENT = "SENT",
  ERROR = "ERROR",
  PROCESSING = "PROCESSING",
}

export interface ProductMarketplace {
  id: number;
  marketplaceId: number;
  marketplace: string;
  status: MarketplaceStatus;
}
