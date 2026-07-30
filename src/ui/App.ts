/**
 * ==========================================================
 * Arquivo: App.ts
 * Módulo: UI
 * ==========================================================
 *
 * Responsável por renderizar a interface principal.
 *
 * Toda a interface será construída a partir deste ponto.
 * ==========================================================
 */

import "./styles/main.css";
import { MainLayout } from "./layouts/MainLayout";

export class App {

  /**
   * Renderiza a aplicação.
   */
  public static render(): void {
    document.querySelector("#app")!.innerHTML =
      MainLayout.render();
  }
  }
