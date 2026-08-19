/**
 * Tipos da barra de ferramentas de produtos.
*/

export interface ProductToolbarProps{

  search: string;

  onSearchChange: (

    value: string,

  ) => void;

  onCreate: () => void;
}

