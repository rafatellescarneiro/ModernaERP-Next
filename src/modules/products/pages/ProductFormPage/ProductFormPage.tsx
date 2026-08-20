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
  useState,

} from "react";

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

  initialData?: ProductFormData;

  isEditing?: boolean

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
  initialData,
  isEditing = false,
  onCancel,
  onSubmit,
}: ProductFormPageProps) {

  const [error, setError] =
    useState<string | null>(null);

  const [loading, setLoading] =
    useState(false);

  async function handleSubmit(
    data: ProductFormData,
  ) {
    try{

      setError(null);

      setLoading(true);

      await onSubmit(data);

    } catch (error) {

      const message =
        error instanceof Error
        ? error.message
        : "Não foi possível cadastrar o produto."

      setError(message);
    } finally {

      setLoading(false)
    }

  }

  return (

    <section className="space-y-6">

      {/* Cabeçalho da página */}
      <header>

        <h1 className="text-3xl font-bold text-slate-900">
          {isEditing
            ? "Editar Produto"
            : "Novo Produto"}
        </h1>

        <p className="mt-1 text-slate-500">
          {isEditing
            ? "Altere os dados do produto cadastrado."
            : "Cadastre um novo produto no Moderna ERP."}
        </p>

      </header>

      {error &&(
        <div
          role="alert"
          className="
            rounded-lg
            border
            border-red-200
            bg-red-50
            px-4
            py-3
            text-sm
            text-red-700
          "
        >
          <strong className="font-semibold">
            Não foi possível cadastrar o produto.
          </strong>

          <p className="mt-1">
            {error}
          </p>

        </div>
      )}

      {/* Formulário de cadastro */}
      <ProductForm

        initialData={initialData}

        onSubmit={handleSubmit}

        onCancel={onCancel}

        loading = {loading}

      />

    </section>

  );

}
