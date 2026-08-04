/**
 * ==========================================================
 * Provider para leitura de planilhas Excel.
 * ==========================================================
 */

import type { DatabaseProvider } from '../database/DatabaseProvider';

export class ExcelProvider implements DatabaseProvider {

  async conect(): Promise<void> {
    console.log("Excel conectado")
  }

  async disconnect(): Promise<void> {
    console.log("Excel desconectado")
  }

}

