/**
 * ==========================================================
 * Arquivo: App.tsx
 *
 * Componente principal da aplicação.
 * ==========================================================
 */

import {
  Navigate,
  NavLink,
  Route,
  Routes,
} from "react-router-dom";

import {
  ProductsPage,
} from "./modules/products/pages/ProductsPage";

import {
  MarketplacesPage,
} from "./modules/marketplace/pages/MarketplacesPage";


function App() {

  return (
    <main className="min-h-screen bg-slate-50">

      <nav
        className="
          border-b
          border-slate-200
          bg-white
        "
      >

        <div
          className="
            mx-auto
            flex
            max-w-7xl
            items-center
            gap-2
            px-8
            py-4
          "
        >

          <NavLink
            to="/products"
            className={({ isActive }) => `
              rounded-lg
              px-4
              py-2
              text-sm
              font-medium
              transition
              ${
                isActive
                  ? "bg-slate-900 text-white"
                  : "text-slate-600 hover:bg-slate-100"
              }
            `}
          >
            Produtos
          </NavLink>


          <NavLink
            to="/marketplaces"
            className={({ isActive }) => `
              rounded-lg
              px-4
              py-2
              text-sm
              font-medium
              transition
              ${
                isActive
                  ? "bg-slate-900 text-white"
                  : "text-slate-600 hover:bg-slate-100"
              }
            `}
          >
            Marketplaces
          </NavLink>

        </div>

      </nav>


      <div
        className="
          mx-auto
          max-w-7xl
          p-8
        "
      >

        <Routes>

          <Route
            path="/products"
            element={
              <ProductsPage />
            }
          />

          <Route
            path="/marketplaces"
            element={
              <MarketplacesPage />
            }
          />

          <Route
            path="/"
            element={
              <Navigate
                to="/products"
                replace
              />
            }
          />

          <Route
            path="*"
            element={
              <Navigate
                to="/products"
                replace
              />
            }
          />

        </Routes>

      </div>

    </main>
  );
}


export default App;
