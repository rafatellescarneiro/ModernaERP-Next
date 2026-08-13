/**
 * ==========================================================
 * Componente: ProductPagination
 *
 * Controle de navegação entre páginas.
 * ==========================================================
*/

import type {
  ProductPaginationProps,

} from "./ProductPagination.types";

export function ProductPagination({
  currentPage,
  totalPages,
  onPageChange

}: ProductPaginationProps){
  return(
<div className="flex items-center justify-between">

      <span className="text-sm text-slate-500">
        Página {currentPage} de {totalPages}
      </span>

      <div className="flex gap-2">

        <button
          type="button"
          disabled={currentPage === 1}
          onClick={() =>
            onPageChange(currentPage - 1)
          }
          className="
            rounded-lg
            border
            px-3
            py-2
            text-sm
            disabled:cursor-not-allowed
            disabled:opacity-50
          "
        >
          Anterior
        </button>

        <button
          type="button"
          disabled={
            currentPage === totalPages
          }
          onClick={() =>
            onPageChange(currentPage + 1)
          }
          className="
            rounded-lg
            border
            px-3
            py-2
            text-sm
            disabled:cursor-not-allowed
            disabled:opacity-50
          "
        >
          Próxima
        </button>

      </div>

    </div>
  )

}
