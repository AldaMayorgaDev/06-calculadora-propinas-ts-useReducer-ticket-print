import {useReducer, useEffect} from "react";
import {initialState, orderReducer} from "./reducers/order-reducer";
import type {MenuItemT} from "./types";
import {menuItems} from "./data/db";
import Header from "./components/Header";
import {MenuItem} from "./components/MenuItem";
import {OrderContents} from "./components/OrderContents";
import {OrderTotals} from "./components/OrderTotals";
import TipPercentageForm from "./components/TipPercentageForm";
function App() {
  const [state, dispatch] = useReducer(orderReducer, initialState);

  /* Guarda la orden en localStorage  cada que cambia algo en el state de order*/
  useEffect(() => {
    localStorage.setItem("order", JSON.stringify(state!.order));
  }, [state!.order]);
  return (
    <>
      <Header />

      <main className=" max-w-[80%] md:py-16 py-8 grid md:grid-cols-2 mx-auto gap-5">
        <div className="p-5">
          <h2 className="text-center font-bold text-3xl">Menú</h2>
          <div className="space-y-2 mt-8">
            {menuItems.map((item: MenuItemT) => {
              return <MenuItem key={item.id} item={item} dispatch={dispatch} />;
            })}
          </div>
        </div>
        <div className="border border-dashed border-slate-300 p-5 rounded-lg space-y-8">
          <OrderContents state={state!} dispatch={dispatch} />
          <TipPercentageForm dispatch={dispatch} tip={state!.tip} />
          <OrderTotals state={state!} dispatch={dispatch} />
        </div>
      </main>
    </>
  );
}

export default App;
