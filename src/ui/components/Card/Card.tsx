/**
 * ==========================================================
 * Arquivo: Card.tsx
 * Componente base de cartão do sistema.
 * ==========================================================
 */

import type { ReactNode } from 'react';

interface CardProps {
    title?: string;
    children: ReactNode;
}

export function Card({ title, children }: CardProps) {
    return (
        <div className="rouded-2x1 bg-white p-6 shadow-sm border border-slate-200">
            {title && (
            <h3 className="mb-4 text-lg font-semibold text-slate-800">
                {title}
            </h3>
        )}
        {children}
        </div>
    );
}