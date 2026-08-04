export interface Product {

  id: string;

  codigo: string;

  sku: string;

  titulo: string;

  descricao: string;

  quantidade: number;

  dataCadastro: Date;

  previsaoMarketplace?: Date;

  etapa: ProductStep;

  status: ProductStatus;

}

export enum ProductStatus {

  CADASTRO = "CADASTRO",

  DESCRICAO = "DESCRICAO",

  IMAGENS = "IMAGENS",

  PROCODE = "PROCODE",

  CONFERENCIA = "CONFERENCIA",

  CONCLUIDO = "CONCLUIDO",

}

export enum ProductStep {
  ERP = "ERP",

  DESCRICAO = "DESCRICAO",

  IMAGENS = "IMAGENS",

  PROCODE = "PROCODE",

  CONFERENCIA = "CONFERENCIA",

  CONCLUIDO = "CONCLUIDO",

}
