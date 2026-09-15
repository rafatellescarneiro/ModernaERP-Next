import type {
  MarketplaceProvider,
} from "./MarketplaceProvider"

import type {
  Marketplace,
} from "../types/Marketplace";

import {
  API_BASE_URL,
} from "../../../config/api";

export class ApiMarketplaceProvider
  implements MarketplaceProvider {

    async getAll(): Promise<Marketplace[]>{
      const response = await fetch(
        `${API_BASE_URL}/marketplaces`,
      );

      if (!response.ok){
        throw new Error(
          "Não foi possível carregar os marketplaces."
        );
      }


    return response.json();
    }

    async create(
      nome: string,
    ): Promise<Marketplace>{

      const response = await fetch(
        `${API_BASE_URL}/marketplaces`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
        },

        body: JSON.stringify({
          nome,
        }),
      },
    );

    if(!response.ok){

      const data =
        await response.json().catch(
          () => null,
        );

        throw new Error(
          data?.message ??
            "Não foi possível cadastrar o marketplace.",
        );
    }


    return response.json();
  }

  async update(
    id: number,
    nome: string,
  ): Promise<Marketplace>{

    const response = await fetch(
      `${API_BASE_URL}/marketplaces/${id}`,
      {
        method: "PUT",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          nome,
        }),
      },
    );

    if(!response.ok){

      const data =
        await response.json().catch(
          ()=> null,
        );

        throw new Error(
          data?.message
            ?? "Não foi possível atualizar o marketplace.",
        );
    }


    return response.json();
  }

  async updateActive(
    id: number,
    ativo: boolean
  ): Promise<Marketplace> {

    const response = await fetch(
      `${API_BASE_URL}/marketplaces/${id}/active`,
      {
        method: "PATCH",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          ativo,
        }),
      },
    );

    if(!response.ok){

      const data =
        await response.json().catch(
          () => null,
        );

      throw new Error(
        data?.message ??
          "Não foi possível alterar o status do marketplace.",
      );
    }

    return response.json();
  }
}
