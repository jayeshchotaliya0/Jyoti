import React from 'react';

type TableRow = {
  [key: string]: string | number;
};

type TableColumn = {
  key: string;
  header: string;
  render?: (value: any, row: TableRow, index: number) => React.ReactNode;
  className?: string;
};
type TableProps = {
  data: TableRow[];
  columns: TableColumn[];
};
const TableComponent: React.FC<TableProps> = ({ data, columns }) => {
  return (
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          {columns?.map((column) => {
            return (
              <th scope="col" className="px-6 py-3">
                {column.header}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            {columns.map((column) => {
              return (
                <td className={`px-6 py-4 ${column?.className}`}>
                  {column.render
                    ? column.render(row[column.key], row, rowIndex)
                    : row[column.key]}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableComponent;
