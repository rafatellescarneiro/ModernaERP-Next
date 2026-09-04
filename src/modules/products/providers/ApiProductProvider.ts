import type {
  ProductProvider,
} from "./ProductProvider";

import type {
  Product,
} from "../types";

import {
  API_BASE_URL,
} from "../../../config/api";

import {
  ProductApiResponse,
} from "./ProductApi.types";

import type {
  ProductMarketplace,
} from "../types/Marketplace";

import {
  MarketplaceStatus,
} from "../types";
import { CentralMarketplace } from "../types/CentralMarketplace";

function mapProduct(
  data: ProductApiResponse,
): Product {
  return {

    id: data.id,

    codigo: data.codigo,

    sku: data.sku,

    titulo: data.titulo,

    descricao: data.descricao,

    quantidade: data.quantidade,

    dataCadastro:
      new Date(
        data.dataCadastro,
      ),

    previsaoMarketplace:
      data.previsaoMarketplace
        ? new Date(
          data.previsaoMarketplace,
        )
        : undefined,

    etapa:
      data.etapa as Product["etapa"],

    marketplaces:
      data.marketplaces.map(
        marketplace => ({
          id: marketplace.id,
          marketplaceId: marketplace.marketplace_id,
          marketplace: marketplace.marketplace,
          status: marketplace.status as ProductMarketplace["status"],
        }),
      ),
  };
}

function mapProductToApi(
  product: Product,
){

  return{

    id: product.id,

    codigo: product.codigo,

    sku: product.sku,

    titulo: product.titulo,

    descricao: product.descricao,

    quantidade: product.quantidade,

    etapa: product.etapa,

    }

}


export class ApiProductProvider
  implements ProductProvider {

  async findAll(): Promise<Product[]> {

    const response =
      await fetch(
        `${API_BASE_URL}/products`,
      );

    if (!response.ok) {

      throw new Error(
        "Não foi possível carregar os produtos.",
      );
    }

    const data =
      await response.json() as ProductApiResponse[];

    return data.map(
      mapProduct,
    );
  }


  async findByCodigo(
    codigo: string,
  ): Promise<Product | undefined>{

    const products =
      await this.findAll();

    return products.find(
      (product)=>
        product.codigo === codigo,
    );

  }

  async findBySku(
    sku: string,
  ): Promise<Product | undefined>{

    const products =
      await this.findAll();

    return products.find(
      (product)=>
        product.sku === sku,
    );
  }

  async search(
    term: string,
  ): Promise<Product[]>{

    const response =
      await fetch(
        `${API_BASE_URL}/products/search?term=${encodeURIComponent(term)}`,
      );

      if(!response.ok){
        throw new Error(
          "Não foi possível pesquisar os produtos."
        );
      }

      const data =
        await response.json() as ProductApiResponse[];

      return data.map(
        mapProduct,
      );

  }

  async save(
    product: Product,
  ): Promise <Product> {

    const response =
      await fetch(
        `${API_BASE_URL}/products`,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify(
            mapProductToApi(
              product,
            ),
          ),
        },
      );

    if (!response.ok){

      const data =
        await response.json().catch(
          ()=> null,
        );

        throw new Error(
          data?.message ??
          "Não foi possível criar o produto.",
        );
    }

    const data =
      await response.json() as ProductApiResponse;

    return mapProduct(data);
  }

  async update(
    product: Product,
  ): Promise<Product>{

    const response =
      await fetch(
        `${API_BASE_URL}/products/${product.id}`,
        {
          method: "PUT",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify(
            mapProductToApi(
              product,
            ),
          ),
        },
      );

    if (!response.ok){

      const data =
        await response.json().catch(
          ()=> null,
        )

      throw new Error(
        data?.message ??
        "Não foi possível atualizar o produto."
      );
    }

    const data =
      await response.json() as ProductApiResponse;

    return mapProduct(data);
  }

  async updateStep(
    id: string,
    step: Product["etapa"],
  ): Promise<Product>{

    const response =
      await fetch(
        `${API_BASE_URL}/products/${id}/step`,
        {
          method: "PATCH",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            step,
          }),
        },
      );

    if (!response.ok){
      const data =
        await response.json().catch(
          () => null,
        );

        throw new Error(
          data?.message ??
          "não foi possível atualizar a etapa do produto."
        );
    }

    const data =
      await response.json() as ProductApiResponse;

    return mapProduct(
      data,
    );
  }

  async delete(
    id: string
  ): Promise<void>{

    const response =
      await fetch(
        `${API_BASE_URL}/products/${id}`,
        {
          method: "DELETE",
        },
      );

    if (!response.ok){

      let message =
        "Não foi possível excluir o produto."

      try {
        const data =
        await response.json();

        if(
          data &&
          typeof data.message === "string"
        ){
          message = data.message;
        }

      } catch {
        // a resposta pode não possuir JSON
      }

      throw new Error(message);


    }
  }

  async addMarketplace(
    productId: string,
    marketplaceId: number,
  ): Promise<Product>{

    const response =
      await fetch(
        `${API_BASE_URL}/products/${productId}/marketplaces`,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            marketplace_id: marketplaceId,
          }),
        },
      );

    if (!response.ok){

      const data =
        await response.json().catch(
          () => null,
        );

        throw new Error(
          data?.message ??
          "Não foi possível adicionar o produto ao marketplace."
        );
    }

    const data =
      await response.json() as ProductApiResponse;

    return mapProduct(data);

  }

  async updateMarketplaceStatus(
    productId: string,
    marketplaceId: number,
    status: MarketplaceStatus
  ): Promise<Product> {
    const response = await fetch(
      `${API_BASE_URL}/products/${productId}/marketplaces/${marketplaceId}/status`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status,
        }),
      },
    );

    if (!response.ok){
      const data =
        await response.json().catch(()=> null);

      throw new Error(
        data?.message ??
          "Não foi possível atualizar o stsatus do marketplace.",
      );
    }

    const data =
      await response.json() as ProductApiResponse;

    return mapProduct(data);

  }

  async deleteMarketplace(
    productId: string,
    marketplaceId: number,
  ): Promise<Product> {
    const response = await fetch(
      `${API_BASE_URL}/products/${productId}/marketplaces/${marketplaceId}`,
      {
        method: "DELETE",
      },
    );

    if(!response.ok){
      const data =
        await response.json().catch(()=> null);

      throw new Error(
        data?.message ??
          "Não foi possível excluir o marketplace.",
      );
    }

    const data =
      await response.json() as ProductApiResponse;

    return mapProduct(data);
  }

  async getMarketplaces(): Promise<CentralMarketplace[]>{
    const response = await fetch(
      `${API_BASE_URL}/marketplaces`,
    );

    if(!response.ok){
      throw new Error(
        "Não foi possível carregar os marketplaces."
      );
    }

    return response.json();
  }
}
