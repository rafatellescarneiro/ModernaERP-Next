/**
 * ==========================================================
 * Arquivo: DashboardPage.ts
 * Página inicial da aplicação.
 *
 * Esta tela será expandida durante o desenvolvimento.
 * ==========================================================
 */

export class DashboardPage {

  /**
   * ==========================================================
   * Arquivo: DashboardPage.ts
   * Página inicial da aplicação.
   *
   * Esta tela será expandida durante o desenvolvimento.
   * ==========================================================
   */
  public static render(): string {
    return `
      <section>

        <h2>Bem-vindo ao Moderna ERP</h2>

        <p>
          O sistema foi iniciado com sucesso.
        </p>

        <hr>

        <h3>Status</h3>

        <ul>

          <li>🟢 Aplicação iniciada</li>

          <li>🟢 Interface carregada</li>

          <li>🟡 Banco não conectado</li>

          <li>🟡 Nenhum módulo carregado</li>

        </ul>

      </section>
    `;
  }


}
