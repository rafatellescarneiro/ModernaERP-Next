/**
 * ============================================================
 * Arquivo: bootstrap.ts
 * Módulo: App
 * ============================================================
 *
 * Responsável por inicializar a aplicação.
 *
 * Futuramente também carregará:
 *
 * - Configurações
 * - Banco de dados
 * - Cache
 * - Usuário
 * - Plugins
 *
 * ============================================================
 */

import { app } from "./app";

export function bootstrap() {
  app.start();

}
