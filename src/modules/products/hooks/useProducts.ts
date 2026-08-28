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
  ProductStep,
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

  update:(
    product:Product,
    data: CreateProductData,
  ) => Promise<Product>;

  updateStep:(
    product: Product,
    step: ProductStep,
  ) => Promise<Product>;

  delete:(
    product: Product
  ) => Promise<void>
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

  const update = useCallback(
    async(
      product: Product,
      data: CreateProductData,
    ): Promise<Product> => {

      try{

        setLoading(true);

        setError(null);

        const updateProduct =
          await service.update(
            product,
            data,
          );

          setProducts(
            (current) =>
              current.map(
                (currentProduct) =>
                  currentProduct.id === product.id
                    ? updateProduct
                    : currentProduct,
              ),
          );

        return updateProduct;

      } catch(error){

        const message =
        error instanceof Error
        ? error.message
        : "Não foi possível atualizar o produto.";

        setError(message);

        throw new Error(
          message,{
            cause: error,
          }
        );

      } finally{
        setLoading(false)
      }

    },
    [service],
  )

  const updateStep =
  useCallback(
    async (
      product: Product,
      step: ProductStep,
    ): Promise<Product> => {

      try {

        setLoading(true);

        setError(null);

        const updatedProduct =
          await service.updateStep(
            product,
            step,
          );

        setProducts(
          (current) =>
            current.map(
              (currentProduct) =>
                currentProduct.id === product.id
                  ? updatedProduct
                  : currentProduct,
            ),
        );

        return updatedProduct;

      } catch (error) {

        const message =
          error instanceof Error
            ? error.message
            : "Não foi possível atualizar a etapa.";

        setError(
          message,
        );

        throw new Error(
          message,
          {
            cause: error,
          },
        );

      } finally {

        setLoading(
          false,
        );

      }

    },
    [service],
  );

  const deleteProduct = useCallback(
    async(
      product: Product,
    ): Promise<void> =>{
      try{

        setLoading(true);

        setError(null);

        await service.delete(
          product,
        );

        setProducts(
          (current) =>
            current.filter(
              (currentProduct)=>
                currentProduct.id !== product.id,
            ),
        );

      }catch(error){

        const message=
          error instanceof Error
            ? error.message
            : "Não foi possível excluir o produto.";

          setError(message);

          throw new Error(
            message,{
              cause:error,
            },
          );

      }finally{
        setLoading(false);
      }
    },
    [service]
  )


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

    update,

    updateStep,

    delete: deleteProduct,
  };
}
