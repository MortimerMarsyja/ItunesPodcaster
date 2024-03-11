interface Identifiable {
  id: string | number;
}

interface Header<T> {
  id: string;
  label: string;
  key: keyof T;
  render?: (value: any) => any;
}

interface TableProps<T extends Identifiable> {
  data: T[];
  headers: Header<T>[];
  onRowClick?: (row: T) => void;
}

const Table = <T extends Identifiable>({
  data,
  headers,
  onRowClick,
}: TableProps<T>) => {
  return (
    <div style={{ maxHeight: "600px", overflow: "auto" }}>
      <table>
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
          {data.map((row, idx) => (
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
                  {header.render
                    ? header.render(row[header.key])
                    : row[header.key]}
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
