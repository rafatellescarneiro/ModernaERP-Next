/**
 * ==========================================================
 * Interface que qualquer banco de dados deverá implementar.
 * ==========================================================
 */

export interface DatabaseProvider {

  conect(): Promise<void>;

  disconnect(): Promise<void>;

}


