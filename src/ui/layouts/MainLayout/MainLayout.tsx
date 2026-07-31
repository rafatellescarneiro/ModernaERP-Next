/**
 * ==========================================================
 * Arquivo: MainLayout.tsx
 * Layout principal do Moderna ERP.
 * ==========================================================
 */

import { NavLink, Outlet } from "react-router-dom";
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

