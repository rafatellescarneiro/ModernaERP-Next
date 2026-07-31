/**
 * ==========================================================
 * Arquivo: DashboardPage.tsx
 * Página inicial do Moderna ERP.
 * ==========================================================
 */

import { Card } from "../../components/Card/Card";

export function DashboardPage(){
    return(
      <div className="space-y-6">
        <div>
            <h1 className="text-3xl font-bold text-slate-800">Dashboard</h1>
            <p className="text-slate-600">
            Visão geral da operação.
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card title="Produtos cadastrados">
            <p className="text-3xl font-bold text-slate-900">154</p>
            </Card>

            <Card title="Pendentes">
            <p className="text-3xl font-bold text-orange-600">12</p>
            </Card>

            <Card title="Concluídos">
            <p className="text-3xl font-bold text-green-600">142</p>
            </Card>
        </div>

        <Card title="Status do Sistema">
            <ul className="space-y-2 text-slate-700">
            <li>🟢 Aplicação iniciada</li>
            <li>🟢 Tailwind funcionando</li>
            <li>🟡 Banco não conectado</li>
            <li>🟡 Nenhum usuário autenticado</li>
            </ul>
        </Card>
      </div>


    );
}
