import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';


import type {
  Marketplace,
} from '../types/Marketplace';

import {
  createMarketplaceService,
} from "../../../app/dependencies/marketplaces";

export function useMarketplaces(){

  const service = useMemo(
    () => createMarketplaceService(),
    [],
  );

  const [
    marketplaces,
    setMarketplaces,
  ] = useState<Marketplace[]>([]);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    error,
    setError,
  ] = useState<string | null>(
    null,
  );

  const load =
    useCallback(
      async (): Promise<void> =>{

        try {

          setLoading(true);
          setError(null);

          const result =
            await service.getAll();

          setMarketplaces(
            result,
          );

        } catch (error){

          setError(
            error instanceof Error
              ? error.message
              : "Não foi possível carregar os marketplaces."
          );

        } finally {

          setLoading(false);

        }

      },
      [service],
    );

  useEffect(()=> {

    let cancelled = false;

    async function initialize() {
      try {

        const result =
          await service.getAll();

        if (cancelled) {
          return;
        }

        setMarketplaces(
          result,
        );

        setError(
          null,
        );

      } catch(error){

        if(cancelled){
          return;
        }

        const message =
          error instanceof Error
            ? error.message
            : "Não foi possível carregar os marketplaces.";

        setError(
          message,
        );

      } finally {

        if(!cancelled){
          setLoading(
            false,
          );

        }

      }

    }

    void initialize();

    return () => {
      cancelled = true;
    };

  }, [service]);

  const create =
    useCallback(
      async(
        nome: string,
      ): Promise<Marketplace> => {

        try {

          setError(
            null,
          );

          const marketplace =
          await service.create(
            nome,
          );

          setMarketplaces(
            (current) => [
              ...current,
              marketplace,
            ],
          );

          return marketplace;

      }catch (error) {

        const message=
          error instanceof Error
            ? error.message
            : "Não foi possível cadastrar o marketplace.";

        setError(
          message,
        );

        throw new Error(
          message,
          {
            cause: error,
          },
        );

      }

    },
    [service],
    );

  const update =
  useCallback(
    async (
      id: number,
      nome: string,
    ): Promise<Marketplace> => {

      try {

        setError(
          null,
        );

        const marketplace =
          await service.update(
            id,
            nome,
          );

        setMarketplaces(
          (current) =>
            current.map(
              (item) =>
                item.id === marketplace.id
                  ? marketplace
                  : item,
            ),
        );

        return marketplace;

      } catch (error) {

        const message =
          error instanceof Error
            ? error.message
            : "Não foi possível atualizar o marketplace.";

        setError(
          message,
        );

        throw new Error(
          message,
          {
            cause: error,
          },
        );

      }

    },
    [service],
  );

  const updateActive =
  useCallback(
    async (
      id: number,
      ativo: boolean,
    ): Promise<Marketplace> => {

      try {

        setError(
          null,
        );

        const marketplace =
          await service.updateActive(
            id,
            ativo,
          );

        setMarketplaces(
          (current) =>
            current.map(
              (item) =>
                item.id === marketplace.id
                  ? marketplace
                  : item,
            ),
        );

        return marketplace;

      } catch (error) {

        const message =
          error instanceof Error
            ? error.message
            : "Não foi possível alterar o status do marketplace.";

        setError(
          message,
        );

        throw new Error(
          message,
          {
            cause: error,
          },
        );

      }

    },
    [service],
  );

  return {
    marketplaces,
    loading,
    error,
    reload: load,
    create,
    update,
    updateActive
  };

}
