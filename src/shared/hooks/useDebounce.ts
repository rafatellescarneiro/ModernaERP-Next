/**
 * ==========================================================
 * Arquivo: useDebounce.ts
 *
 * Hook genérico para atrasar a atualização de um valor.
 *
 * É utilizado para evitar chamadas excessivas enquanto
 * o usuário está digitando em campos de pesquisa.
 * ==========================================================
 */

import {
  useEffect,
  useState,

} from "react";

/**
 * Retorna o valor informado após o período de espera.
 *
 * @param value Valor que será controlado.
 * @param delay Tempo de espera em milissegundos.
 */

export function useDebounce<T>(
  value: T,
  delay: number,
): T{

  /**
   * Valor que será disponibilizado após o debounce.
   */
  const [debouncedValue, setDebouncedValue] =
    useState<T>(value);

  useEffect(()=>{

    /**
     * Aguarda o período definido antes de atualizar
     * o valor.
     */

    const timer =
      window.setTimeout(()=>{

        setDebouncedValue(value);


      }, delay);

    /**
     * Cancela o timer anterior quando o valor muda
     * antes do tempo terminar.
     */
    return ()=>{

      window.clearTimeout(timer);

    };

  }, [value, delay]);

  return debouncedValue;

}
