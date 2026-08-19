import type {ActionDispatch} from "react";
import {formatCurrency} from "../helpers";
import ButtonTrash from "../components/utils/ButtonTrash";
import ButtonIcrement from "./utils/ButtonIcrement";
import ButtonDecrement from "./utils/ButtonDecrement";
import type {OrderActionsT, OrderStateT} from "../reducers/order-reducer";

type OrderContentsPropsT = {
  state: OrderStateT;
  dispatch: ActionDispatch<[OrderActionsT]>;
};
export const OrderContents = ({state, dispatch}: OrderContentsPropsT) => {
  return (
    <>
      <h2 className="text-center font-bold text-3xl">Consumo</h2>
      <div className="space-y-3 mt-10">
        {state.order.length === 0 ? (
          <p className="alert-danger">La orden está vacia</p>
        ) : (
          state.order.map((orderItem) => {
            return (
              <div
                key={orderItem.id}
                className="flex justify-between items-center border-t border-gray-200 py-5 last-of-type:border-b"
              >
                <div className="min-w-[60%] ">
                  <p className="text-lg">
                    {orderItem.name} - {formatCurrency(orderItem.price)}{" "}
                  </p>

                  <div className="flex justify-between font-bold">
                    <p className=" font-bold flex items-center max-w-[80%] space-x-2">
                      Cantidad:
                      <ButtonDecrement
                        dispatch={dispatch}
                        orderItem={orderItem}
                      />
                      {orderItem.quantity}
                      <ButtonIcrement
                        dispatch={dispatch}
                        orderItem={orderItem}
                      />
                    </p>
                    <p>
                      Subtotal:{"         "}
                      {formatCurrency(orderItem.quantity * orderItem.price)}
                    </p>
                  </div>
                </div>
                <ButtonTrash dispatch={dispatch} id={orderItem.id} />
              </div>
            );
          })
        )}
      </div>
    </>
  );
};
