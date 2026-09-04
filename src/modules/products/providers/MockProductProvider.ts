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

import {
  MarketplaceStatus,
} from "../types/Marketplace";
import { CentralMarketplace } from '../types/CentralMarketplace';


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

  async addMarketplace(
    productId: string,
    marketplaceId: number,
  ): Promise<Product>{

    const product =
      this.products.find(
        currentProduct =>
          currentProduct.id === productId,
      );

    if(!product){
      throw new Error(
        "Produto não encontrado."
      );
    }

    const marketplaceExists =
      product.marketplaces.some(
        (item) =>
            item.marketplaceId=== marketplaceId
      );

    if(marketplaceExists){
      throw new Error(
        "O produto já está vinculado a este marketplace."
      );
    }

    const centralMarketplace =
      await this.getMarketplaces();

    const marketplaceData =
      centralMarketplace.find(
        (item) =>
          item.id === marketplaceId
      );

    if(!marketplaceData){
      throw new Error(
        "Marketplace não encontrado.",
      )
    }

    if(!marketplaceData.ativo){
      throw new Error(
        "Marketplace está intaivo.",
      )
    }

    const productMarketplaceId =
      product.marketplaces.length > 0
        ? Math.max(
          ...product.marketplaces.map(
            (item)=> item.id,
          ),
        ) +1
      : 1;

    product.marketplaces.push({
      id: productMarketplaceId,
      marketplaceId: marketplaceData.id,
      marketplace: marketplaceData.nome,
      status: MarketplaceStatus.NOT_SENT,
    });


    return product;

  }

  async updateMarketplaceStatus(
  productId: string,
  marketplaceId: number,
  status: MarketplaceStatus,
): Promise<Product> {
  const product = this.products.find(
    currentProduct =>
      currentProduct.id === productId,
  );

  if (!product) {
    throw new Error(
      "Produto não encontrado.",
    );
  }

    const marketplace =
      product.marketplaces.find(
        currentMarketplace =>
          currentMarketplace.id === marketplaceId,
      );

    if (!marketplace) {
      throw new Error(
        "Marketplace não encontrado.",
      );
    }

    marketplace.status = status;

    return product;
  }

  async deleteMarketplace(
    productId: string,
    marketplaceId: number,
  ): Promise<Product> {
    const product = this.products.find(
      currentProduct =>
          currentProduct.id === productId,
    );

    if(!product){
      throw new Error(
        "Produto não encontrado.",
      );
    }

    const marketplaceIndex =
      product.marketplaces.findIndex(
        marketplace =>
          marketplace.id === marketplaceId,
      );

    if (marketplaceIndex === -1){
      throw new Error(
        "Marketplace não encontrado."
      );
    }

    product.marketplaces.splice(
      marketplaceIndex,
      1,
    );

    return product;
  }

  async getMarketplaces(): Promise<CentralMarketplace[]> {
    return [
      {
      id: 1,
      nome: "Mercado Livre",
      ativo: true,
      },
      {
        id: 2,
        nome: "Amazon",
        ativo: true,
      },
    ]
  }
}
