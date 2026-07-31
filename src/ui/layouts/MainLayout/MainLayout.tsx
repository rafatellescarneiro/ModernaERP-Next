/**
 * ==========================================================
 * Arquivo: MainLayout.tsx
 * Layout principal do Moderna ERP.
 * ==========================================================
 */

import { NavLink, Outlet } from "react-router";
import {
    LayoutDashboard,
    Package,
    ClipboardList,
    Settings,
} from "lucide-react";

const menuItems = [
    {
        label: "Dashboard",
        path: "/",
        icon: LayoutDashboard,
    },
    {
        label: "Produtos",
        path: "/produtos",
        icon: Package,
    },
    {
        label: "Operações",
        path: "/operacoes",
        icon: ClipboardList,
    },
    {
        label: "Configurações",
        path: "/configuracao",
        icon: Settings,
    },
];

export function MainLayout() {
  return (
    <div className="min-h-screen bg-slate-100">
      {/* Header */}
      <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-800">Moderna ERP</h1>
          <p className="text-xs text-slate-500">v0.1.0</p>
        </div>

        <div className="text-sm text-slate-600">Rafael Carneiro</div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-slate-900 text-slate-200 min-h-[calc(100vh-4rem)] p-4">
          <nav className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === "/"}
                  className={({ isActive }) =>
                    [
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                      isActive
                        ? "bg-slate-800 text-white"
                        : "text-slate-300 hover:bg-slate-800 hover:text-white",
                    ].join(" ")
                  }
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </NavLink>
              );
            })}
          </nav>
        </aside>

        {/* Conteúdo */}
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>

      {/* Footer */}
      <footer className="h-10 bg-white border-t border-slate-200 px-6 flex items-center justify-between text-xs text-slate-500">
        <span>Google Sheets • Não conectado</span>
        <span>Moderna ERP v0.1.0</span>
      </footer>
    </div>
  );
}
