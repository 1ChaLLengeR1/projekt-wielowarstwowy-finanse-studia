export type ApiCalendaryStatistics = {
  year: number | null;
  total_hours_worked: number | null;
  total_earnings: number | null;
  working_days_count: number | null;
  total_norm_hours: number | null;
  hours_difference: number | null;
  total_holidays: number | null;
  total_days_in_year: number | null;
  average_hours_per_working_day: number | null;
  average_daily_earnings: number | null;
  work_efficiency_percentage: number | null;
};

export type ApiCollectionCalendary = {
  year: number | null;
  month: number | null;
  month_name: string | null;
  days: Array<OneCalendaryDay> | [];
  statistics: OneCalendaryStatistics | null;
};

export type OneCalendaryStatistics = {
  total_hours_worked: number;
  total_norm_hours: number;
  total_salary: number;
  weeks: Array<OneCalendaryWeek>;
};

export type OneCalendaryDay = {
  id: string;
  date: string;
  day_number: number;
  day_name: string;
  hours_worked: number;
  is_holiday: boolean;
  norm_hours: number;
  hourly_rate: number;
  daily_salary: number;
};

export type OneCalendaryWeek = {
  week_number: number;
  total_hours: number;
  total_norm_hours: number;
  hourly_rate: number;
  salary: number;
};
