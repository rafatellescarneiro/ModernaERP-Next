/**
 * ==========================================================
 * Layout principal do sistema.
 *
 * Toda tela do ERP será exibida dentro
 * deste layout.
 * ==========================================================
 */

import { Outlet } from "react-router-dom";

import { Header } from "@/shared/components/Header/Header";
import { Sidebar } from "@/shared/components/Sidebar/Sidebar";
import { Footer } from "@/shared/components/Footer/Footer";

export function MainLayout() {
  return (
    <div className="flex h-screen">

      <Sidebar />

      <div className="flex flex-col">
        <Header />

        <main className="flex-1 overflow-auto bg-slate-50 p-8">
          <Outlet />
        </main>

        <Footer />

      </div>
    </div>
  );
}
