import type {ActionDispatch} from "react";
import type {OrderItemT} from "../../types";
import type {OrderActionsT} from "../../reducers/order-reducer";

type ButtonIcrementPropsT = {
  dispatch: ActionDispatch<[OrderActionsT]>;
  orderItem: OrderItemT;
};
const ButtonIcrement = ({orderItem, dispatch}: ButtonIcrementPropsT) => {
  return (
    <button
      className="btn-quantity mx-4"
      onClick={() => {
        dispatch({type: "increment-quantity", payload: {id: orderItem.id}});
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={4}
        stroke="currentColor"
        className="size-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 4.5v15m7.5-7.5h-15"
        />
      </svg>
    </button>
  );
};

export default ButtonIcrement;
