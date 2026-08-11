import type {OrderItemT, MenuItemT} from "../../types";

type ButtonDecrementPropsT = {
  decrementQuantity: (id: MenuItemT["id"]) => void;
  orderItem: OrderItemT;
};
const ButtonDecrement = ({
  decrementQuantity,
  orderItem,
}: ButtonDecrementPropsT) => {
  return (
    <button
      className="btn-quantity mx-4"
      onClick={() => {
        decrementQuantity(orderItem.id);
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
