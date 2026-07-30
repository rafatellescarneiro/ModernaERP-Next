/**
 * ============================================================
 * Arquivo: app.ts
 * Módulo: App
 * ============================================================
 *
 * Classe responsável pelo ciclo de vida da aplicação.
 *
 * Ela apenas inicia os módulos principais.
 *
 * Não contém regras de negócio.
 * ============================================================
 */


import { App } from '../ui/App';

export const app = {

  start(): void{
    App.render();
  }

};
