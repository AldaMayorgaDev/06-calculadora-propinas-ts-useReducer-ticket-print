export type MenuItemT = {
  id: number;
  name: string;
  price: number;
};

export type OrderItemT = MenuItemT & {
  quantity: number;
};
