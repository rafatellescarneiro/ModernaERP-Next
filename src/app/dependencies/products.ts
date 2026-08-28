/**
 * ==========================================================
 * Arquivo: products.ts
 *
 * Centraliza a criação das dependências do módulo Produtos.
 *
 * Atualmente utilizando a API Flask.
 * ==========================================================
 */

import {
  ApiProductProvider,
} from "../../modules/products/providers";

import {
  ProductRepository,
} from "../../modules/products/repositories";

import {
  ProductService,
} from "../../modules/products/services";


/**
 * Cria uma instância do ProductService utilizando
 * o Provider atualmente configurado.
 */
export function createProductService(): ProductService {

  /**
   * API Flask como fonte dos dados.
   */
  const provider =
    new ApiProductProvider();

  /**
   * Repository responsável pelo acesso aos dados.
   */
  const repository =
    new ProductRepository(
      provider,
    );

  /**
   * Service responsável pelas regras de negócio.
   */
  return new ProductService(
    repository,
  );
}
