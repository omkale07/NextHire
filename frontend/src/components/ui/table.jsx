import "./tabel.css";

export function Table({ children }) {
  return <div className="tbl-wrapper"><table className="tbl">{children}</table></div>
}

export function TableHeader({ children }) {
  return <thead className="tbl-head">{children}</thead>
}

export function TableBody({ children }) {
  return <tbody className="tbl-body">{children}</tbody>
}

export function TableFooter({ children }) {
  return <tfoot className="tbl-foot">{children}</tfoot>
}

export function TableRow({ children }) {
  return <tr className="tbl-row">{children}</tr>
}

export function TableHead({ children }) {
  return <th className="tbl-th">{children}</th>
}

export function TableCell({ children }) {
  return <td className="tbl-td">{children}</td>
}

export function TableCaption({ children }) {
  return <caption className="tbl-caption">{children}</caption>
}