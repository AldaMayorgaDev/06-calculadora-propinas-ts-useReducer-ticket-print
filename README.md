<div align="center">

# 🧾 Calculadora de Propinas y consumo + Impresión de Ticket de compra

Aplicación web para calcular propinas, generar el ticket de una venta y prepararlo para impresión en papel térmico (58mm/80mm) directamente desde el navegador.

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white)](https://vite.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![ESLint](https://img.shields.io/badge/ESLint-9-4B32C3?logo=eslint&logoColor=white)](https://eslint.org/)

[Ver repositorio](https://github.com/AldaMayorgaDev/03-Calculadora-Propinas-Ticket-Print.git)

</div>

## 📋 Descripción

**Restaurant Ticket & Tip App** es una aplicación desarrollada con **React, TypeScript, Vite y Tailwind CSS** que permite seleccionar un porcentaje de propina sobre el total de una orden y generar un ticket de venta listo para imprimirse en una impresora térmica.

El proyecto separa los datos del negocio (`dataStore`), los tipos de la orden, los cálculos de totales y la presentación del ticket en módulos independientes, de forma que sea sencillo reemplazar los datos de ejemplo por información real proveniente de un sistema de punto de venta.

> [!IMPORTANT]
> Por seguridad, una aplicación web no puede seleccionar una impresora ni confirmar la impresión automáticamente. El proyecto abre el cuadro de impresión mediante `window.print()` y el usuario debe elegir la impresora y confirmar el proceso.

## ✨ Funcionalidades principales

| Funcionalidad                    | Descripción                                                                                                 |
| -------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| **Selector de propina**          | Formulario de radio buttons controlado (`0%`, `10%`, `20%`, `50%`) con una opción seleccionada por defecto. |
| **Cálculo automático**           | Calcula subtotal, monto de propina y total a partir de los productos de la orden mediante `useMemo`.        |
| **Ticket de venta**              | Muestra negocio, folio, fecha, cajero(a), cliente, productos, subtotal, propina y total.                    |
| **Formato mexicano**             | Presenta importes en pesos mexicanos (`Intl.NumberFormat`) y fechas con la configuración regional `es-MX`.  |
| **Impresión desde el navegador** | Abre la interfaz de impresión del sistema mediante `window.print()` / `react-to-print`.                     |
| **Vista exclusiva de impresión** | Oculta todo lo que no sea el ticket (botones, formulario de propina, layout) al imprimir.                   |
| **Papel térmico**                | Estilos preparados para tickets de `58mm`, con `@page { size: 58mm auto; margin: 0 }`.                      |
| **Datos tipados**                | Define la estructura de la orden (`OrderItemT`) y del negocio (`DataStoreT`) con TypeScript.                |
| **Componentes reutilizables**    | Separa el formulario de propina y el ticket en componentes independientes y desacoplados.                   |

## 🧠 Conceptos aplicados

Este proyecto sirve como ejemplo práctico de:

- Componentes funcionales controlados con React (`useState`, `checked`, `onChange`).
- Tipado de props y estructuras de datos con TypeScript.
- Renderizado de listas mediante `map()`.
- Cálculo de valores derivados con `reduce()` y memoización con `useMemo`.
- Separación de responsabilidades entre componentes, datos, tipos y helpers.
- Formateo de moneda con `Intl.NumberFormat` y de fechas con `toLocaleString`.
- Estilizado con Tailwind CSS, incluyendo utilidades de impresión (`print:`, `hidden`).
- Uso de `window.print()` / `react-to-print` para abrir el cuadro de impresión.
- Aplicación de reglas CSS específicas mediante `@media print` y `@page`.

## 🧱 Estructura del proyecto

```text
restaurant-ticket-tip-app/
├── public/
│   └── logo.png
├── src/
│   ├── components/
│   │   ├── Ticket.tsx
│   │   └── TipPercentageForm.tsx
│   ├── data/
│   │   └── dataStore.ts
│   ├── helpers/
│   │   └── formatCurrency.ts
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

| Archivo                                | Responsabilidad                                                                                 |
| -------------------------------------- | ----------------------------------------------------------------------------------------------- |
| `src/data/dataStore.ts`                | Contiene los datos de ejemplo del negocio, la venta y el pie del ticket.                        |
| `src/types/index.ts`                   | Define los tipos `DataStoreT` y `OrderItemT` utilizados por los componentes.                    |
| `src/components/TipPercentageForm.tsx` | Formulario controlado de radio buttons para seleccionar el porcentaje de propina.               |
| `src/components/Ticket.tsx`            | Construye y muestra la estructura visual completa del ticket, lista para imprimir.              |
| `src/helpers/formatCurrency.ts`        | Formatea cantidades como pesos mexicanos.                                                       |
| `src/index.css`                        | Contiene las reglas de Tailwind y las reglas especiales de impresión (`@page`, `@media print`). |
| `src/App.tsx`                          | Integra el estado de la orden, la propina, el formulario y el ticket.                           |

## 🛠️ Tecnologías utilizadas

- **React 19** — Construcción de la interfaz mediante componentes.
- **TypeScript** — Tipado estático de datos, props y funciones.
- **Vite** — Entorno de desarrollo y generación del build.
- **Tailwind CSS** — Estilizado de la interfaz y del ticket, incluyendo estilos de impresión.
- **react-to-print** _(opcional)_ — Manejo simplificado de la impresión de un componente específico.
- **ESLint** — Análisis estático y validación de calidad del código.

## ✅ Requisitos previos

Antes de ejecutar el proyecto, instala:

- **Node.js `20.19.0` o superior**, o **Node.js `22.12.0` o superior**.
- **npm**, incluido normalmente con Node.js.
- Un navegador moderno como Chrome, Edge, Firefox o Safari.

Puedes comprobar las versiones instaladas con:

```bash
node --version
npm --version
```

## 🚀 Instalación y ejecución

### 1. Clonar el repositorio

```bash
git clone https://github.com/AldaMayorgaDev/03-Calculadora-Propinas-Ticket-Print.git
cd 03-Calculadora-Propinas-Ticket-Print
```

### 2. Instalar las dependencias

```bash
npm install
```

También puedes realizar una instalación reproducible usando el archivo `package-lock.json`:

```bash
npm ci
```

### 3. Ejecutar el proyecto en desarrollo

```bash
npm run dev
```

Vite mostrará en la terminal la dirección local de la aplicación, normalmente:

```text
http://localhost:5173
```

### 4. Generar el build de producción

```bash
npm run build
```

El resultado se guardará en la carpeta `dist/`.

### 5. Previsualizar el build

```bash
npm run preview
```

### 6. Ejecutar ESLint

```bash
npm run lint
```

## 📜 Scripts disponibles

| Comando           | Descripción                                        |
| ----------------- | -------------------------------------------------- |
| `npm run dev`     | Inicia el servidor de desarrollo de Vite.          |
| `npm run build`   | Valida TypeScript y genera el build de producción. |
| `npm run preview` | Ejecuta localmente una vista previa del build.     |
| `npm run lint`    | Analiza los archivos del proyecto con ESLint.      |

## 🧾 Personalización

### Modificar los datos del negocio y la venta

La información mostrada se encuentra en:

```text
src/data/dataStore.ts
```

Puedes personalizar:

- Nombre, dirección, teléfono y RFC del negocio.
- Logotipo.
- Folio y cajero(a) de la venta.
- Cliente.
- Mensaje de agradecimiento y política de devoluciones.

Ejemplo:

```ts
const dataStore: DataStoreT = {
  business: {
    name: "Tienda La Esquina",
    address: "Av. Agustín de Iturbide, Col. Centro, San Nicolás, Nuevo León.",
    phone: "55 1234 5678",
    taxId: "TIE850101ABC",
    logoUrl: "/logo.png",
  },
  sale: {
    folio: "A-000452",
    cashier: "María López",
  },
  customer: {
    name: "Cliente Mostrador",
  },
  footer: {
    thankYouMessage: "¡Gracias por tu compra!",
    returnPolicy:
      "Si requiere factura, solicitarla dentro de los primeros 5 días con este ticket.",
  },
};
```

> [!NOTE]
> En Vite, los archivos colocados dentro de `public/` se referencian desde la raíz. Por ejemplo, `public/logo.png` se utiliza como `/logo.png`.

### Modificar las opciones de propina

Las opciones del formulario se definen en `TipPercentageForm.tsx`:

```ts
const tipOptions = [
  {id: "tip-0", value: 0, label: "Sin propina"},
  {id: "tip-10", value: 0.1, label: "10%"},
  {id: "tip-20", value: 0.2, label: "20%"},
  {id: "tip-50", value: 0.5, label: "50%"},
];
```

El componente es **controlado**: recibe `tip` y `setTip` desde `App.tsx`, y cada radio se marca comparando `tip === option.value`, por lo que siempre hay una opción seleccionada de forma predecible.

### Cambiar el tamaño del papel

El ticket está preparado para papel térmico de **58mm**. Para adaptarlo a **80mm**, ajusta el ancho del contenedor en `Ticket.tsx` (`w-[58mm]` → `w-[80mm]`) y la regla `@page` en `src/index.css`:

```css
@media print {
  @page {
    size: 58mm auto; /* cambia a 80mm auto si usas ese formato */
    margin: 0;
  }
}
```

## 🖨️ Cómo imprimir el ticket

1. Ejecuta la aplicación.
2. Selecciona el porcentaje de propina.
3. Presiona el botón **Imprimir ticket**.
4. Selecciona la impresora térmica en el cuadro de impresión.
5. Verifica el tamaño del papel y los márgenes.
6. Desactiva encabezados y pies de página del navegador cuando sea necesario.
7. Confirma manualmente la impresión.

Durante la impresión, las reglas CSS:

- Ocultan los elementos que no pertenecen al ticket (`visibility: hidden` en `body *`).
- Muestran únicamente el contenedor `.ticket` y su contenido.
- Posicionan el ticket en la parte superior izquierda de la hoja.
- Configuran la página para papel térmico de 58mm sin márgenes.

## 🧮 Cálculo de importes

Los totales se calculan de la siguiente forma:

```text
subtotal = suma de (cantidad × precio unitario) de cada producto de la orden
propina  = subtotal × porcentaje seleccionado
total    = subtotal + propina
```

La lógica está memoizada con `useMemo` dentro de `Ticket.tsx`, por lo que los cálculos solo se repiten cuando cambia la orden o el porcentaje de propina.

## ⚠️ Alcance del proyecto

Este proyecto es una demostración frontend y no incluye:

- Base de datos ni persistencia de ventas.
- Backend o API.
- Inicio de sesión o control de usuarios.
- Comunicación directa con hardware de impresión.
- Impresión silenciosa sin confirmación del usuario.
- Generación o validación de CFDI.
- Integración con los servicios del SAT.

## 🗺️ Posibles mejoras

- Obtener la información de la orden desde una API o sistema de punto de venta.
- Permitir capturar productos desde un formulario en lugar de datos fijos.
- Incorporar un selector visual entre papel de 58mm y 80mm.
- Guardar ventas en una base de datos.
- Agregar un código QR de verificación al final del ticket.
- Crear pruebas unitarias para helpers y componentes.
- Añadir distintos diseños o plantillas de ticket.
- Implementar una aplicación de escritorio para impresión directa mediante Electron o Tauri.

## 📌 Estado del proyecto

Proyecto funcional con fines educativos, creado para practicar la construcción de componentes controlados, el tipado con TypeScript, el cálculo de datos derivados y la impresión de contenido desde una aplicación React.

## 📄 Licencia

Actualmente, este repositorio no incluye un archivo de licencia. Antes de reutilizarlo o distribuirlo en otros proyectos, se recomienda agregar una licencia explícita, por ejemplo **MIT**.

## 👨‍💻 Autor

Desarrollado por [@AldaMayorgaDev](https://github.com/AldaMayorgaDev).
