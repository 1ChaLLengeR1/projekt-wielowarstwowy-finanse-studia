export interface OneTask {
  id: string;
  description: string;
  time: number;
  active: boolean;
  created_at: string;
  updated_at: string;
}

export interface StatisticsTask {
  total_tasks: number;
  total_time: number;
  average_per_week: number;
  average_time_per_week: number;
  tasks_per_day: Record<string, number>;
}

export type CollectionTasks = Array<OneTask>;
