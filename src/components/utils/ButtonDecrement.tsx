import type {ActionDispatch} from "react";
import type {OrderItemT} from "../../types";
import type {OrderActionsT} from "../../reducers/order-reducer";

type ButtonDecrementPropsT = {
  dispatch: ActionDispatch<[OrderActionsT]>;
  orderItem: OrderItemT;
};
const ButtonDecrement = ({dispatch, orderItem}: ButtonDecrementPropsT) => {
  return (
    <button
      className="btn-quantity mx-4"
      onClick={() => {
        dispatch({type: "decrement-quantity", payload: {id: orderItem.id}});
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={4}
        stroke="currentColor"
        className="size-4"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
      </svg>
    </button>
  );
};

export default ButtonDecrement;
