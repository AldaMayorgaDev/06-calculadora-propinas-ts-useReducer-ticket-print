import type {DataStoreT} from "../types/index";

const dataStore: DataStoreT = {
  /* Datos empresa */
  business: {
    name: "Tienda La Esquina",
    address: "Av. Agustín de Iturbide, Col. Centro, San Nicolas, Nuevo León.",
    phone: "55 1234 5678",
    taxId: "TIE850101ABC",
    logoUrl: "/logo.png",
  },
  /* Datos de la venta */
  sale: {
    folio: "A-000452",
    cashier: "María López",
  },
  /* Datos del cliente */
  customer: {
    name: "Cliente Mostrador",
  },
  footer: {
    thankYouMessage: "¡Gracias por tu compra!",
    returnPolicy:
      "Si requiere factura, solicitarla dentro de los primeros 5 días con este ticket.",
  },
};
export default dataStore;
