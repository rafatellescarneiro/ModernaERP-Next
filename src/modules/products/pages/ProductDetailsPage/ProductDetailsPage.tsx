import {
  useEffect,
  useState,
} from "react";

import type {
  Product,
} from "../../types";

import {
  MarketplaceStatus,
  ProductStepLabel,
} from "../../types";

import {
  MarketplaceStatusBadge,
} from "../../components";

import type {
  CentralMarketplace,
} from "../../types/CentralMarketplace";


interface ProductDetailsPageProps {
  product: Product;

  onBack: () => void;

  onEdit: (
    product: Product,
  ) => void;

  onAddMarketplace: (
    productId: string,
    marketplaceId: number,
  ) => Promise<Product>;

  onUpdateMarketplaceStatus: (
    productId: string,
    productMarketplaceId: number,
    status: MarketplaceStatus,
  ) => Promise<Product>;

  onDeleteMarketplace: (
    productId: string,
    productMarketplaceId: number,
  ) => Promise<Product>;

  marketplaces: CentralMarketplace[];

  onLoadMarketplaces: () => Promise<void>;
}


export function ProductDetailsPage({
  product,
  onBack,
  onEdit,
  onAddMarketplace,
  onUpdateMarketplaceStatus,
  onDeleteMarketplace,
  marketplaces,
  onLoadMarketplaces,
}: ProductDetailsPageProps) {

  const [
    marketplaceId,
    setMarketplaceId,
  ] = useState("");

  const [
    currentProduct,
    setCurrentProduct,
  ] = useState(product);


  useEffect(() => {

    void onLoadMarketplaces();

  }, [onLoadMarketplaces]);


  async function handleAddMarketplace() {

    if (!marketplaceId) {
      return;
    }

    const updatedProduct =
      await onAddMarketplace(
        currentProduct.id,
        Number(marketplaceId),
      );

    setCurrentProduct(
      updatedProduct,
    );

    setMarketplaceId("");
  }


  async function handleMarketplaceStatusChange(
    productMarketplaceId: number,
    status: MarketplaceStatus,
  ) {

    const updatedProduct =
      await onUpdateMarketplaceStatus(
        currentProduct.id,
        productMarketplaceId,
        status,
      );

    setCurrentProduct(
      updatedProduct,
    );
  }


  async function handleDeleteMarketplace(
    productMarketplaceId: number,
  ) {

    const confirmed =
      window.confirm(
        "Deseja realmente remover este marketplace do produto?",
      );

    if (!confirmed) {
      return;
    }

    const updatedProduct =
      await onDeleteMarketplace(
        currentProduct.id,
        productMarketplaceId,
      );

    setCurrentProduct(
      updatedProduct,
    );
  }


  return (
    <section className="space-y-6">

      <header className="flex items-start justify-between gap-4">

        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            {currentProduct.titulo}
          </h1>

          <p className="mt-1 text-slate-500">
            Detalhes do produto cadastrado.
          </p>
        </div>

        <button
          type="button"
          onClick={() =>
            onEdit(currentProduct)
          }
          className="
            rounded-lg
            bg-slate-900
            px-4
            py-2
            text-sm
            font-medium
            text-white
            transition
            hover:bg-slate-800
          "
        >
          Editar produto
        </button>

        <button
          type="button"
          onClick={onBack}
          className="
            rounded-lg
            border
            border-slate-300
            px-4
            py-2
            text-sm
            font-medium
            text-slate-700
            transition
            hover:bg-slate-50
          "
        >
          Voltar
        </button>

      </header>


      <div
        className="
          rounded-xl
          border
          border-slate-200
          bg-white
          p-6
          shadow-sm
        "
      >

        <div className="grid gap-6 md:grid-cols-2">

          <DetailItem
            label="Código"
            value={currentProduct.codigo}
          />

          <DetailItem
            label="SKU"
            value={currentProduct.sku}
          />

          <DetailItem
            label="Quantidade"
            value={String(currentProduct.quantidade)}
          />

          <DetailItem
            label="Etapa"
            value={
              ProductStepLabel[
                currentProduct.etapa
              ]
            }
          />

          <DetailItem
            label="Data de cadastro"
            value={
              currentProduct.dataCadastro
                .toLocaleDateString(
                  "pt-BR",
                )
            }
          />

          <DetailItem
            label="Previsão Marketplace"
            value={
              currentProduct.previsaoMarketplace
                ? currentProduct.previsaoMarketplace
                    .toLocaleDateString(
                      "pt-BR",
                    )
                : "Não informada"
            }
          />

        </div>


        <div className="mt-6 border-t border-slate-200 pt-6">

          <h2 className="text-sm font-medium text-slate-500">
            Descrição
          </h2>

          <p className="mt-2 whitespace-pre-line text-slate-800">
            {
              currentProduct.descricao ||
              "Sem descrição cadastrada."
            }
          </p>

        </div>


        <div className="mt-6 border-t border-slate-200 pt-6">

          <h2 className="text-lg font-semibold text-slate-900">
            Marketplaces
          </h2>

          {currentProduct.marketplaces.length === 0 ? (

            <p className="mt-2 text-sm text-slate-500">
              Nenhum marketplace cadastrado para este produto.
            </p>

          ) : (

            <div className="mt-4 grid gap-3 md:grid-cols-2">

              {currentProduct.marketplaces.map(
                (marketplace) => (

                  <div
                    key={marketplace.id}
                    className="
                      flex
                      flex-wrap
                      items-center
                      justify-between
                      gap-3
                      rounded-lg
                      border
                      border-slate-200
                      px-4
                      py-3
                    "
                  >

                    <div>

                      <p className="font-medium text-slate-900">
                        {marketplace.marketplace}
                      </p>

                      <MarketplaceStatusBadge
                        status={marketplace.status}
                      />

                    </div>


                    <div className="flex items-center gap-2">

                      <select
                        value={marketplace.status}
                        onChange={(event) =>
                          handleMarketplaceStatusChange(
                            marketplace.id,
                            event.target.value as MarketplaceStatus,
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
                            MarketplaceStatus.NOT_SENT
                          }
                        >
                          Não enviado
                        </option>

                        <option
                          value={
                            MarketplaceStatus.PROCESSING
                          }
                        >
                          Processando
                        </option>

                        <option
                          value={
                            MarketplaceStatus.SENT
                          }
                        >
                          Publicado
                        </option>

                        <option
                          value={
                            MarketplaceStatus.ERROR
                          }
                        >
                          Erro
                        </option>

                      </select>


                      <button
                        type="button"
                        onClick={() =>
                          handleDeleteMarketplace(
                            marketplace.id,
                          )
                        }
                        className="
                          rounded-lg
                          border
                          border-red-200
                          px-3
                          py-2
                          text-sm
                          font-medium
                          text-red-600
                          transition
                          hover:bg-red-50
                        "
                      >
                        Excluir
                      </button>

                    </div>

                  </div>
                ),
              )}

            </div>
          )}

        </div>


        <div className="mt-4 flex flex-col gap-3 sm:flex-row">

          <select
            value={marketplaceId}
            onChange={(event) =>
              setMarketplaceId(
                event.target.value,
              )
            }
            className="
              flex-1
              rounded-lg
              border
              border-slate-300
              bg-white
              px-3
              py-2
              text-sm
              outline-none
              transition
              focus:border-slate-500
            "
          >

            <option value="">
              Selecione um marketplace
            </option>

            {marketplaces
              .filter(
                (marketplace) =>
                  marketplace.ativo &&
                  !currentProduct.marketplaces.some(
                    (productMarketplace) =>
                      productMarketplace.marketplaceId ===
                      marketplace.id,
                  ),
              )
              .map(
                (marketplace) => (

                  <option
                    key={marketplace.id}
                    value={marketplace.id}
                  >
                    {marketplace.nome}
                  </option>

                ),
              )}

          </select>


          <button
            type="button"
            onClick={
              handleAddMarketplace
            }
            disabled={
              !marketplaceId
            }
            className="
              rounded-lg
              bg-slate-900
              px-4
              py-2
              text-sm
              font-medium
              text-white
              transition
              hover:bg-slate-800
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            Adicionar marketplace
          </button>

        </div>

      </div>

    </section>
  );
}


interface DetailItemProps {
  label: string;
  value: string;
}


function DetailItem({
  label,
  value,
}: DetailItemProps) {

  return (
    <div>

      <p className="text-sm font-medium text-slate-500">
        {label}
      </p>

      <p className="mt-1 text-base text-slate-900">
        {value}
      </p>

    </div>
  );
}