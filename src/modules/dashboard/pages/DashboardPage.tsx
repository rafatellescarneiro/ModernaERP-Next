/**
 * ==========================================================
 * Módulo: Dashboard
 *
 * Página inicial do sistema.
 * ==========================================================
 */

import { DashboardCard } from "../components/DashboardCard";
import { dashboardData } from "../data/dashboard.mock";

export function DashboardPage(){
  return(
    <section className="space-y-6">

      <header>
        <h1 className="text-3xl font-bold">
          Dashboard
        </h1>

        <p className="text-slate-500">
          Visão geral do Moderna ERP
        </p>
      </header>

      <section className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">

        <DashboardCard
          title="Produtos"
          value={dashboardData.totalProdutos}
        />

        <DashboardCard
          title="Pendentes"
          value={dashboardData.pendentes}
        />

        <DashboardCard
          title="Marketplaces"
          value={dashboardData.marketplaces}
        />

        <DashboardCard
          title="Concluídos"
          value={dashboardData.concluidos}
        />

      </section>

    </section>
  );
}
