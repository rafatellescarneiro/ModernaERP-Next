/**
 * ==========================================================
 * Componente: ProductForm
 *
 * Formulário utilizado para cadastro de produtos.
 *
 * Neste primeiro momento o componente é responsável
 * somente pela interface e pelo controle dos campos.
 *
 * A persistência será conectada posteriormente ao Service.
 * ==========================================================
 */

import {
  useState,
} from "react";

import type {
  FormEvent,
} from "react";

import type {
  ProductFormData,
  ProductFormProps,
} from "./ProductForm.types";

/**
 * Estado inicial do formulário.
 */
const initialFormData: ProductFormData = {

  codigo: "",

  sku: "",

  titulo: "",

  descricao: "",

  quantidade: 0,

};

/**
 * Formulário de cadastro de produto.
 */
export function ProductForm({
  onSubmit,
  onCancel,
  loading = false,
}: ProductFormProps) {

  /**
   * Mantém os valores preenchidos pelo usuário.
   */
  const [formData, setFormData] =
    useState<ProductFormData>(
      initialFormData,
    );

  /**
   * Atualiza um campo específico do formulário.
   *
   * Dessa forma evitamos criar uma função diferente
   * para cada campo.
   */
  function handleChange(
    field: keyof ProductFormData,
    value: string,
  ) {

    setFormData(
      (current) => ({

        ...current,

        [field]:
          field === "quantidade"
            ? Number(value)
            : value,

      }),
    );

  }

  /**
   * Processa o envio do formulário.
   */
  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {

    event.preventDefault();

    await onSubmit(formData);

  }

  return (

    <form
      onSubmit={handleSubmit}
      className="
        space-y-6
        rounded-xl
        border
        border-slate-200
        bg-white
        p-6
        shadow-sm
      "
    >

      {/* Cabeçalho do formulário */}
      <div>

        <h2 className="text-xl font-semibold text-slate-900">
          Cadastro de Produto
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Preencha os dados básicos do produto.
        </p>

      </div>

      {/* Campos principais */}
      <div className="grid gap-6 md:grid-cols-2">

        {/* Código */}
        <div>

          <label
            htmlFor="codigo"
            className="
              mb-2
              block
              text-sm
              font-medium
              text-slate-700
            "
          >
            Código
          </label>

          <input
            id="codigo"
            name="codigo"
            type="text"
            value={formData.codigo}
            onChange={(event) =>
              handleChange(
                "codigo",
                event.target.value,
              )
            }
            placeholder="Ex.: 10025"
            required
            disabled={loading}
            className="
              w-full
              rounded-lg
              border
              border-slate-300
              px-3
              py-2.5
              text-sm
              outline-none
              transition
              focus:border-slate-500
              focus:ring-2
              focus:ring-slate-200
              disabled:bg-slate-100
            "
          />

        </div>

        {/* SKU */}
        <div>

          <label
            htmlFor="sku"
            className="
              mb-2
              block
              text-sm
              font-medium
              text-slate-700
            "
          >
            SKU
          </label>

          <input
            id="sku"
            name="sku"
            type="text"
            value={formData.sku}
            onChange={(event) =>
              handleChange(
                "sku",
                event.target.value,
              )
            }
            placeholder="Ex.: MC10025"
            required
            disabled={loading}
            className="
              w-full
              rounded-lg
              border
              border-slate-300
              px-3
              py-2.5
              text-sm
              outline-none
              transition
              focus:border-slate-500
              focus:ring-2
              focus:ring-slate-200
              disabled:bg-slate-100
            "
          />

        </div>

      </div>

      {/* Título */}
      <div>

        <label
          htmlFor="titulo"
          className="
            mb-2
            block
            text-sm
            font-medium
            text-slate-700
          "
        >
          Título do produto
        </label>

        <input
          id="titulo"
          name="titulo"
          type="text"
          value={formData.titulo}
          onChange={(event) =>
            handleChange(
              "titulo",
              event.target.value,
            )
          }
          placeholder="Ex.: Mesa de Jantar Carolina"
          required
          disabled={loading}
          className="
            w-full
            rounded-lg
            border
            border-slate-300
            px-3
            py-2.5
            text-sm
            outline-none
            transition
            focus:border-slate-500
            focus:ring-2
            focus:ring-slate-200
            disabled:bg-slate-100
          "
        />

      </div>

      {/* Descrição */}
      <div>

        <label
          htmlFor="descricao"
          className="
            mb-2
            block
            text-sm
            font-medium
            text-slate-700
          "
        >
          Descrição
        </label>

        <textarea
          id="descricao"
          name="descricao"
          value={formData.descricao}
          onChange={(event) =>
            handleChange(
              "descricao",
              event.target.value,
            )
          }
          placeholder="Digite a descrição do produto..."
          rows={5}
          disabled={loading}
          className="
            w-full
            resize-y
            rounded-lg
            border
            border-slate-300
            px-3
            py-2.5
            text-sm
            outline-none
            transition
            focus:border-slate-500
            focus:ring-2
            focus:ring-slate-200
            disabled:bg-slate-100
          "
        />

      </div>

      {/* Quantidade */}
      <div className="max-w-xs">

        <label
          htmlFor="quantidade"
          className="
            mb-2
            block
            text-sm
            font-medium
            text-slate-700
          "
        >
          Quantidade
        </label>

        <input
          id="quantidade"
          name="quantidade"
          type="number"
          min="0"
          value={formData.quantidade}
          onChange={(event) =>
            handleChange(
              "quantidade",
              event.target.value,
            )
          }
          required
          disabled={loading}
          className="
            w-full
            rounded-lg
            border
            border-slate-300
            px-3
            py-2.5
            text-sm
            outline-none
            transition
            focus:border-slate-500
            focus:ring-2
            focus:ring-slate-200
            disabled:bg-slate-100
          "
        />

      </div>

      {/* Ações */}
      <div
        className="
          flex
          flex-col-reverse
          gap-3
          border-t
          border-slate-200
          pt-6
          sm:flex-row
          sm:justify-end
        "
      >

        {/* Cancelar */}
        {onCancel && (

          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="
              rounded-lg
              border
              border-slate-300
              px-5
              py-2.5
              text-sm
              font-medium
              text-slate-700
              transition
              hover:bg-slate-50
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            Cancelar
          </button>

        )}

        {/* Salvar */}
        <button
          type="submit"
          disabled={loading}
          className="
            rounded-lg
            bg-slate-900
            px-5
            py-2.5
            text-sm
            font-medium
            text-white
            transition
            hover:bg-slate-800
            disabled:cursor-not-allowed
            disabled:opacity-50
          "
        >
          {loading
            ? "Salvando..."
            : "Salvar produto"}
        </button>

      </div>

    </form>

  );

}
