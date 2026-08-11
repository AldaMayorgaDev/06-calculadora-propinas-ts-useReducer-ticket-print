import {useState} from "react";
import type {MenuItemT, OrderItemT} from "../types";

export default function useOrder() {
  const [order, setOrder] = useState<OrderItemT[]>([]);
  const [tip, setTip] = useState<number>(0);

  const addItem = (item: MenuItemT) => {
    const itemExist = order.find((orderItem) => orderItem.id === item.id);

    if (itemExist) {
      const updateOrder = order.map((orderItem) => {
        return orderItem.id === item.id
          ? {...orderItem, quantity: orderItem.quantity + 1}
          : orderItem;
      });
      setOrder(updateOrder);
    } else {
      const newItem = {...item, quantity: 1};
      setOrder([...order, newItem]);
    }
  };

  const deleteItem = (id: MenuItemT["id"]) => {
    const updateOrder = order.filter((orderItem) => orderItem.id !== id);

    setOrder(updateOrder);
  };

  const incrementQuantity = (id: MenuItemT["id"]) => {
    const updateOrder = order.map((orderItem) => {
      return orderItem.id === id
        ? {...orderItem, quantity: orderItem.quantity + 1}
        : orderItem;
    });

    setOrder(updateOrder);
  };

  const decrementQuantity = (id: MenuItemT["id"]) => {
    const updateQuantity = order.map((orderItem) => {
      return orderItem.id === id
        ? {...orderItem, quantity: orderItem.quantity - 1}
        : orderItem;
    });

    const updteOrder = updateQuantity.filter(
      (orderItem) => orderItem.quantity >= 1,
    );

    setOrder(updteOrder);
  };

  const reloadOrder = () => {
    setOrder([]);
  };

  return {
    order,
    tip,
    setTip,
    addItem,
    deleteItem,
    incrementQuantity,
    decrementQuantity,
    reloadOrder,
  };
}
