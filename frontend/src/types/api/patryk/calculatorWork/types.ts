export type ApiCalculatorKeys = {
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
export type ApiCalculations = {
  brutto: number;
  na_czysto: number;
  zysk_procentowy: number;
};
