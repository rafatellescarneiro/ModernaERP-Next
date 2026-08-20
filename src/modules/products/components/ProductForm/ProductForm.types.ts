/**
 * ==========================================================
 * Arquivo: ProductForm.types.ts
 *
 * Tipos utilizados pelo formulário de cadastro de produtos.
 * ==========================================================
 */

/**
 * Dados preenchidos pelo usuário no formulário.
 *
 * Estes são somente os dados necessários para cadastrar
 * um novo produto.
 *
 * Campos como id, dataCadastro, etapa e marketplaces
 * serão controlados pela aplicação.
 */
export interface ProductFormData {

  /**
   * Código interno do produto.
   */
  codigo: string;

  /**
   * SKU do produto.
   */
  sku: string;

  /**
   * Título comercial do produto.
   */
  titulo: string;

  /**
   * Descrição comercial do produto.
   */
  descricao: string;

  /**
   * Quantidade disponível.
   */
  quantidade: number;

}

/**
 * Propriedades do componente ProductForm.
 */
export interface ProductFormProps {

  initialData?: ProductFormData;

  /**
   * Executado quando o formulário é enviado.
   */
  onSubmit: (
    data: ProductFormData,
  ) => void | Promise<void>;

  /**
   * Executado quando o usuário cancela
   * o preenchimento.
   */
  onCancel?: () => void;

  /**
   * Indica se o formulário está processando
   * alguma operação.
   */
  loading?: boolean;

}
