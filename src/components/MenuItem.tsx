import type {MenuItemT} from "../types";
type MenuItemPropsT = {
  item: MenuItemT;
  addItem: (item: MenuItemT) => void;
};

export const MenuItem = ({item, addItem}: MenuItemPropsT) => {
  return (
    <button className="card-product" onClick={() => addItem(item)}>
      <p>{item.name}</p>
      <p className="font-bold">$ {item.price}</p>
    </button>
  );
};
