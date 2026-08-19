/**
 * ==========================================================
 * Página: ProductsPage
 *
 * Página principal do módulo Produtos.
 *
 * A página é responsável pela composição visual.
 * As regras de acesso e pesquisa ficam no Hook/Service.
 *
 * Também controla a navegação entre:
 *
 * - Lista de produtos
 * - Cadastro de novo produto
 *
 * A persistência será conectada posteriormente ao Service.
 * ==========================================================
 */

import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  ProductTable,
  ProductToolbar,
} from "../components";

import {
  ProductFormPage,
} from "./ProductFormPage";

import {
  useProducts,
} from "../hooks";

import {
  useDebounce,
} from "../../../shared/hooks";

import type {
  ProductFormData,
} from "../components";

/**
 * Página principal de produtos.
 */
export function ProductsPage() {

  /**
   * Controla qual tela do módulo está sendo exibida.
   *
   * false = lista de produtos
   * true  = cadastro de produto
   */
  const [showCreateForm, setShowCreateForm] =
    useState(false);

  /**
   * Termo informado na pesquisa.
   */
  const [search, setSearch] =
    useState("");

  /**
   * Aguarda 300ms após o usuário parar de digitar
   * antes de executar a pesquisa.
   */
  const debouncedSearch =
    useDebounce(search, 300);

  /**
   * Evita executar a pesquisa automaticamente
   * na primeira renderização.
   */
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

  /**
   * Atualiza o termo de pesquisa.
   */
  function handleSearch(
    value: string,
  ) {

    setSearch(value);

  }

  /**
   * Executa a pesquisa quando o usuário
   * termina de digitar.
   */
  useEffect(() => {

    if (!searchInitialized.current) {

      searchInitialized.current = true;

      return;

    }

    void searchProducts(
      debouncedSearch,
    );

  }, [
    debouncedSearch,
    searchProducts,
  ]);

  /**
   * Abre o formulário de novo produto.
   */
  function handleCreate() {

    setShowCreateForm(true);

  }

  /**
   * Fecha o formulário e retorna para
   * a lista de produtos.
   */
  function handleCancelCreate() {

    setShowCreateForm(false);

  }

  /**
   * Executado quando o formulário é enviado.
   *
   * Neste momento estamos apenas verificando
   * se os dados chegam corretamente.
   *
   * Na próxima etapa vamos conectar essa função
   * ao ProductService.
   */
  async function handleCreateSubmit(
    data: ProductFormData,
  ) {

    console.log(
      "Dados do novo produto:",
      data,
    );

    /**
     * Retornamos para a lista somente depois
     * que o envio for concluído.
     */
    setShowCreateForm(false);

  }

  /**
   * --------------------------------------------------------
   * MODO: CADASTRO
   * --------------------------------------------------------
   *
   * Quando showCreateForm for true, exibimos a página
   * de cadastro no lugar da tabela.
   */
  if (showCreateForm) {

    return (

      <ProductFormPage

        onCancel={
          handleCancelCreate
        }

        onSubmit={
          handleCreateSubmit
        }

      />

    );

  }

  /**
   * --------------------------------------------------------
   * MODO: LISTA
   * --------------------------------------------------------
   */

  return (

    <section className="space-y-6">

      {/* Cabeçalho da página */}
      <header>

        <h1 className="text-3xl font-bold text-slate-900">
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
