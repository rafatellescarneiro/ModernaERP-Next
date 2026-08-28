/**
 * ==========================================================
 * Arquivo: ProductService.ts
 *
 * Contém as regras de negócio relacionadas aos produtos.
 *
 * O Service não conhece detalhes de interface.
 * ==========================================================
*/

import type { Product } from "../types";

import {
  ProductStep,
} from "../types"

import {
  ProductRepository,

} from "../repositories";

export interface ProductSearchResult {
  product?: Product;

  conflict: boolean;

  message?: string;


}

export interface ProductListSearchResult {

  products: Product[];

  conflict: boolean;

  message?: string;

}

export interface CreateProductData {

  /**
   * Código interno do produto.
   */
  codigo: string;

  /**
   * SKU do produto.
   */
  sku: string;

  /**
   * Título comercial.
   */
  titulo: string;

  /**
   * Descrição comercial.
   */
  descricao: string;

  /**
   * Quantidade disponível.
   */
  quantidade: number;

}

export class ProductService {

  constructor(
    private readonly repository: ProductRepository,

  ){}

  async create(
    data: CreateProductData,
  ): Promise<Product> {

    /**
     * Cria a entidade completa do produto.
     */
    const product: Product = {

      /**
       * Gera um identificador único para o produto.
       */
      id: crypto.randomUUID(),

      /**
       * Dados fornecidos pelo formulário.
       */
      codigo: data.codigo.trim(),

      sku: data.sku.trim(),

      titulo: data.titulo.trim(),

      descricao: data.descricao.trim(),

      quantidade: data.quantidade,

      /**
       * Data automática do cadastro.
       */
      dataCadastro: new Date(),

      /**
       * Todo produto novo começa na etapa ERP.
       */
      etapa: ProductStep.ERP,

      /**
       * Nenhum marketplace foi processado ainda.
       */
      marketplaces: [],

    };

    /**
     * Persiste o produto através do Repository.
     */
    return this.repository.save(
      product,
    );

  }

  async getProducts(): Promise<Product[]>{
    return this.repository.findAll();

  }

  /**
   * Pesquisa um produto utilizando código ou SKU.
   *
   * Regra:
   *
   * 1. Procura pelo código.
   * 2. Procura pelo SKU.
   * 3. Se forem produtos diferentes,
   *    retorna conflito.
   */
  async search(
    term: string,
  ): Promise<ProductSearchResult>{

    const normalizedTerm =
      term.trim();

    if(!normalizedTerm){

      return{
        conflict: false,
      };
    }

    const productByCodigo =
      await this.repository.findByCodigo(
        normalizedTerm,
      );

    const productBySku =
      await this.repository.findBySku(
        normalizedTerm,
      );

    if (!productByCodigo && !productBySku){
      return{
        conflict: false,

        message: "Produto não encontrado",
      };
    }

    if(
      productByCodigo &&
      productBySku &&
      productByCodigo.id !== productBySku.id
    ){
      return{
        conflict: true,

        message:
          "O código e o SKU informados pertencem a produtos diferentes."

      };
    }

    if(productByCodigo){
      return{
        product: productByCodigo,

        conflict: false,
      };
    }

    return {
      product: productBySku,

      conflict: false,
    };
  }

  /**
   * Pesquisa produtos por código ou SKU.
   *
   * Essa pesquisa é utilizada pela listagem da página.
   *
   * Diferentemente do método search(), este método
   * pode retornar vários produtos.
   */
  async searchList(
    term: string,
  ): Promise<ProductListSearchResult>{

    const normalizedTerm =
      term.trim().toLowerCase();

    if(!normalizedTerm){

      const products =
        await this.repository.findAll();

      return {
        products,

        conflict: false,

      };

    }

    const products =
      await this.repository.search(
        normalizedTerm,
      );

    return {
      products,
      conflict: false,
    }

    const filteredProducts =
      products.filter(
        (product) =>
          product.codigo
            .toLowerCase()
            .includes(normalizedTerm) ||
          product.sku
            .toLowerCase()
            .includes(normalizedTerm),
      );

    return {
      products: filteredProducts,

      conflict: false,
    };

  }
  /**
   * ==========================================================
   * Atualiza um produto existente.
   * ==========================================================
   */
  async update(
    product: Product,
    data: CreateProductData,
  ): Promise<Product>{

    const existingByCodigo =
      await this.repository.findByCodigo(
        data.codigo.trim(),
      );

      if(
        existingByCodigo &&
        existingByCodigo.id !== product.id
      ){
        throw new Error(
          "Já existe outro produto com este código"
        );

      }

    const existingBySku =
      await this.repository.findBySku(
        data.sku.trim(),
      );

      if(
        existingBySku &&
        existingBySku.id !== product.id
      ){
        throw new Error(
          "Já existe outro produto com este SKU",
        );
      }

    const updateProduct: Product = {
      ...product,

      codigo: data.codigo.trim(),

      sku: data.sku.trim(),

      titulo: data.titulo.trim(),

      descricao: data.descricao.trim(),

      quantidade: data.quantidade,
    };

    return this. repository.update(
      updateProduct,
    );

  }

  async updateStep(
    product: Product,
    step: ProductStep,
  ): Promise<Product>{

    return this.repository.updateStep(
      product.id,
      step,
    );
  }

  async delete(
    product: Product,

  ): Promise<void> {

    const existingProduct =
      await this.repository.findByCodigo(
        product.codigo,
      );

    if (
      !existingProduct ||
      existingProduct.id !== product.id
    ){
      throw new Error(
        "Produto não encontrado."
      );

    }

    await this.repository.delete(
      product.id,
    );

  }


}


