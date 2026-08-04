import { ButtonHTMLAttributes } from 'react';

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "danger";

    loading?: boolean;
  }
