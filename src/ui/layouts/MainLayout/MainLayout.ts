/**
 * ==========================================================
 * Arquivo: MainLayout.ts
 * Módulo: UI
 * ==========================================================
 *
 * Layout principal do Moderna ERP.
 *
 * Todas as páginas serão exibidas dentro deste layout.
 * ==========================================================
 */

import { DashboardPage } from "../../pages/Dashboard/DashboardPage";

export class MainLayout {

  /**
   * Retorna o HTML principal da aplicação.
   */
  public static render(): string {

    return `

    <div class="app">
      <header>
        <h1>Moderna ERP</h1>
        <span>Versão 0.1.0</span>
      </header>

      <main>
        ${DashboardPage.render()}
      </main>

    </div>
    `;
    }
  }
