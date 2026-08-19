/**
 * ==========================================================
 * Arquivo: MockProductProvider.ts
 *
 * Provider utilizado durante o desenvolvimento.
 * ==========================================================
*/

import type { ProductProvider } from '../providers/ProductProvider';
import type { Product } from '../types/Product';
import { productsMock } from '../data/products.mock';

export class MockProductProvider
  implements ProductProvider {

  private products: Product[] =[
    ...productsMock,
  ];

  async findAll(): Promise<Product[]> {

    return [
      ...this.products,
    ];

  }

  async save(
    product: Product,

  ): Promise<Product>{
    this.products.push(product);

    return product;
  }

}
