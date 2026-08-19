import {useMemo} from "react";
import {formatCurrency} from "../../helpers";
import dataStore from "../../data/dataStore";
import type {OrderStateT} from "../../reducers/order-reducer";

type TicketPropsT = {
  state: OrderStateT;
};

export const Ticket = ({state}: TicketPropsT) => {
  const {business, sale, customer, footer} = dataStore;
  const subTotalAmount = useMemo(
    () =>
      state.order.reduce(
        (total, item) => total + item.price * item.quantity,
        0,
      ),
    [state.order],
  );

  const tipAmount = useMemo(
    () => subTotalAmount * state.tip,
    [subTotalAmount, state.tip],
  );

  const totalAmount = useMemo(
    () => subTotalAmount + tipAmount,
    [subTotalAmount, tipAmount],
  );

  const fecha = new Date().toLocaleString("es-MX", {
    dateStyle: "short",
    timeStyle: "short",
  });

  return (
    <div className="ticket font-mono text-black bg-white w-[58mm] mx-auto px-4 py-5 text-[11px] leading-snug">
      {/* Encabezado del negocio */}
      <div className="flex flex-col items-center text-center gap-1 mb-3">
        {business.logoUrl && (
          <img
            src={business.logoUrl}
            alt={business.name}
            className="w-48 h-48 object-contain mb-1"
          />
        )}
        <h1 className="font-bold text-sm uppercase tracking-wide">
          {business.name}
        </h1>
        <p className="text-[10px] px-2">{business.address}</p>
        <p className="text-[10px]">Tel: {business.phone}</p>
        <p className="text-[10px]">RFC: {business.taxId}</p>
      </div>

      <Divider />

      {/* Datos de la venta */}
      <div className="text-[10px] space-y-0.5 mb-1">
        <Row label="Folio" value={sale.folio} />
        <Row label="Fecha" value={fecha} />
        <Row label="Atendió" value={sale.cashier} />
        <Row label="Cliente" value={customer.name} />
      </div>

      <Divider />

      {/* Encabezado de la tabla de productos */}
      <div className="flex justify-between text-[9px] uppercase text-gray-600 font-semibold mb-1">
        <span>Cant / Producto</span>
        <span>Importe</span>
      </div>

      {/* Productos */}
      <div className="space-y-1.5 mb-1">
        {state.order.map((item) => (
          <div key={item.id} className="flex justify-between gap-2">
            <span className="flex-1">
              <span className="font-semibold">{item.quantity}x</span>{" "}
              {item.name}
            </span>
            <span className="whitespace-nowrap">
              {formatCurrency(item.price * item.quantity)}
            </span>
          </div>
        ))}
      </div>

      <Divider />

      {/* Totales */}
      <div className="space-y-1 text-[11px]">
        <Row label="Subtotal" value={formatCurrency(subTotalAmount)} />
        <Row label="Propina" value={formatCurrency(tipAmount)} />
      </div>

      <div className="border-t border-black mt-2 pt-1.5 flex justify-between items-baseline">
        <span className="font-bold text-[12px] uppercase">Total</span>
        <span className="font-bold text-[15px]">
          {formatCurrency(totalAmount)}
        </span>
      </div>

      <Divider />

      {/* Pie de ticket */}
      <div className="text-center space-y-1 mt-3">
        <p className="font-bold text-[11px]">{footer.thankYouMessage}</p>
        <p className="text-[9px] text-gray-700 px-1">{footer.returnPolicy}</p>
      </div>
    </div>
  );
};

function Divider() {
  return <hr className="my-2 border-t border-dashed border-black" />;
}

function Row({label, value}: {label: string; value: string}) {
  return (
    <div className="flex justify-between gap-2">
      <span className="text-gray-700">{label}</span>
      <span className="font-medium text-right">{value}</span>
    </div>
  );
}
