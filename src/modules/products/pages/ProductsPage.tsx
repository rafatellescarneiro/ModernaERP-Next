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

import type {
  Product,
} from "../types"

import {
  ProductStep,
} from "../types"

import {
  ProductDeleteModal
} from "../components"

import {
  ProductDetailsPage,
} from "./ProductDetailsPage";

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

  const [editingProduct, setEditingProduct] =
    useState<Product | null>(null);

  const [deletingProduct, setDeletingProduct] =
    useState<Product | null>(null);

  /**
   * Aguarda 300ms após o usuário parar de digitar
   * antes de executar a pesquisa.
   */
  const debouncedSearch =
    useDebounce(search, 600);

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
    marketplaces,
    loading,
    error,
    search: searchProducts,
    loadMarketplaces,
    create,
    update,
    delete: deleteProduct,
    updateStep,
    addMarketplace,
    updateMarketplaceStatus,
    deleteMarketplace,
  } = useProducts();

  const [
    viewingProduct,
    setViewingProduct,
  ] = useState<Product | null>(
    null,
  );

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
   * Atualiza o termo de pesquisa.
   */
  function handleSearch(
    value: string,
  ) {

    setSearch(value);

  }

  function handleEdit(
    product: Product,
  ){
    setEditingProduct(
      product,
    );

  }

  function handleDelete(
    product: Product,
  ){
    setDeletingProduct(
      product,
    );

  }

  function handleView(
    product: Product,
  ) {
    setViewingProduct(
      product,
    );
  }

  function handleCloseView(){
    setViewingProduct(
      null,
    );
  }

  function handleEditFromDetails(
    product: Product,
  ){
    setViewingProduct(
      null,
    );

    setEditingProduct(
      product,
    );

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

    await create(data);

    setShowCreateForm(false);

  }

  async function handleEditSubmit(
    data: ProductFormData,
  ){

    if(!editingProduct){
      return;
    }

    await update(
      editingProduct,
      data,
    );

    setEditingProduct(null);
  }

  async function handleConfirmDelete(){

    if(!deletingProduct){
      return;
    }

    await deleteProduct(
      deletingProduct,
    );

    setDeletingProduct(null);
  }

  async function handleUpdateStep(
    product: Product,
    step: ProductStep,
  ){

    await updateStep(
      product,
      step,
    );
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
 * Se existir um produto em edição,
 * apresenta o formulário de edição.
 */
  if (editingProduct) {

    return (

      <ProductFormPage

        initialData={{
          codigo:
            editingProduct.codigo,

          sku:
            editingProduct.sku,

          titulo:
            editingProduct.titulo,

          descricao:
            editingProduct.descricao,

          quantidade:
            editingProduct.quantidade,
        }}

        onCancel={() =>
          setEditingProduct(null)
        }

        onSubmit={
          handleEditSubmit
        }

      />

    );

  }

  if(viewingProduct){
    return(
      <ProductDetailsPage
        product={viewingProduct}
        onBack={handleCloseView}
        onEdit={handleEditFromDetails}
        onAddMarketplace={addMarketplace}
        onUpdateMarketplaceStatus={
          updateMarketplaceStatus
        }
        onDeleteMarketplace={
          deleteMarketplace
        }
        marketplaces={marketplaces}
        onLoadMarketplaces={loadMarketplaces}
      />
    )
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
          Gerenciamento de cadastrado.
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

          onView={handleView}

          onEdit={
            handleEdit
          }

          onDelete={
            handleDelete
          }

          onUpdateStep={handleUpdateStep}

        />

      )}

      {deletingProduct && (

        <ProductDeleteModal

          product={
            deletingProduct

          }

          loading={
            loading

          }

          onCancel={()=>
            setDeletingProduct(null)
          }

          onConfirm={
            handleConfirmDelete
          }
          />
      )}

    </section>

  );

}
