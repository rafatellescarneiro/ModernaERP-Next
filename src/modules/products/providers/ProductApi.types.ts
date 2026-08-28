export interface ProductApiResponse{

  id: string;

  codigo: string;

  sku: string;

  titulo: string;

  descricao: string;

  quantidade: number;

  dataCadastro: string;

  previsaoMarketplace: string | null;

  etapa: string;
}
