export type PayloadBodyCreateCalendary = {
  year: number;
};

export type PayloadBodyUpdateByIdCalendaryDay = {
  norm_hours: string;
  hours_worked: string;
  hourly_rate: string;
};

export type PayloadBodyUpdateDaysMany = {
  year: string;
  month: string;
  start_day: string;
  end_day: string;
  norm_hours: string;
  hours_worked: string;
  hourly_rate: string;
};

export type PayloadBodyUpdateDaysManySalary = {
  year: string;
  month: string;
  salary: string;
};

export type PayloadBodyCreateCondition = {
  norm_hours: number | null;
  hourly_rate: number | null;
};
