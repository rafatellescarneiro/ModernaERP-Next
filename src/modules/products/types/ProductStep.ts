/**
 * ==========================================================
 * Arquivo: ProductStep.ts
 *
 * Define as etapas possíveis do fluxo de cadastro
 * de um produto dentro do Moderna ERP.
 * ==========================================================
 */

export enum ProductStep {
  ERP = "ERP",
  DESCRIPTION = "DESCRIPTION",
  IMAGES = "IMAGES",
  PRECODE = "PRECODE",
  MARKETPLACE = "MARKETPLACE",
  FINISHED = "FINISHED",
}

export const ProductStepLabel: Record<
  ProductStep,
  string
> = {
  [ProductStep.ERP]: "ERP",
  [ProductStep.DESCRIPTION]: "Descrição",
  [ProductStep.IMAGES]: "Imagens",
  [ProductStep.PRECODE]: "Procode",
  [ProductStep.MARKETPLACE]: "Marketplace",
  [ProductStep.FINISHED]: "Concluído",
};
