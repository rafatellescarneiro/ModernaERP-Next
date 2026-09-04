/**
 * ==========================================================
 * Componente: ProductTable
 *
 * Tabela principal do módulo Produtos.
 * ==========================================================
 */

import type {
  Product,
} from "../../types";

import type {
  ProductTableProps,
} from "./ProductTable.types";

import {
  MarketplaceStatus,
  ProductStep,
  ProductStepLabel,
} from "../../types";


/**
 * Retorna um resumo dos marketplaces
 * cadastrados no produto.
 */
function getMarketplaceSummary(
  product: Product,
) {
  const total =
    product.marketplaces.length;

  const published =
    product.marketplaces.filter(
      marketplace =>
        marketplace.status ===
        MarketplaceStatus.SENT,
    ).length;

  const processing =
    product.marketplaces.filter(
      marketplace =>
        marketplace.status ===
        MarketplaceStatus.PROCESSING,
    ).length;

  const notSent =
    product.marketplaces.filter(
      marketplace =>
        marketplace.status ===
        MarketplaceStatus.NOT_SENT,
    ).length;

  const errors =
    product.marketplaces.filter(
      marketplace =>
        marketplace.status ===
        MarketplaceStatus.ERROR,
    ).length;

  return {
    total,
    published,
    processing,
    notSent,
    errors,
  };
}


export function ProductTable({
  products,
  onEdit,
  onView,
  onDelete,
  onUpdateStep,
}: ProductTableProps) {

  /**
   * Caso nenhuma busca encontre produtos,
   * exibimos uma mensagem no lugar da tabela.
   */
  if (products.length === 0) {
    return (
      <div
        className="
          rounded-xl
          border
          border-slate-200
          bg-white
          p-8
          text-center
          text-sm
          text-slate-500
        "
      >
        Nenhum produto encontrado.
      </div>
    );
  }


  return (
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

              <th
                className="
                  px-6
                  py-4
                  text-xs
                  font-semibold
                  uppercase
                  text-slate-500
                "
              >
                Código
              </th>

              <th
                className="
                  px-6
                  py-4
                  text-xs
                  font-semibold
                  uppercase
                  text-slate-500
                "
              >
                SKU
              </th>

              <th
                className="
                  px-6
                  py-4
                  text-xs
                  font-semibold
                  uppercase
                  text-slate-500
                "
              >
                Produto
              </th>

              <th
                className="
                  px-6
                  py-4
                  text-xs
                  font-semibold
                  uppercase
                  text-slate-500
                "
              >
                Quantidade
              </th>

              <th
                className="
                  px-6
                  py-4
                  text-xs
                  font-semibold
                  uppercase
                  text-slate-500
                "
              >
                Etapa
              </th>

              <th
                className="
                  px-6
                  py-4
                  text-xs
                  font-semibold
                  uppercase
                  text-slate-500
                "
              >
                Marketplaces
              </th>

              <th
                className="
                  px-6
                  py-4
                  text-xs
                  font-semibold
                  uppercase
                  text-slate-500
                "
              >
                Ações
              </th>

            </tr>

          </thead>


          <tbody className="divide-y">

            {products.map((product) => {

              /**
               * Calcula somente os números que
               * serão mostrados na tabela.
               *
               * Os marketplaces individuais ficam
               * disponíveis na tela "Ver produto".
               */
              const marketplaceSummary =
                getMarketplaceSummary(
                  product,
                );


              return (

                <tr
                  key={product.id}
                  className="
                    transition
                    hover:bg-slate-50
                  "
                >

                  {/* Código */}

                  <td
                    className="
                      px-6
                      py-4
                      text-sm
                      font-medium
                    "
                  >
                    {product.codigo}
                  </td>


                  {/* SKU */}

                  <td
                    className="
                      px-6
                      py-4
                      text-sm
                      text-slate-600
                    "
                  >
                    {product.sku}
                  </td>


                  {/* Produto */}

                  <td className="px-6 py-4">

                    <div className="font-medium">
                      {product.titulo}
                    </div>

                    <div
                      className="
                        text-xs
                        text-slate-500
                      "
                    >
                      {product.descricao}
                    </div>

                  </td>


                  {/* Quantidade */}

                  <td
                    className="
                      px-6
                      py-4
                      text-sm
                    "
                  >
                    {product.quantidade}
                  </td>


                  {/* Etapa */}

                  <td className="px-6 py-4">

                    <span className="text-sm">
                      {
                        ProductStepLabel[
                          product.etapa
                        ]
                      }
                    </span>

                  </td>


                  {/* Marketplaces */}

                  <td className="px-6 py-4">

                    {marketplaceSummary.total ===
                    0 ? (

                      <span
                        className="
                          text-sm
                          text-slate-400
                        "
                      >
                        Nenhum
                      </span>

                    ) : (

                      <div className="space-y-1">

                        <div
                          className="
                            text-sm
                            font-medium
                            text-slate-700
                          "
                        >
                          {
                            marketplaceSummary.total
                          }{" "}
                          {
                            marketplaceSummary.total ===
                            1
                              ? "marketplace"
                              : "marketplaces"
                          }
                        </div>

                        <div
                          className="
                            flex
                            flex-wrap
                            gap-x-2
                            gap-y-1
                            text-xs
                          "
                        >

                          {marketplaceSummary.published > 0 && (
                            <span className="text-slate-500">
                              {marketplaceSummary.published} publicados
                            </span>
                          )}

                          {marketplaceSummary.processing > 0 && (
                            <span className="text-slate-500">
                              {marketplaceSummary.processing} processando
                            </span>
                          )}

                          {marketplaceSummary.notSent > 0 && (
                            <span className="text-slate-500">
                              {marketplaceSummary.notSent} não enviados
                            </span>
                          )}

                          {marketplaceSummary.errors > 0 && (
                            <span
                              className="
                                font-medium
                                text-red-600
                              "
                            >
                              {marketplaceSummary.errors} com erro
                            </span>
                          )}

                        </div>

                      </div>

                    )}

                  </td>


                  {/* Ações */}

                  <td className="px-6 py-4">

                    <div
                      className="
                        flex
                        items-center
                        gap-2
                      "
                    >

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
                        onClick={() =>
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


                      {/* Alteração da etapa */}

                      <select
                        value={product.etapa}
                        onChange={(event) =>
                          onUpdateStep(
                            product,
                            event.target
                              .value as ProductStep,
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

                        <option
                          value={
                            ProductStep.ERP
                          }
                        >
                          ERP
                        </option>

                        <option
                          value={
                            ProductStep.DESCRIPTION
                          }
                        >
                          Descrição
                        </option>

                        <option
                          value={
                            ProductStep.IMAGES
                          }
                        >
                          Imagens
                        </option>

                        <option
                          value={
                            ProductStep.PRECODE
                          }
                        >
                          Precode
                        </option>

                        <option
                          value={
                            ProductStep.MARKETPLACE
                          }
                        >
                          Marketplace
                        </option>

                        <option
                          value={
                            ProductStep.FINISHED
                          }
                        >
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
  );
}