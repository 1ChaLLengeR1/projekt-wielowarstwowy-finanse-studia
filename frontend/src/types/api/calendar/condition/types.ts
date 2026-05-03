export type ApiCollectionCalendaryCondition = Array<OneCalendaryCondition>;

export type OneCalendaryCondition = {
  id: string;
  start_date: string;
  norm_hours: number;
  hourly_rate: number;
  created_at: string;
  updated_at: string;
};
