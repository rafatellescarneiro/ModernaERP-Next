/**
 * ==========================================================
 * Arquivo: ProductFormPage.tsx
 *
 * Página responsável pelo cadastro de um novo produto.
 *
 * Nesta etapa, a página apenas compõe o formulário.
 * A persistência dos dados será conectada posteriormente
 * ao ProductService.
 * ==========================================================
 */

import {
  ProductForm,
} from "../../components";

import type {
  ProductFormData,
} from "../../components";

/**
 * Propriedades da página de cadastro.
 */
interface ProductFormPageProps {

  /**
   * Executado quando o usuário cancela o cadastro.
   */
  onCancel: () => void;

  /**
   * Executado quando o formulário é enviado.
   */
  onSubmit: (
    data: ProductFormData,
  ) => void | Promise<void>;

}

/**
 * Página de cadastro de produto.
 */
export function ProductFormPage({
  onCancel,
  onSubmit,
}: ProductFormPageProps) {

  return (

    <section className="space-y-6">

      {/* Cabeçalho da página */}
      <header>

        <h1 className="text-3xl font-bold text-slate-900">
          Novo Produto
        </h1>

        <p className="mt-1 text-slate-500">
          Cadastre um novo produto no Moderna ERP.
        </p>

      </header>

      {/* Formulário de cadastro */}
      <ProductForm

        onSubmit={onSubmit}

        onCancel={onCancel}

      />

    </section>

  );

}
