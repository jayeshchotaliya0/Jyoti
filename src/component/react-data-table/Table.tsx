// ReusableTable.tsx
import dynamic from 'next/dynamic'
import React, { Suspense } from 'react'
import Loader from '../higherOrderComponent/loader/Loader'
import PaginateSearch from '.'
import Filter from '../higherOrderComponent/Filter/Filter'
import MachinePartExpandable from '../machinePartExtand/MachinePartExpandable'
import { usePathname } from 'next/navigation'
// import DataTable, { TableColumn } from 'react-data-table-component';

const DataTable = dynamic(() => import('react-data-table-component'), {
  ssr: false,
  loading: () => <Loader />,
})

interface ReusableTableProps<T> {
  columns: Array<any>;
  data: T[];
  title?: string;
  selectableRows?: any;
  expandable?:boolean;
}

const ReusableTable = <T extends object>({
  columns,
  data,
  title,
  expandable,
  selectableRows
}: ReusableTableProps<T>) => {
  const pathname=usePathname()
  const customStyles = {
    headCells: {
      style: {
        color: '#3d405c',
        //border: '1px solid #e6e6f2',
        fontSize: '15px',
        fontWeight: 'bold',
      },
    },
    cells: {
      style: {
        fontSize: '15px',
        //border: '1px solid #e6e6f2',
      },
    },
  }

  const conditionalRowStyles = [
    {
      when: (row: any) => row.id % 2 === 0, // Adjust this to match your row identifier or index
      style: {
        backgroundColor: '#f7f7fc',
      },
    },
    {
      when: (row: any) => row.id % 2 !== 0, // Adjust this to match your row identifier or index
      style: {
        backgroundColor: '#ffffff',
      },
    },
  ]
  const paginationComponentOptions = {
    rowsPerPageText: 'Records per Page',
    rangeSeparatorText: 'of',
    noRowsPerPage: false,
    selectAllRowsItem: true,
    selectAllRowsItemText: 'All'
  };


  return (<>
                    
    <div className="flex flex-col shadow-lg shadow-neutral-500/50 mt-2">
      <div className="overflow-x-auto">
        <div className="overflow-hidden bg-white p-5">
          <PaginateSearch />
          
          <DataTable
              title={title}
              columns={columns}
              data={data}
              conditionalRowStyles={conditionalRowStyles}
              customStyles={customStyles}
              persistTableHead={true}
              paginationComponentOptions={paginationComponentOptions} // Custom pagination text
              pagination
              selectableRows={selectableRows}
              highlightOnHover
              responsive
              expandableRows={expandable}
              expandableRowsComponent={MachinePartExpandable}
            />
        </div>
      </div>
    </div>
  </>
  )
}

export default ReusableTable
