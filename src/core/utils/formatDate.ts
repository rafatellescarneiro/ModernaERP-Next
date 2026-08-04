/**
 * ==========================================================
 * Utilitário: formatDate
 *
 * Responsável por formatar datas
 * no padrão brasileiro.
 * ==========================================================
 */

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('pt-BR').format(date);
}
