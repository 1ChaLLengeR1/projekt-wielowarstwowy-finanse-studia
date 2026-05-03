export type ApiOutStandingMoneyCollection = Array<OutStandingMoneyOne>;

export type OutStandingMoneyOne = {
  id_name: string;
  name_overdue: string;
  array_items: Array<ArrayItem>;
  full_price: number;
};

export type ArrayItem = {
  id: string;
  amount: number;
  name: string;
  date: string;
};

export type ApiOutStandingMoneyCreateList = {
  names_overdue: {
    id: string;
    name: string;
  };
  new_outstanding_money: Array<NewOutStandingMoneyItem>;
};

export type NewOutStandingMoneyItem = {
  amount: number;
  name: string;
  data: string;
  id_name: string;
};

export type ApiAddItem = {
  id: string;
  amount: number;
  name: string;
  data: string;
  id_name: string;
};

export type ApiEditNameList = {
  id: string;
  name: string;
};

export type ApiEditItem = {
  id: string;
  amount: number;
  name: string;
  data: string;
  id_name: string;
};

export type ApiDeleteList = {
  names_overdue: {
    id: string;
    name: string;
  };
  new_outstanding_money: Array<NewOutStandingMoneyItem>;
};

export type ApiDeleteItem = {
  id: string;
  amount: number;
  name: string;
  data: string;
  id_name: string;
};
