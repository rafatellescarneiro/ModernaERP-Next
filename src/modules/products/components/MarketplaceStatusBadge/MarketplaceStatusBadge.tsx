import {
  MarketplaceStatus,
} from "../../types/Marketplace";

interface MarketplaceStatusBadgeProps {
  status: MarketplaceStatus;
}

const statusLabel: Record<
  MarketplaceStatus,
  string
> = {
  [MarketplaceStatus.NOT_SENT]:
    "Não enviado.",

  [MarketplaceStatus.PROCESSING]:
    "Processando",

  [MarketplaceStatus.SENT]:
    "Publicado",

  [MarketplaceStatus.ERROR]:
    "Erro",
};

export function MarketplaceStatusBadge({
  status,

}: MarketplaceStatusBadgeProps ){

  return (
    <span
      className="
        rounded-full
        bg-slate-100
        px-3
        py-1
        text-xs
        font-medium
        text-slate-700
      "
    >
      {statusLabel[status]}
    </span>
  )

}



