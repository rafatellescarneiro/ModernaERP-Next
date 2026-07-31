/**
 * ==========================================================
 * Arquivo: App.tsx
 * Projeto: Moderna ERP
 * 
 * Responsabilidade:
 * Componente raiz da aplicação
 * Toda a interface é carregada a partir daqui.
 * ==========================================================
 */

import { AppProviders } from "./providers/AppProviders"
import { AppRouter } from "./router/AppRouter"

export function App(){
    return (
        <AppProviders>
            <AppRouter />
        </AppProviders>
    );
}

