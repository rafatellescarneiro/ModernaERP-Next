/**
 * ==========================================================
 * Card utilizado no fluxo operacional.
 * ==========================================================
 */

import type { WorkflowCardProps } from './WorkflowCard.types';

export function WorkflowCard({
  title,
  value,
  color,
}: WorkflowCardProps) {
  return(
    <div
      className="rouded-x1 border bg-white p-5 shadow-sm"
    >
      <div
        className="mb-4 h-2 rounded-full"
        style={{ backgroundColor: color }}
      />

      <h3 className="text-sm text-slate-500">

        {title}

      </h3>

      <p className="mt-3 text-3x1 font bold">

        {value}

      </p>

    </div>
  );
  }
