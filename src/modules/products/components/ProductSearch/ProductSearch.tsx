/**
 * ==========================================================
 * Componente: ProductSearch
 *
 * Campo utilizado para pesquisar produtos por código
 * ou SKU.
 * ==========================================================
*/

import type {
  ProductSearchProps,

} from "./ProductSearch.types";

export function ProductSearch({
  value,
  onChange,
  placeholder = "Pesquisar por código ou SKU...",

}: ProductSearchProps){
  return (
    <div className="relative w-full max-w-md">

      <input
        type="search"

        value={value}

        onChange={(event) =>
          onChange(event.target.value)
        }

        placeholder={placeholder}

        className="
          w-full
          rounded-lg
          border
          border-slate-200
          bg-white
          px-4
          py-2.5
          text-sm
          outline-none
          transition
          focus:border-blue-500
          focus:ring-2
          focus:ring-blue-100
        "
      />

    </div>

  );
}
