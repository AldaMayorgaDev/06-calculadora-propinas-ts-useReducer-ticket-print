import Header from "./components/Header";
import {MenuItem} from "./components/MenuItem";
import {OrderContents} from "./components/OrderContents";
import {menuItems} from "./data/db";
import type {MenuItemT} from "./types";
import useOrder from "./hooks/useOrder";
import {OrderTotals} from "./components/OrderTotals";
import TipPercentageForm from "./components/TipPercentageForm";
function App() {
  const {
    addItem,
    order,
    deleteItem,
    incrementQuantity,
    decrementQuantity,
    tip,
    setTip,
    reloadOrder,
  } = useOrder();
  return (
    <>
      <Header />

      <main className=" max-w-[80%] md:py-16 py-8 grid md:grid-cols-2 mx-auto gap-5">
        <div className="p-5">
          <h2 className="text-center font-bold text-3xl">Menú</h2>
          <div className="space-y-2 mt-8">
            {menuItems.map((item: MenuItemT) => {
              return <MenuItem key={item.id} item={item} addItem={addItem} />;
            })}
          </div>
        </div>
        <div className="border border-dashed border-slate-300 p-5 rounded-lg space-y-8">
          <OrderContents
            order={order}
            deleteItem={deleteItem}
            incrementQuantity={incrementQuantity}
            decrementQuantity={decrementQuantity}
          />
          <TipPercentageForm setTip={setTip} />
          <OrderTotals order={order} tip={tip} reloadOrder={reloadOrder} />
        </div>
      </main>
    </>
  );
}

export default App;
