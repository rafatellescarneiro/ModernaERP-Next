/**
 * Tipos da tabela de produtos.
*/

import type {
  Product,
} from "../../types"

import {
  ProductStep,
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

  onUpdateStep:(
    product: Product,
    step: ProductStep,
  )=> void | Promise<void>;
}

