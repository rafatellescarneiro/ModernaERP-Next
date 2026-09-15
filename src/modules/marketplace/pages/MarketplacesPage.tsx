import {
  useMarketplaces,
} from "../hooks/useMarketplaces"

import {
  useState,
} from 'react';

export function MarketplacesPage() {

  const {
    marketplaces,
    loading,
    error,
    create,
    update,
    updateActive,
  } = useMarketplaces();

  const [
    nome,
    setNome,
  ] = useState("");

  const [
    creating,
    setCreating,
  ] = useState(false);

  const [
    editingId,
    setEditingId,
  ] = useState<number | null>(null);

  const [
    editingName,
    setEditingName,
  ] = useState("");

  const [
    saving,
    setSaving,
  ] = useState(false);

  const [
    updatingActiveId,
    setUpdatingActiveId,
  ] = useState<number | null>(
    null,
  );


  async function handleCreate() {
    if(!nome.trim()){
     return;
    }
      try {

        setCreating(
          true,
        );

        await create(
          nome,
        );

        setNome("");

      } catch {

        // O erro já é tratado
        // pelo useMarketplaces.

      } finally {

        setCreating(
          false
        );

      }
  }

  function handleStartEdit(
    id: number,
    nome: string,
  ){

    setEditingId(
      id,
    );

    setEditingName(
      nome,
    );
  }

  function handleCancelEdit(){

    setEditingId(
      null,
    );

    setEditingName("");

  }

  async function handleSaveEdit() {

    if (
      editingId === null ||
      !editingName.trim()
    ) {
      return;
    }

    try {

      setSaving(
        true,
      );

      await update(
        editingId,
        editingName,
      );

      handleCancelEdit();

    } catch {

      handleCancelEdit();

    } finally {

      setSaving(
        false,
      );

    }
  }

  async function handleToggleActive(
    id: number,
    ativo: boolean,
  ) {

    try {

      setUpdatingActiveId(
        id,
      );

      await updateActive(
        id,
        !ativo,
      );

    } catch {

      // O hook já trata o erro.

    } finally {

      setUpdatingActiveId(
        null,
      );

    }
  }

 return (
    <section className="space-y-6">

      <header>
        <h1 className="text-3xl font-bold text-slate-900">
          Marketplaces
        </h1>

        <p className="mt-1 text-slate-500">
          Gerenciamento do catálogo de marketplaces.
        </p>
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

        <h2 className="text-lg font-semibold text-slate-900">
          Novo marketplace
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Adicione um marketplace ao catálogo central.
        </p>


        <div
          className="
            mt-4
            flex
            gap-3
          "
        >

          <input
            type="text"
            value={nome}
            onChange={(event) =>
              setNome(
                event.target.value,
              )
            }
            placeholder="Ex.: Shopee"
            disabled={creating}
            className="
              flex-1
              rounded-lg
              border
              border-slate-300
              px-3
              py-2
              outline-none
              focus:border-slate-500
              disabled:bg-slate-100
            "
          />

          <button
            type="button"
            onClick={() =>
              void handleCreate()
            }
            disabled={
              creating ||
              !nome.trim()
            }
            className="
              rounded-lg
              bg-slate-900
              px-4
              py-2
              font-medium
              text-white
              transition
              hover:bg-slate-700
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            {
              creating
                ? "Cadastrando..."
                : "Cadastrar"
            }
          </button>

        </div>

      </div>


      {loading && (
        <div className="rounded-xl border bg-white p-6 text-slate-500">
          Carregando marketplaces...
        </div>
      )}


      {!loading && error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-red-600">
          {error}
        </div>
      )}


      {!loading && (
        <div className="rounded-xl border border-slate-200 bg-white shadow-sm">

          {marketplaces.length === 0 ? (

            <p className="p-6 text-slate-500">
              Nenhum marketplace cadastrado.
            </p>

          ) : (

            <div className="divide-y divide-slate-200">

              {marketplaces.map(
                (marketplace) => (

                  <div
                    key={marketplace.id}
                    className="
                      flex
                      items-center
                      justify-between
                      gap-4
                      px-6
                      py-4
                    "
                  >

                  <div className="flex-1">

                      {editingId === marketplace.id ? (

                        <div className="flex items-center gap-2">

                          <input
                            type="text"
                            value={editingName}
                            onChange={(event) =>
                              setEditingName(
                                event.target.value,
                              )
                            }
                            disabled={saving}
                            className="
                              w-full
                              max-w-md
                              rounded-lg
                              border
                              border-slate-300
                              px-3
                              py-2
                              outline-none
                              focus:border-slate-500
                            "
                          />

                          <button
                            type="button"
                            onClick={() =>
                              void handleSaveEdit()
                            }
                            disabled={
                              saving ||
                              !editingName.trim()
                            }
                            className="
                              rounded-lg
                              bg-slate-900
                              px-3
                              py-2
                              text-sm
                              font-medium
                              text-white
                              disabled:opacity-50
                            "
                          >
                            Salvar
                          </button>

                          <button
                            type="button"
                            onClick={
                              handleCancelEdit
                            }
                            disabled={saving}
                            className="
                              rounded-lg
                              border
                              border-slate-300
                              px-3
                              py-2
                              text-sm
                              font-medium
                              text-slate-600
                            "
                          >
                            Cancelar
                          </button>

                        </div>

                      ) : (

                        <div>

                          <p className="font-medium text-slate-900">
                            {marketplace.nome}
                          </p>

                          <p className="mt-1 text-sm text-slate-500">
                            ID: {marketplace.id}
                          </p>

                        </div>

                      )}

                    </div>


                    <div className="flex items-center gap-3">

                      <span
                        className={`
                          rounded-full
                          px-3
                          py-1
                          text-xs
                          font-medium
                          ${
                            marketplace.ativo
                              ? "bg-emerald-100 text-emerald-700"
                              : "bg-slate-100 text-slate-500"
                          }
                        `}
                      >
                        {
                          marketplace.ativo
                            ? "Ativo"
                            : "Inativo"
                        }
                      </span>

                      <button
                        type="button"
                        onClick={() =>
                          void handleToggleActive(
                            marketplace.id,
                            marketplace.ativo,
                          )
                        }
                        disabled={
                          updatingActiveId ===
                          marketplace.id
                        }
                        className={`
                          rounded-lg
                          border
                          px-3
                          py-2
                          text-sm
                          font-medium
                          transition
                          disabled:cursor-not-allowed
                          disabled:opacity-50
                          ${
                            marketplace.ativo
                              ? `
                                border-red-200
                                text-red-600
                                hover:bg-red-50
                              `
                              : `
                                border-emerald-200
                                text-emerald-700
                                hover:bg-emerald-50
                              `
                          }
                        `}
                      >
                        {
                          updatingActiveId ===
                          marketplace.id
                            ? "Salvando..."
                            : marketplace.ativo
                              ? "Desativar"
                              : "Ativar"
                        }
                      </button>

                      {editingId !== marketplace.id && (

                        <button
                          type="button"
                          onClick={() =>
                            handleStartEdit(
                              marketplace.id,
                              marketplace.nome,
                            )
                          }
                          className="
                            rounded-lg
                            border
                            border-slate-300
                            px-3
                            py-2
                            text-sm
                            font-medium
                            text-slate-600
                            hover:bg-slate-50
                          "
                        >
                          Editar
                        </button>

                      )}

                    </div>

                  </div>

                ),
              )}

            </div>
          )}

        </div>
      )}

    </section>
  );
}

