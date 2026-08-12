import type {
  ProductStatusBadgeProps,

} from "./ProductStatusBadge.types"

import {
  MarketplaceStatus,

} from "../../types"

export function ProductStatusBadge({
  status,
}: ProductStatusBadgeProps) {

  /**
   * Define o texto apresentado ao usuário.
   */
  const labels: Record<
    MarketplaceStatus,
    string
  > = {
    [MarketplaceStatus.NOT_SENT]: "Não enviado",

    [MarketplaceStatus.PROCESSING]: "Processando",

    [MarketplaceStatus.SENT]: "Enviado",

    [MarketplaceStatus.ERROR]: "Erro",
  };

  /**
   * Define as classes visuais.
   */
  const classes: Record<
    MarketplaceStatus,
    string
  > = {
    [MarketplaceStatus.NOT_SENT]:
      "bg-slate-100 text-slate-700",

    [MarketplaceStatus.PROCESSING]:
      "bg-yellow-100 text-yellow-700",

    [MarketplaceStatus.SENT]:
      "bg-green-100 text-green-700",

    [MarketplaceStatus.ERROR]:
      "bg-red-100 text-red-700",
  };

  return (
    <span
      className={`
        inline-flex
        items-center
        rounded-full
        px-2.5
        py-1
        text-xs
        font-medium
        ${classes[status]}
        `}
    >
      {labels[status]}
    </span>

  );
}



