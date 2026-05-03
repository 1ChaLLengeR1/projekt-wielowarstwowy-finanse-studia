export type CalculationsBody = {
  referrer: string;
  gross_sales: number;
  gross_purchase: number;
  provision: number;
  distinction: number;
};

export type Calculations = {
  id: string;
  income_tax: number;
  vat: number;
  inpost_parcel_locker: number;
  inpost_courier: number;
  inpost_cash_of_delivery_courier: number;
  dpd: number;
  allegro_matt: number;
  without_smart: number;
};

export type CalculationsUpdateBody = {
  id: string;
  income_tax: number;
  vat: number;
  inpost_parcel_locker: number;
  inpost_courier: number;
  inpost_cash_of_delivery_courier: number;
  dpd: number;
  allegro_matt: number;
  without_smart: number;
};
