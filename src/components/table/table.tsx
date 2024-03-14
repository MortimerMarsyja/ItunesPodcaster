import React from "react";

interface Identifiable {
  id: string | number;
}

interface Header<T> {
  id: string;
  label: string;
  key: keyof T;
  render?: (value: T[keyof T]) => React.ReactNode;
}

interface TableProps<T extends Identifiable> {
  data: T[];
  headers: Header<T>[];
  onRowClick?: (row: T) => void;
}

const handleRenderTdContent = <T extends Identifiable>(
  header: Header<T>,
  row: T
) => {
  if (header.render) {
    return header.render(row[header.key]);
  } else {
    return String(row[header.key]);
  }
};

const Table = <T extends Identifiable>({
  data,
  headers,
  onRowClick,
}: TableProps<T>) => {
  return (
    <div className="w-full" style={{ maxHeight: "600px", overflow: "auto" }}>
      <table className="w-full">
        <thead>
          <tr>
            {headers.map((header) => (
              <th
                style={{
                  position: "sticky",
                  top: 0,
                  backgroundColor: "white",
                  textAlign: "left",
                }}
                key={header.key as string}
              >
                {header.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr
              onClick={() => onRowClick && onRowClick(row)}
              className={`
              even:bg-gray-100
                cursor-pointer
              hover:bg-gray-200
                transition-all 
                duration-300 ease-in-out
             `}
              key={row.id}
            >
              {headers.map((header, idx) => (
                <td
                  className={`
                    text-start 
                    ${idx === 0 ? "text-[#155e75]" : ""}
                    ${idx !== 0 ? "py-3" : ""}
                  `}
                  key={header.key as string}
                >
                  {handleRenderTdContent(header, row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
