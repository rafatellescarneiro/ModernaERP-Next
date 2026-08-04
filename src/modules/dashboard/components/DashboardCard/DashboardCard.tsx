/**
 * ==========================================================
 * Card de indicador do Dashboard.
 * ==========================================================
 */

import type { DashboardCardProps } from './DashboardCard.types';

export function DashboardCard({
  title,
  value,
  subtitle,
}: DashboardCardProps) {
  return(
    <div className="rouded-x1 border bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
     <h3 className="text-sm font-medium text-slate-500">
      {title}
     </h3>

    <p className="mt-3 text-3x1 font-bold text-slate-800">
      {value}
    </p>

    {subtitle && (
      <p className="mt-3 text-sm text-slate-400">
        {subtitle}
      </p>
    )}
    </div>
  );
}
