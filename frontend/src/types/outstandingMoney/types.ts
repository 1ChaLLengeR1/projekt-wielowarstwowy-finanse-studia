export type CreateListBody = {
  name: string;
  array_object: Array<ItemObjecty>;
};

export type ItemObjecty = {
  amount: number;
  name: string;
};

export type AddItemBody = {
  id_name: string;
  amount: number;
  name: string;
};

export type EditNameListBody = {
  id: string;
  name: string;
};

export type EditItemBody = {
  id: string;
  amount: number;
  name: string;
};
