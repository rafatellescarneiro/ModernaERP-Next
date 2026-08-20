/**
 * Tipos da tabela de produtos.
*/

import type {
  Product,
} from "../../types"

export interface ProductTableProps {

  products: Product[];

  onEdit?:(
    product: Product,

  ) => void;

  onView?:(
    product: Product,

  ) => void;

  onDelete?:(
    product:Product,

  ) => void;
}

