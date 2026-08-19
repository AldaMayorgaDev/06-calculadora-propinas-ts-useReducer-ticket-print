import type {MenuItemT, OrderItemT} from "../types";

export type OrderActionsT =
  | {type: "add-item"; payload: {item: MenuItemT}}
  | {type: "delete-item"; payload: {id: MenuItemT["id"]}}
  | {type: "increment-quantity"; payload: {id: MenuItemT["id"]}}
  | {type: "decrement-quantity"; payload: {id: MenuItemT["id"]}}
  | {type: "reload-order"}
  | {type: "add-tip"; payload: {value: number}};

export type OrderStateT = {
  order: OrderItemT[];
  tip: number;
};

/* Lee el local storage y si existe algo lo asgina como valor inicial de state order, si no le setea un [] */
const initialOrder = (): OrderItemT[] => {
  const localStorageOrder = localStorage.getItem("order");

  return localStorageOrder ? JSON.parse(localStorageOrder) : [];
};

//Initial state del reducer
export const initialState: OrderStateT = {
  order: initialOrder(),
  tip: 0,
};

//reducer
export const orderReducer = (
  state: OrderStateT = initialState,
  action: OrderActionsT,
) => {
  if (action.type === "add-item") {
    const itemExist = state.order.find(
      (orderItem) => orderItem.id === action.payload.item.id,
    );

    // eslint-disable-next-line no-useless-assignment
    let updateOrder: OrderItemT[] = [];
    if (itemExist) {
      updateOrder = state.order.map((orderItem) => {
        return orderItem.id === action.payload.item.id
          ? {...orderItem, quantity: orderItem.quantity + 1}
          : orderItem;
      });
    } else {
      const newItem: OrderItemT = {...action.payload.item, quantity: 1};
      updateOrder = [...state.order, newItem];
    }
    return {
      ...state,
      order: updateOrder,
    };
  }

  if (action.type === "delete-item") {
    const updateOrder: OrderItemT[] = state.order.filter(
      (orderItem) => orderItem.id !== action.payload.id,
    );
    return {
      ...state,
      order: updateOrder,
    };
  }

  if (action.type === "increment-quantity") {
    const updateOrder: OrderItemT[] = state.order.map((orderItem) => {
      return orderItem.id === action.payload.id
        ? {...orderItem, quantity: orderItem.quantity + 1}
        : orderItem;
    });
    return {
      ...state,
      order: updateOrder,
    };
  }

  if (action.type === "decrement-quantity") {
    const updateQuantity = state.order.map((orderItem) => {
      return orderItem.id === action.payload.id
        ? {...orderItem, quantity: orderItem.quantity - 1}
        : orderItem;
    });

    const updteOrder = updateQuantity.filter(
      (orderItem) => orderItem.quantity >= 1,
    );

    return {
      ...state,
      order: updteOrder,
    };
  }

  if (action.type === "reload-order") {
    return {
      ...state,
      order: [],
      tip: 0,
    };
  }

  if (action.type === "add-tip") {
    const tip = action.payload.value;
    return {
      ...state,
      tip: tip,
    };
  }
};
