/**
 * ==========================================================
 * Componente: NavigationItem
 *
 * Responsabilidade:
 * Exibir um item do menu lateral.
 * ==========================================================
 */

import { NavLink } from "react-router-dom"

interface NavigationItemProps {
  label: string;
  to: string;
}

export function NavigationItem({
  label,
  to,
}: NavigationItemProps){
  return(
    <NavLink
      to={to}
      className={({ isActive }) =>
        `

          flex
          items-center
          rounded-lg
          px-3
          py-2
          transition-colors
          ${
            isActive
              ? "bg-blue-600 text-white"
              : "text-slate-600 hover:bg-slate-100"
          }
        `
      }
      >
        {label}
      </NavLink>
  );
}
