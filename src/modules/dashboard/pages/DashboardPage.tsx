/**
 * ==========================================================
 * Módulo: Dashboard
 *
 * Página inicial do sistema.
 * ==========================================================
 */

import { DashboardCard } from "../components/DashboardCard";
import { dashboardData } from "../data/dashboard.mock";
import { WorkflowCard } from "../components/WorkflowCard/WorkflowCard";
import { workflowData } from "../data/workflow.mock";

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

      <section>
        <h2 className="mb-6 text-x1 font-semibold">

          Fluxo Operacional

        </h2>

        <div className="grid gap-5 lg:grid-cols-5">
          {

            workflowData.map((item)=>(

              <WorkflowCard

                key={item.etapa}

                title={item.etapa}

                value={item.quantidade}

                color={item.cor}
              />
            ))

          }
        </div>

      </section>

    </section>
  );
}
