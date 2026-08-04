/**
 * ==========================================================
 * Serviço do Dashboard
 * ==========================================================
 */

import { DashboardRepository } from "../repositories/DashboardRepository";

export class DashboardService{

  private repository = new DashboardRepository();

  getSumary(){
    return this.repository.getSumary();
  }

  getWorkflow(){
    return this.repository.getWorkflow();
  }
}


