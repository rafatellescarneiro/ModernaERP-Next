/**
 * ==========================================================
 * Página: ProductsPage
 *
 * Página principal do módulo Produtos.
 *
 * A página é responsável pela composição visual.
 * As regras de acesso e pesquisa ficam no Hook/Service.
 * ==========================================================
*/

import{
  useEffect,
  useRef,
  useState,

} from "react";

import{
  ProductTable,
  ProductToolbar,

} from "../components"

import{
  useProducts,
} from "../hooks";

import{
  useDebounce,
} from "../../../shared/hooks"


/**
 * Página principal de produtos.
*/


export function ProductsPage() {

  /**
   * Termo informado na pesquisa.
   */
  const [search, setSearch] =
    useState("");

  const debouncedSearch =
    useDebounce(search, 300)

  const searchInitialized =
    useRef(false);

  /**
   * Dados e estado do módulo.
   */

  const {
    products,
    loading,
    error,
    search: searchProducts,
  } = useProducts();

  function handleSearch(
    value: string,
  ){

    setSearch(value);

  }

  useEffect(()=>{

    if(!searchInitialized.current){
      searchInitialized.current =true

      return;

    }

    void searchProducts(
      debouncedSearch,
    );


  },[
    debouncedSearch,
    searchProducts,
  ]);

/**
 * Executado quando o usuário clica
 * em Novo Produto.
 */

  function handleCreate(){

    console.log(
      "Novo produto",
    );
  }


  return (

    <section className="space-y-6">

      {/* Cabeçalho da página */}
      <header>

        <h1 className="text-3xl font-bold">
          Produtos
        </h1>

        <p className="mt-1 text-slate-500">
          Gerenciamento dos produtos cadastrados.
        </p>

      </header>

      {/* Barra de pesquisa */}
      <ProductToolbar

        search={search}

        onSearchChange={
          handleSearch
        }

        onCreate={
          handleCreate
        }

      />

      {/* Carregamento */}
      {loading && (

        <div
          className="
            rounded-xl
            border
            bg-white
            p-8
            text-center
            text-slate-500
          "
        >
          Carregando produtos...
        </div>

      )}

      {/* Erro */}
      {!loading && error && (

        <div
          className="
            rounded-xl
            border
            border-red-200
            bg-red-50
            p-8
            text-center
            text-red-600
          "
        >
          {error}
        </div>

      )}

      {/* Tabela */}
      {!loading && !error && (

        <ProductTable
          products={
            products
          }

          onView={(product) =>
            console.log(
              "Visualizar:",
              product,
            )
          }

          onEdit={(product) =>
            console.log(
              "Editar:",
              product,
            )
          }

        />

      )}

    </section>

  );
}
