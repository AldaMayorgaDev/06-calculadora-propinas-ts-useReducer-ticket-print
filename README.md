<div align="center">

# 🧾 Calculadora de Propinas + Ticket de Compra con useReducer

Aplicación web desarrollada con **React + TypeScript** para administrar una orden de consumo, calcular propinas y generar un ticket listo para imprimir en papel térmico desde el navegador.

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)](https://vite.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![ESLint](https://img.shields.io/badge/ESLint-10-4B32C3?logo=eslint&logoColor=white)](https://eslint.org/)

[Ver repositorio](https://github.com/AldaMayorgaDev/06-calculadora-propinas-ts-useReducer-ticket-print)

</div>

## 📋 Descripción

Este proyecto simula el flujo básico de una orden en un restaurante o punto de venta. El usuario puede agregar productos del menú, modificar cantidades, eliminar productos, seleccionar un porcentaje de propina y consultar automáticamente el subtotal, la propina y el total a pagar.

La aplicación también genera un **ticket de compra de 58 mm** y utiliza `react-to-print` para abrir el flujo de impresión del navegador.

En esta versión, el manejo del estado fue refactorizado para utilizar **`useReducer`**. La lógica que anteriormente estaba concentrada en el custom hook `useOrder` fue migrada a `src/reducers/order-reducer.ts`, donde ahora se encuentran el estado inicial, las acciones disponibles y las reglas para actualizar la orden.

La orden se persiste en `localStorage`, por lo que los productos permanecen disponibles después de recargar la página.

> [!IMPORTANT]
> Por restricciones de seguridad del navegador, la aplicación puede abrir el cuadro de impresión, pero no puede seleccionar una impresora ni confirmar la impresión automáticamente. El usuario debe realizar esos pasos manualmente.

## ✨ Funcionalidades principales

| Funcionalidad             | Descripción                                                                             |
| ------------------------- | --------------------------------------------------------------------------------------- |
| **Agregar productos**     | Añade productos del menú a la orden mediante la acción `add-item`.                      |
| **Acumular cantidades**   | Si el producto ya existe, aumenta automáticamente su cantidad.                          |
| **Incrementar cantidad**  | Permite aumentar unidades mediante `increment-quantity`.                                |
| **Disminuir cantidad**    | Reduce unidades mediante `decrement-quantity`; si llega a cero, el producto se elimina. |
| **Eliminar productos**    | Elimina completamente un producto mediante `delete-item`.                               |
| **Seleccionar propina**   | Permite elegir `0%`, `10%`, `20%` o `50%` mediante la acción `add-tip`.                 |
| **Cálculo automático**    | Calcula subtotal, propina y total utilizando `reduce()` y `useMemo`.                    |
| **Reiniciar orden**       | Limpia los productos y reinicia la propina mediante `reload-order`.                     |
| **Persistencia local**    | Guarda automáticamente la orden en `localStorage` mediante `useEffect`.                 |
| **Ticket de compra**      | Genera un ticket con negocio, folio, fecha, cliente, productos y totales.               |
| **Impresión térmica**     | Utiliza `react-to-print` y estilos preparados para papel de `58mm`.                     |
| **Formato mexicano**      | Presenta moneda en MXN con `Intl.NumberFormat` y fecha con configuración `es-MX`.       |
| **Tipado con TypeScript** | Tipado del estado, acciones, productos, orden, props y datos del negocio.               |

## 🧠 Conceptos aplicados

Este proyecto permite practicar de forma conjunta:

- `useReducer` para manejar estado con múltiples transiciones relacionadas.
- Patrón **state + action + reducer + dispatch**.
- Discriminated unions de TypeScript para tipar las acciones del reducer.
- Estado compuesto mediante `OrderStateT`.
- Persistencia de información con `localStorage`.
- Sincronización de efectos secundarios con `useEffect`.
- Valores derivados utilizando `reduce()` y `useMemo`.
- Comunicación entre componentes mediante props y `dispatch`.
- Renderizado de listas con `map()`.
- Componentes reutilizables para las acciones de la orden.
- Formateo de moneda con `Intl.NumberFormat`.
- Generación de tickets para impresión mediante `react-to-print`.
- Estilos responsivos y de impresión con Tailwind CSS.
- Tipado estático con TypeScript.

## 🔄 Migración de `useOrder` a `useReducer`

Anteriormente, la lógica relacionada con la orden se encontraba dentro del custom hook:

```text
src/hooks/useOrder.ts
```

En esta versión, esa responsabilidad se trasladó al reducer:

```text
src/reducers/order-reducer.ts
```

El hook `useOrder.ts` se conserva únicamente como referencia de la migración y ya no administra el estado de la aplicación.

### Antes

La lógica de la orden estaba encapsulada dentro de un custom hook que exponía el estado y diferentes funciones para modificarlo.

### Ahora

`App.tsx` utiliza:

```ts
const [state, dispatch] = useReducer(orderReducer, initialState);
```

Los componentes reciben `state` y/o `dispatch` y envían acciones al reducer:

```ts
dispatch({
  type: "add-item",
  payload: {item},
});
```

El reducer recibe el estado actual y la acción, y genera el siguiente estado:

```text
Componente
    │
    │ dispatch(action)
    ▼
orderReducer(state, action)
    │
    │ nuevo estado
    ▼
React vuelve a renderizar la interfaz
```

Esto centraliza las reglas de actualización de la orden y hace más explícito qué acciones pueden modificar el estado.

## 🧩 Estado administrado por el reducer

El estado global de la orden se encuentra tipado de la siguiente manera:

```ts
export type OrderStateT = {
  order: OrderItemT[];
  tip: number;
};
```

Su estado inicial es:

```ts
export const initialState: OrderStateT = {
  order: initialOrder(),
  tip: 0,
};
```

`initialOrder()` consulta `localStorage` para recuperar una orden almacenada previamente. Si no existe información guardada, la aplicación inicia con una orden vacía.

> [!NOTE]
> Actualmente se persiste únicamente `order`. El porcentaje de propina vuelve a `0` al iniciar nuevamente la aplicación.

## 🎯 Acciones disponibles

Las acciones están definidas mediante una unión discriminada de TypeScript:

```ts
export type OrderActionsT =
  | {type: "add-item"; payload: {item: MenuItemT}}
  | {type: "delete-item"; payload: {id: MenuItemT["id"]}}
  | {type: "increment-quantity"; payload: {id: MenuItemT["id"]}}
  | {type: "decrement-quantity"; payload: {id: MenuItemT["id"]}}
  | {type: "reload-order"}
  | {type: "add-tip"; payload: {value: number}};
```

| Acción               | Responsabilidad                                                                |
| -------------------- | ------------------------------------------------------------------------------ |
| `add-item`           | Agrega un producto o incrementa su cantidad si ya existe.                      |
| `delete-item`        | Elimina un producto de la orden.                                               |
| `increment-quantity` | Aumenta en una unidad la cantidad de un producto.                              |
| `decrement-quantity` | Disminuye la cantidad y elimina el producto cuando queda debajo de una unidad. |
| `reload-order`       | Vacía la orden y reinicia la propina.                                          |
| `add-tip`            | Actualiza el porcentaje de propina seleccionado.                               |

## 💾 Persistencia con localStorage

La orden se guarda automáticamente cada vez que cambia `state.order`:

```ts
useEffect(() => {
  localStorage.setItem("order", JSON.stringify(state.order));
}, [state.order]);
```

Al iniciar la aplicación, el reducer intenta recuperar esos datos:

```ts
const initialOrder = (): OrderItemT[] => {
  const localStorageOrder = localStorage.getItem("order");

  return localStorageOrder ? JSON.parse(localStorageOrder) : [];
};
```

El flujo de persistencia es:

```text
Usuario modifica la orden
        ↓
dispatch(action)
        ↓
orderReducer actualiza state.order
        ↓
useEffect detecta el cambio
        ↓
localStorage guarda la orden
```

## 🧱 Estructura del proyecto

```text
06-calculadora-propinas-ts-useReducer-ticket-print/
├── public/
│   ├── favicon.svg
│   ├── icons.svg
│   └── logo.png
├── src/
│   ├── components/
│   │   ├── ticket/
│   │   │   └── Ticket.tsx
│   │   ├── utils/
│   │   │   ├── ButtonDecrement.tsx
│   │   │   ├── ButtonIcrement.tsx
│   │   │   └── ButtonTrash.tsx
│   │   ├── Header.tsx
│   │   ├── MenuItem.tsx
│   │   ├── OrderContents.tsx
│   │   ├── OrderTotals.tsx
│   │   └── TipPercentageForm.tsx
│   ├── data/
│   │   ├── dataStore.ts
│   │   └── db.ts
│   ├── helpers/
│   │   └── index.ts
│   ├── hooks/
│   │   └── useOrder.ts
│   ├── reducers/
│   │   └── order-reducer.ts
│   ├── types/
│   │   └── index.ts
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── eslint.config.js
├── index.html
├── package.json
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
└── README.md
```

## 🧩 Responsabilidad de cada módulo

| Archivo                                | Responsabilidad                                                                                                 |
| -------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `src/reducers/order-reducer.ts`        | Define `OrderStateT`, `OrderActionsT`, el estado inicial y toda la lógica para modificar la orden y la propina. |
| `src/hooks/useOrder.ts`                | Archivo conservado como referencia de la migración; la lógica fue trasladada al reducer.                        |
| `src/App.tsx`                          | Inicializa `useReducer`, persiste la orden con `useEffect` y distribuye `state` y `dispatch`.                   |
| `src/data/db.ts`                       | Contiene los productos disponibles en el menú.                                                                  |
| `src/data/dataStore.ts`                | Contiene los datos del negocio, venta, cliente y pie del ticket.                                                |
| `src/types/index.ts`                   | Define `MenuItemT`, `OrderItemT` y `DataStoreT`.                                                                |
| `src/components/MenuItem.tsx`          | Renderiza un producto del menú y despacha `add-item`.                                                           |
| `src/components/OrderContents.tsx`     | Renderiza los productos agregados y permite incrementar, disminuir o eliminarlos.                               |
| `src/components/TipPercentageForm.tsx` | Renderiza las opciones de propina y despacha `add-tip`.                                                         |
| `src/components/OrderTotals.tsx`       | Calcula subtotal, propina y total; reinicia la orden y controla la impresión.                                   |
| `src/components/ticket/Ticket.tsx`     | Construye el ticket térmico que será enviado a impresión.                                                       |
| `src/components/utils/*`               | Botones reutilizables para modificar cantidades o eliminar productos.                                           |
| `src/helpers/index.ts`                 | Contiene `formatCurrency()` para mostrar cantidades en MXN.                                                     |
| `src/index.css`                        | Configura Tailwind CSS, estilos reutilizables y reglas para impresión térmica.                                  |

## 🛠️ Tecnologías utilizadas

- **React 19** — Construcción de la interfaz mediante componentes funcionales.
- **TypeScript 6** — Tipado estático del estado, acciones, componentes y datos.
- **Vite 8** — Entorno de desarrollo y generación del build de producción.
- **Tailwind CSS 4** — Diseño responsivo y estilos de la aplicación.
- **react-to-print** — Impresión del componente `Ticket` desde el navegador.
- **ESLint 10** — Análisis estático del código.
- **localStorage** — Persistencia local de la orden.

## ✅ Requisitos previos

Necesitas tener instalado:

- Node.js compatible con Vite 8.
- npm.
- Un navegador moderno como Chrome, Edge, Firefox o Safari.

Puedes comprobar tus versiones con:

```bash
node --version
npm --version
```

## 🚀 Instalación y ejecución

### 1. Clonar el repositorio

```bash
git clone https://github.com/AldaMayorgaDev/06-calculadora-propinas-ts-useReducer-ticket-print.git
cd 06-calculadora-propinas-ts-useReducer-ticket-print
```

### 2. Instalar dependencias

```bash
npm install
```

También puedes utilizar:

```bash
npm ci
```

para realizar una instalación basada en `package-lock.json`.

### 3. Ejecutar el servidor de desarrollo

```bash
npm run dev
```

Vite mostrará una URL local similar a:

```text
http://localhost:5173
```

### 4. Generar el build de producción

```bash
npm run build
```

### 5. Previsualizar el build

```bash
npm run preview
```

### 6. Ejecutar ESLint

```bash
npm run lint
```

## 📜 Scripts disponibles

| Comando           | Descripción                                         |
| ----------------- | --------------------------------------------------- |
| `npm run dev`     | Inicia el servidor de desarrollo de Vite.           |
| `npm run build`   | Ejecuta TypeScript y genera el build de producción. |
| `npm run preview` | Previsualiza localmente el build generado.          |
| `npm run lint`    | Ejecuta ESLint sobre el proyecto.                   |

## 🍽️ Modificar los productos del menú

Los productos se encuentran en:

```text
src/data/db.ts
```

Cada producto implementa el tipo `MenuItemT`:

```ts
export type MenuItemT = {
  id: number;
  name: string;
  price: number;
};
```

Ejemplo:

```ts
{
  id: 1,
  name: "Pizza a la Leña Chica",
  price: 30,
}
```

## 💰 Modificar las opciones de propina

Las opciones se encuentran en:

```text
src/components/TipPercentageForm.tsx
```

```ts
const tipOptions = [
  {id: "tip-0", value: 0, label: "Sin propina"},
  {id: "tip-10", value: 0.1, label: "10%"},
  {id: "tip-20", value: 0.2, label: "20%"},
  {id: "tip-50", value: 0.5, label: "50%"},
];
```

Cuando el usuario cambia la selección se despacha:

```ts
dispatch({
  type: "add-tip",
  payload: {value: +e.target.value},
});
```

## 🏪 Personalizar el ticket

Los datos del negocio y de la venta se encuentran en:

```text
src/data/dataStore.ts
```

Desde este archivo puedes modificar:

- Nombre del negocio.
- Dirección.
- Teléfono.
- RFC.
- Logotipo.
- Folio de venta.
- Cajero(a).
- Cliente.
- Mensaje de agradecimiento.
- Política o mensaje final.

Los archivos colocados dentro de `public/` se consumen desde la raíz de la aplicación. Por ejemplo:

```ts
logoUrl: "/logo.png";
```

## 🧮 Cálculo de importes

Los importes se obtienen a partir del estado de la orden:

```text
subtotal = Σ (precio × cantidad)
propina  = subtotal × porcentaje de propina
total    = subtotal + propina
```

Los cálculos derivados utilizan `useMemo` para recalcularse cuando cambian sus dependencias.

## 🖨️ Impresión del ticket

`OrderTotals.tsx` crea una referencia al ticket:

```ts
const ticketRef = useRef<HTMLDivElement>(null);
```

Después configura `react-to-print`:

```ts
const handlePrint = useReactToPrint({
  contentRef: ticketRef,
  documentTitle: "ticket-orden",
});
```

Al presionar **Imprimir Ticket**, `react-to-print` prepara el contenido referenciado y abre el flujo de impresión del navegador.

El ticket está diseñado con un ancho de:

```text
58mm
```

Además, `src/index.css` contiene:

```css
@media print {
  @page {
    size: 58mm auto;
    margin: 0;
  }

  body {
    margin: 0;
  }
}
```

Para utilizar papel de **80 mm**, puedes ajustar el ancho de `Ticket.tsx` y la regla `@page`.

## 🏗️ Flujo general de la aplicación

```text
                 ┌──────────────┐
                 │   App.tsx    │
                 │  useReducer  │
                 └──────┬───────┘
                        │
                 state + dispatch
                        │
       ┌────────────────┼─────────────────┐
       ▼                ▼                 ▼
   MenuItem       OrderContents   TipPercentageForm
       │                │                 │
       └────────────────┼─────────────────┘
                        │
                  dispatch(action)
                        │
                        ▼
              ┌──────────────────┐
              │   orderReducer   │
              └────────┬─────────┘
                       │
                  nuevo state
                       │
          ┌────────────┴────────────┐
          ▼                         ▼
   localStorage               OrderTotals
                                  │
                                  ▼
                               Ticket
                                  │
                                  ▼
                            react-to-print
```

## ⚠️ Alcance del proyecto

Este proyecto tiene fines educativos y de práctica frontend. Actualmente no incluye:

- Backend o API.
- Base de datos.
- Persistencia de ventas en servidor.
- Sistema de autenticación.
- Administración de usuarios.
- Comunicación directa con hardware de impresión.
- Impresión silenciosa sin intervención del usuario.
- Generación de CFDI.
- Integración con servicios del SAT.

## 🗺️ Posibles mejoras

- Eliminar definitivamente el archivo legacy `useOrder.ts` después de completar la migración.
- Extraer el acceso a `localStorage` a una función reutilizable.
- Persistir también el porcentaje de propina.
- Implementar una API para productos y órdenes.
- Guardar ventas en una base de datos.
- Añadir pruebas unitarias para el reducer.
- Añadir pruebas para las acciones de incrementar, disminuir, eliminar y reiniciar.
- Implementar Context API junto con `useReducer` para evitar pasar `dispatch` por múltiples props si la aplicación crece.
- Permitir elegir entre tickets de 58 mm y 80 mm.
- Agregar un código QR al ticket.
- Crear diferentes plantillas de impresión.

## 📌 Estado del proyecto

Proyecto funcional con fines educativos, enfocado en practicar la evolución del manejo de estado en React desde un **custom hook** hacia una arquitectura basada en **`useReducer`**, manteniendo TypeScript, persistencia con `localStorage` y generación de tickets imprimibles.

## 📄 Licencia

Actualmente el repositorio no incluye un archivo de licencia. Si planeas reutilizar o distribuir el proyecto, puedes agregar una licencia como **MIT**.

## 👨‍💻 Autor

Desarrollado con 🖤 por [@AldaMayorgaDev](https://github.com/AldaMayorgaDev).
