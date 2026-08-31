/**
 * ==========================================================
 * Componente: ProductTable
 *
 * Tabela principal do módulo Produtos.
 * ==========================================================
*/

import {
  ProductStatusBadge,

} from "../ProductStatusBadge";

import type {
  ProductTableProps,
} from "./ProductTable.types"

import {
  ProductStep,
  ProductStepLabel,
} from "../../types"

function getNextStep(
  step: ProductStep,
): ProductStep | null {

  switch(step){

    case ProductStep.ERP:
      return ProductStep.DESCRIPTION;

    case ProductStep.DESCRIPTION:
      return ProductStep.IMAGES;

    case ProductStep.IMAGES:
      return ProductStep.PRECODE;

    case ProductStep.PRECODE:
      return ProductStep.MARKETPLACE;

    case ProductStep.MARKETPLACE:
      return ProductStep.FINISHED;

    case ProductStep.FINISHED:
      return null;

    default:
      return null;


  }
}


export function ProductTable({
  products,
  onEdit,
  onView,
  onDelete,
  onUpdateStep,

}: ProductTableProps){

  return(
<div
      className="
        overflow-hidden
        rounded-xl
        border
        border-slate-200
        bg-white
      "
    >

      <div className="overflow-x-auto">

        <table className="w-full text-left">

          <thead className="border-b bg-slate-50">

            <tr>

              <th className="px-6 py-4 text-xs font-semibold uppercase text-slate-500">
                Código
              </th>

              <th className="px-6 py-4 text-xs font-semibold uppercase text-slate-500">
                SKU
              </th>

              <th className="px-6 py-4 text-xs font-semibold uppercase text-slate-500">
                Produto
              </th>

              <th className="px-6 py-4 text-xs font-semibold uppercase text-slate-500">
                Quantidade
              </th>

              <th className="px-6 py-4 text-xs font-semibold uppercase text-slate-500">
                Etapa
              </th>

              <th className="px-6 py-4 text-xs font-semibold uppercase text-slate-500">
                Marketplace
              </th>

              <th className="px-6 py-4 text-xs font-semibold uppercase text-slate-500">
                Ações
              </th>

            </tr>

          </thead>

          <tbody className="divide-y">

            {products.map((product) => {

              const firstMarketplace =
                product.marketplaces[0];

              const nextStep =
                getNextStep(
                  product.etapa,
                );

              console.log(
                "Produto:",
                product.codigo,
                "| Etapa:",
                product.etapa,
                "| Próxima:",
                nextStep,
              );

              return (

                <tr
                  key={product.id}
                  className="transition hover:bg-slate-50"
                >

                  <td className="px-6 py-4 text-sm font-medium">
                    {product.codigo}
                  </td>

                  <td className="px-6 py-4 text-sm text-slate-600">
                    {product.sku}
                  </td>

                  <td className="px-6 py-4">

                    <div className="font-medium">
                      {product.titulo}
                    </div>

                    <div className="text-xs text-slate-500">
                      {product.descricao}
                    </div>

                  </td>

                  <td className="px-6 py-4 text-sm">
                    {product.quantidade}
                  </td>

                  <td className="px-6 py-4">

                    <span className="text-sm">
                      {ProductStepLabel[product.etapa]}
                    </span>

                  </td>

                  <td className="px-6 py-4">

                    {firstMarketplace ? (

                      <ProductStatusBadge
                        status={
                          firstMarketplace.status
                        }
                      />

                    ) : (

                      <span className="text-sm text-slate-400">
                        —
                      </span>

                    )}

                  </td>

                  <td className="px-6 py-4">

                    <div className="flex gap-2">

                      <button
                        type="button"
                        onClick={() =>
                          onView?.(product)
                        }
                        className="
                          text-sm
                          font-medium
                          text-slate-600
                          hover:text-slate-900
                        "
                      >
                        Ver
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          onEdit?.(product)
                        }
                        className="
                          text-sm
                          font-medium
                          text-blue-600
                          hover:text-blue-700
                        "
                      >
                        Editar
                      </button>

                      <button
                        type="button"
                        onClick={()=>
                          onDelete?.(product)
                        }
                        className="
                          text-sm
                          font-medium
                          text-red-600
                          hover:text-red-700
                        "
                      >
                        Excluir
                      </button>

                      <select
                        value={product.etapa}
                        onChange={(event)=>
                          onUpdateStep(
                            product,
                            event.target.value as ProductStep
                          )
                        }
                        className="
                          rounded-lg
                          border
                          border-slate-300
                          bg-white
                          px-3
                          py-2
                          text-sm
                        "
                        >
                          <option value={ProductStep.ERP}>
                            ERP
                          </option>

                          <option value={ProductStep.DESCRIPTION}>
                            Descrição
                          </option>

                          <option value={ProductStep.IMAGES}>
                            Imagens
                          </option>

                          <option value={ProductStep.PRECODE}>
                            Precode
                          </option>

                          <option value={ProductStep.MARKETPLACE}>
                            Marketplace
                          </option>

                          <option value={ProductStep.FINISHED}>
                            Concluído
                          </option>
                        </select>

                    </div>

                  </td>

                </tr>
              );
            })}

          </tbody>

        </table>

      </div>

    </div>

  )

}
