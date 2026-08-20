/**
 * ==========================================================
 * Componente: ProductDeleteModal
 *
 * Modal de confirmação da exclusão de um produto.
 * ==========================================================
 */

import type {
  ProductDeleteModalProps,
} from "./ProductDeleteModal.types";

export function ProductDeleteModal({
  product,
  loading = false,
  onCancel,
  onConfirm,
}: ProductDeleteModalProps) {

  return (

    <div
      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        bg-black/40
        p-4
      "
    >

      <div
        className="
          w-full
          max-w-md
          rounded-xl
          bg-white
          p-6
          shadow-xl
        "
      >

        <h2
          className="
            text-xl
            font-semibold
            text-slate-900
          "
        >
          Excluir produto?
        </h2>

        <p
          className="
            mt-2
            text-sm
            text-slate-500
          "
        >
          Você está prestes a excluir o seguinte produto:
        </p>

        <div
          className="
            mt-4
            rounded-lg
            bg-slate-50
            p-4
          "
        >

          <p className="font-semibold text-slate-900">
            {product.titulo}
          </p>

          <p className="mt-1 text-sm text-slate-500">
            Código: {product.codigo}
          </p>

          <p className="text-sm text-slate-500">
            SKU: {product.sku}
          </p>

        </div>

        <p
          className="
            mt-4
            text-sm
            text-red-600
          "
        >
          Esta ação não poderá ser desfeita.
        </p>

        <div
          className="
            mt-6
            flex
            justify-end
            gap-3
          "
        >

          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="
              rounded-lg
              border
              border-slate-300
              px-4
              py-2
              text-sm
              font-medium
              text-slate-700
              hover:bg-slate-50
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            Cancelar
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className="
              rounded-lg
              bg-red-600
              px-4
              py-2
              text-sm
              font-medium
              text-white
              hover:bg-red-700
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            {loading
              ? "Excluindo..."
              : "Excluir"}
          </button>

        </div>

      </div>

    </div>

  );
}
