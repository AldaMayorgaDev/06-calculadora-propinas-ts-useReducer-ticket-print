import type {ActionDispatch} from "react";
import type {OrderActionsT} from "../reducers/order-reducer";
import type {MenuItemT} from "../types";
type MenuItemPropsT = {
  item: MenuItemT;
  dispatch: ActionDispatch<[OrderActionsT]>;
};

export const MenuItem = ({item, dispatch}: MenuItemPropsT) => {
  return (
    <button
      className="card-product"
      onClick={() => dispatch({type: "add-item", payload: {item: item}})}
    >
      <p>{item.name}</p>
      <p className="font-bold">$ {item.price}</p>
    </button>
  );
};
