/**
 * ==========================================================
 * Arquivo: useProducts.ts
 *
 * Hook responsável por controlar o estado dos produtos
 * utilizado pela interface.
 *
 * O componente visual não precisa conhecer detalhes
 * do Repository ou Provider.
 * ==========================================================
 */

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import type {
  Product,
} from "../types";

import {
  createProductService,
} from "../../../app/dependencies/products";

import type {
  CreateProductData,

} from "../services/ProductService";

/**
 * Retorno disponibilizado pelo Hook.
 */
export interface UseProductsResult {

  /**
   * Produtos carregados.
   */
  products: Product[];

  /**
   * Indica se os dados estão sendo carregados.
   */
  loading: boolean;

  /**
   * Mensagem de erro, caso ocorra.
   */
  error: string | null;

  /**
   * Recarrega os produtos.
   */
  reload: () => Promise<void>;

  /**
   * Pesquisa produtos por código ou SKU
   */
  search:(
    term: string,
  ) => Promise<void>;

  create:(
    data: CreateProductData,

  )=> Promise<Product>;

}

/**
 * Hook principal do módulo Produtos.
 */
export function useProducts(): UseProductsResult {

  /**
   * Instância do Service.
   */
  const service = useMemo(
    () => createProductService(),
    [],
  );

  const [products, setProducts] =
    useState<Product[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  /**
   * Carrega os produtos através do Service.
   */
  const loadProducts =
    useCallback(async () => {

      try {

        setLoading(true);

        const result =
          await service.getProducts();

        setProducts(result);

        setError(null);

      } catch {

        setError(
          "Não foi possível carregar os produtos.",
        );

      } finally {

        setLoading(false);

      }

    }, [service]);

  /**
   * Carrega os produtos quando o Hook
   * é inicializado.
   */

  const search =
    useCallback(
      async(term: string) => {

        try{

          setLoading(true);

          const result =
            await service.searchList(term);

          setProducts(
            result.products,
          );

          setError(
            result.message ?? null,
          );

      } catch {

        setError(
          "Não foi possível realizar a pesquisa.",
        );

      } finally{

        setLoading(false);

      }

    },
    [service],

    );

  const create = useCallback(
    async(
      data: CreateProductData,

    ): Promise<Product> => {

      try{
        setLoading(true);

        setError(null);

        const product =
          await service.create(data);

        setProducts(
          (current)=>[
            ...current,
            product,
          ],
        );

        return product;

      } catch (error) {

        const message =
          error instanceof Error
            ? error.message
            : "Não foi possível cadastrar o produto.";

        setError(message);

        throw new Error(
          message,
          {
            cause: error,
          }
        );

      } finally {
        setLoading(false);
      }
    },
    [service],
  );



  useEffect(() => {

    let cancelled = false

    async function initialize(){

      try {

        const result =
          await service.getProducts();

        /**
         * Evita atualizar o estado caso o componente
         * tenha sido desmontado antes da resposta.
         */

        if(cancelled){
          return;
        }

        setProducts(result);

        setError(null);

      } catch {

        if(cancelled){
          return;
        }

        setError(
          "Não foi possível carregar os produtos"
        );

      } finally {

        if(!cancelled){
          setLoading(false);
        }

      }

    }

    void initialize();

    /**
     * Cleanup executado quando o componente
     * é desmontado.
     */

    return ()=>{
      cancelled = true;

    };

  }, [service]);

  return {
    products,

    loading,

    error,

    reload: loadProducts,

    search,

    create,
  };
}
