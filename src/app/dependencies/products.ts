/**
 * ==========================================================
 * Arquivo: products.ts
 *
 * Centraliza a criação das dependências do módulo Produtos.
 *
 * A página e os componentes não precisam saber qual
 * Provider está sendo utilizado.
 *
 * Atualmente:
 *
 * MockProductProvider
 *
 * Futuramente poderemos substituir por:
 *
 * ExcelProductProvider
 * SQLiteProductProvider
 * ApiProductProvider
 * etc.
 * ==========================================================
*/

import {
  MockProductProvider,

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

export function createProductService(): ProductService{

  /**
   * Fonte atual dos dados.
   *
   * Durante o desenvolvimento estamos utilizando
   * dados simulados.
  */

  const provider =
  new MockProductProvider();

  /**
   * Repository responsável pelo acesso aos dados.
  */

  const repository =
    new ProductRepository(provider);

  /**
   * Service responsável pelas regras de negócio.
  */

 return new ProductService(repository);
}


