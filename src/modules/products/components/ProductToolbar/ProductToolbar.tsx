/**
 * ==========================================================
 * Componente: ProductToolbar
 *
 * Barra de ações da página de produtos.
 * ==========================================================
*/

import {
  ProductSearch,
} from "../ProductSearch"

import type {
  ProductToolbarProps,

} from "./ProductToolbar.types"

export function ProductToolbar({
  search,
  onSearchChange,
  onCreate,

}: ProductToolbarProps){

  return(
    <div
      className="
        flex
        flex-col
        gap-4
        sm:flex-row
        sm:items-center
        sm:justify-between
      "
    >

      <ProductSearch
        value={search}
        onChange={onSearchChange}
      />

      <button
        type="button"
        onClick={onCreate}
        className="
          rounded-lg
          bg-blue-600
          px-4
          py-2.5
          text-sm
          font-medium
          text-white
          transition
          hover:bg-blue-700
        "
      >
        + Novo Produto
      </button>

    </div>

  );

}

