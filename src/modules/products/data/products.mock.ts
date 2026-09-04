/**
 * ==========================================================
 * Arquivo: products.mock.ts
 *
 * Dados fictícios utilizados durante o desenvolvimento
 * do módulo Produtos.
 *
 * Futuramente serão substituídos por dados reais.
 * ==========================================================
 */

import type { Product } from "../types";

import {
  ProductStep,
  MarketplaceStatus,
} from "../types";

export const productsMock: Product[] = [

  {
    id: "1",

    codigo: "10025",

    sku: "MC10025",

    titulo: "Mesa Carolina",

    descricao: "Mesa Carolina 180",

    quantidade: 12,

    dataCadastro: new Date("2026-07-20"),

    previsaoMarketplace: new Date("2026-07-25"),

    etapa: ProductStep.DESCRIPTION,

    marketplaces: [
      {
        id: 1,

        marketplaceId: 1,

        marketplace: "MadeiraMadeira",

        status: MarketplaceStatus.SENT,
      },

      {
        id: 2,

        marketplaceId: 2,

        marketplace: "Magazine Luiza",

        status: MarketplaceStatus.PROCESSING,
      },

      {
        id: 3,

        marketplaceId: 3,

        marketplace: "Mercado Livre",

        status: MarketplaceStatus.NOT_SENT,
      },

      {
        id: 4,

        marketplaceId: 4,

        marketplace: "Amazon",

        status: MarketplaceStatus.SENT,
      },

      {
        id: 5,

        marketplaceId: 5,

        marketplace: "Shopee",

        status: MarketplaceStatus.NOT_SENT,
      },
    ],

  },
  {
    id: "2",

    codigo: "10026",

    sku: "ML10026",

    titulo: "Mesa Loren",

    descricao: "Mesa Loren 180",

    quantidade: 8,

    dataCadastro: new Date(),

    etapa: ProductStep.PRECODE,

    marketplaces: [
      {
        id: 1,

        marketplaceId: 1,

        marketplace: "MadeiraMadeira",

        status: MarketplaceStatus.SENT,
      },

      {
        id: 2,

        marketplaceId: 2,

        marketplace: "Magazine Luiza",

        status: MarketplaceStatus.SENT,
      },

      {
        id: 3,

        marketplaceId: 3,

        marketplace: "Mercado Livre",

        status: MarketplaceStatus.SENT,
      },

      {
        id: 4,

        marketplaceId: 4,

        marketplace: "Amazon",

        status: MarketplaceStatus.PROCESSING,
      },

      {
        id: 5,

        marketplaceId: 5,

        marketplace: "Shopee",

        status: MarketplaceStatus.NOT_SENT,
      },
    ],
  },
  {
    id: "3",

    codigo: "10027",

    sku: "CL10027",

    titulo: "Cadeira Lorena",

    descricao: "Cadeira Lorena Premium",

    quantidade: 20,

    dataCadastro: new Date("2026-07-22"),

    previsaoMarketplace: new Date("2026-07-30"),

    etapa: ProductStep.IMAGES,

    marketplaces: [
      {
        id: 1,

        marketplaceId: 1,

        marketplace: "MadeiraMadeira",

        status: MarketplaceStatus.NOT_SENT,
      },

      {
        id: 2,

        marketplaceId: 2,

        marketplace: "Magazine Luiza",

        status: MarketplaceStatus.NOT_SENT,
      },

      {
        id: 3,

        marketplaceId: 3,

        marketplace: "Mercado Livre",

        status: MarketplaceStatus.NOT_SENT,
      },
    ],
  },
];
