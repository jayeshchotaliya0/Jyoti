// ReusableTable.tsx
import React from 'react';
import { useTable, Column } from 'react-table';

interface ReusableTableProps<T extends object> {
  columns: Column<T>[];
  data: T[];
}

const Table = <T extends object>({ columns, data }: ReusableTableProps<T>) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable<T>({ columns, data });

  return (
    <table className="min-w-full divide-y divide-gray-200" {...getTableProps()}>
      <thead className="bg-gray-50">
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" {...column.getHeaderProps()}>{column.render('Header')}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody className="bg-white divide-y divide-gray-200" {...getTableBodyProps()}>
        {rows.map(row => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => (
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"{...cell.getCellProps()}>{cell.render('Cell')}</td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
