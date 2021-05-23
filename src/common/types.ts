export type Severity = 'critical' | 'medium' | 'low';
export type ProjectSummary = {
  project_name: string;
  task_status: string;
  task_id: string;
  last_updated: number;
  task_added: number;
};
