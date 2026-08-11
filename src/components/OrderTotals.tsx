import {useMemo, useRef} from "react";
import {useReactToPrint} from "react-to-print";
import {Ticket} from "./ticket/Ticket";
import {formatCurrency} from "../helpers";
import type {OrderItemT} from "../types";

type OrderTotalsPropsT = {
  order: OrderItemT[];
  tip: number;
  reloadOrder: () => void;
};
export const OrderTotals = ({order, tip, reloadOrder}: OrderTotalsPropsT) => {
  const subTotalAmount = useMemo(
    () =>
      order.reduce((total, item) => {
        return total + item.price * item.quantity;
      }, 0),
    [order],
  );

  const tipAmount = useMemo(() => subTotalAmount * tip, [tip, subTotalAmount]);

  const totalAmount = useMemo(
    () => subTotalAmount + tipAmount,
    [subTotalAmount, tipAmount],
  );
  const ticketRef = useRef<HTMLDivElement>(null);
  const handlePrint = useReactToPrint({
    contentRef: ticketRef,
    documentTitle: "ticket-orden",
  });

  return (
    <>
      <div className="space-y-3">
        <h2 className="font-bold text-2xl text-center">Totales y propina: </h2>
        <p>
          Subtotal a pagar:
          <span className="font-bold"> {formatCurrency(subTotalAmount)}</span>
        </p>
        <p>
          Propina:
          <span className="font-bold">{formatCurrency(tipAmount)}</span>
        </p>
        <p>
          Total a pagar:
          <span className="font-bold"> {formatCurrency(totalAmount)}</span>
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-3">
        <button
          className="flex justify-evenly items-center bg-gray-500 p-4 rounded-lg text-white font-bold hover:bg-gray-600 hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-gray-500"
          onClick={() => {
            reloadOrder();
          }}
          disabled={order.length === 0}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
            />
          </svg>
          <p>Reiniciar Orden</p>
        </button>

        <button
          className="flex justify-evenly items-center bg-teal-400 p-4 rounded-lg text-white font-bold disabled:bg-teal-400/30 hover:cursor-pointer disabled:hover:cursor-not-allowed"
          disabled={order.length === 0}
          onClick={handlePrint}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 0 1 0 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 0 1 0-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375Z"
            />
          </svg>

          <p>Imprimir Ticket</p>
        </button>

        <div className="print-container">
          <div ref={ticketRef}>
            <Ticket order={order} tip={tip} />
          </div>
        </div>
      </div>
    </>
  );
};
