export interface Product {

  id: string;

  codigo: string;

  sku: string;

  descricao: string;

  quantidade: number;

  dataCadastro: Date;

  previsaoMarketplace?: Date;

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
