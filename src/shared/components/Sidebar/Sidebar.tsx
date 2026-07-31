/**
 * ==========================================================
 * Componente: Sidebar
 *
 * Menu lateral principal da aplicação.
 * ==========================================================
 */

import { NavigationItem } from '../Navigation/NavigationItem';

export function Sidebar(){
  return(
    <aside className="flex h-full w-64 flex-col border-r bg-white">
      <div className="border-b p-6">
        <h1 className="text-xl font-bold text-slate-800">
          Moderna ERP
        </h1>
      </div>

      <nav className="flex flex-1 flex-col gap-2 p-4">
        <NavigationItem label="Dashboard" to="/" />

        <NavigationItem
          label="Produtos"
          to="/produtos"
        />

        <NavigationItem
          label="Operações"
          to="/operacoes"
        />

        <NavigationItem
          label="Marketplaces"
          to="/marketplaces"
        />

        <NavigationItem
          label="Configuração"
          to="/configuracao"
        />
      </nav>
    </aside>
  );
}
