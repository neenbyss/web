import type { Extensions } from "@tiptap/core"
import {
  Table as TiptapTable,
  TableRow,
  TableCell as TiptapTableCell,
  TableHeader as TiptapTableHeader,
} from "@tiptap/extension-table"
import { TableActiveCell } from "./active-cell"
import { TableHeaderScope } from "./table-scope"

// Atributo extra `backgroundColor` para colorear celdas.
const backgroundColor = {
  backgroundColor: {
    default: null as string | null,
    parseHTML: (el: HTMLElement) =>
      el.getAttribute("data-bg") || el.style.backgroundColor || null,
    renderHTML: (attrs: { backgroundColor?: string | null }) =>
      attrs.backgroundColor
        ? {
            "data-bg": attrs.backgroundColor,
            style: `background-color:${attrs.backgroundColor}`,
          }
        : {},
  },
}

const TableCell = TiptapTableCell.extend({
  addAttributes() {
    return { ...this.parent?.(), ...backgroundColor }
  },
})

// `scope` (col/row) para SEO/accesibilidad; lo mantiene automáticamente
// `TableHeaderScope` según el tipo de encabezado (fila → col, columna → row).
const headerScope = {
  scope: {
    default: null as string | null,
    parseHTML: (el: HTMLElement) => el.getAttribute("scope"),
    renderHTML: (attrs: { scope?: string | null }) =>
      attrs.scope ? { scope: attrs.scope } : {},
  },
}

const TableHeader = TiptapTableHeader.extend({
  addAttributes() {
    return { ...this.parent?.(), ...backgroundColor, ...headerScope }
  },
})

const Table = TiptapTable.configure({
  resizable: true,
  lastColumnResizable: true,
  allowTableNodeSelection: true,
})

/** Extensiones de tabla (Table + row + cell/header con `backgroundColor`, `scope`
 *  para SEO). */
export const tableExtensions: Extensions = [
  Table,
  TableRow,
  TableCell,
  TableHeader,
  TableActiveCell,
  TableHeaderScope,
]
