/**
 * ==========================================================
 * Repository do Dashboard
 *
 * Responsável por fornecer os dados
 * necessários ao Dashboard.
 * ==========================================================
 */

import { dashboardData } from "../data/dashboard.mock";
import { workflowData } from "../data/workflow.mock";

export class DashboardRepository{
  getSumary(){
    return dashboardData;
  }

  getWorkflow(){
    return workflowData;
  }

}
