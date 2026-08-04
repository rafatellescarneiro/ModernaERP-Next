/**
 * ==========================================================
 * Responsável pelo gerenciamento das rotas.
 * ==========================================================
 */

import{
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import { MainLayout } from "@/ui/layouts/MainLayout";

import { DashboardPage } from "@/modules/dashboard";

export function AppRouter(){
  return(
    <BrowserRouter>

      <Routes>

        <Route element={<MainLayout />}>

          <Route
            path="/"
            element={<DashboardPage />}
          />

        </Route>

      </Routes>

    </BrowserRouter>
  );
} 
