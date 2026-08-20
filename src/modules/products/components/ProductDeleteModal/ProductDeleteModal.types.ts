import type {
  Product,
} from "../../types"

export interface ProductDeleteModalProps {
  product: Product;

  loading?: boolean;

  onCancel: () => void;

  onConfirm: () => void | Promise<void>;

}


