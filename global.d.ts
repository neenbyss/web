// Permite importar hojas de estilo como efecto secundario (`import "./x.css"`)
// sin que TypeScript se queje (TS2882). Necesario para los CSS del editor.
declare module "*.css";
