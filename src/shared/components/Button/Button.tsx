/**
 * ==========================================================
 * Botão padrão do Moderna ERP
 * ==========================================================
 */

import clsx from "clsx";

import type { ButtonProps } from "./Button.types";

export function Button({
  children,
  variant = "primary",
  loading = false,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(
        "rounded-lg px-4 py-2 font-medium transition-all",
        {
          "bg-blue-600 text-white hover:bg-blue-700":
            variant === "danger"
        },
        className
      )}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading ? "Carregando..." : children}
    </button>
  )
}
