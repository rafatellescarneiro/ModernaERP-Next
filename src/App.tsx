/**
 * ==========================================================
 * Arquivo: App.tsx
 *
 * Componente principal da aplicação.
 * ==========================================================
*/

import { ProductsPage } from "./modules/products/pages/ProductsPage";

function App() {
  return (
    <main className="min-h-screen bg-slate-50 p-8">
      <ProductsPage />
    </main>
  );
}

export default App;
