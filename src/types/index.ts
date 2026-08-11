export type MenuItemT = {
  id: number;
  name: string;
  price: number;
};

export type OrderItemT = MenuItemT & {
  quantity: number;
};

export type DataStoreT = {
  business: {
    name: string;
    address: string;
    phone: string;
    taxId: string;
    logoUrl: string;
  };
  sale: {
    folio: string;
    cashier: string;
  };
  customer: {
    name: string;
  };
  footer: {
    thankYouMessage: string;
    returnPolicy: string;
  };
};
