'use client'
import React from 'react'
import ManageMachineShop from '@/component/TableCommanHeader/TableCommanHeader'
import ActionButton from '@/component/actionButton/ActionButton'
import Filter from '@/component/higherOrderComponent/Filter/Filter'
import ReusableTable from '@/component/react-data-table/Table'
import FilterArray from '@/utils/FilterArray'
import { useSelector } from 'react-redux'
import AddPlannedProduction from './add-planned-production/AddPlannedProduction'
import UpdatePriority from './updatePriority/UpdatePriority'
import DatePickerComman from '@/component/higherOrderComponent/datepicker/DatePickerComman'
import { StatusColumn } from '@/utils/functions/commonFunction'

const page = () => {

  const columns = [
    {
      name: '',
      selector: (row: any) => row.id,
      sortable: true,
      width: '7rem',
    },
    {
      name: 'All',
      selector: (row: any) => (
        <input type="checkbox" />
      ),
      sortable: true,
    },
    {
      name: 'Priority',
      selector: (row: any) => row.priority,
      sortable: true,
    },
    {
      name: 'Order No.',
      selector: (row: any) => row.orderno,
      sortable: true,
    },
    {
      name: 'Part No./Part Name',
      selector: (row: any) => row.partnopartname,
      sortable: true,
    },
    {
      name: 'Model / Sub. Assm. Code',
      selector: (row: any) => row.modelsubassmcode,
      sortable: true,
    },
    {
      name: 'Planned Start Time',
      selector: (row: any) => row.plannedstarttime,
      sortable: true,
    },
    {
      name: 'Planned End Time',
      selector: (row: any) => row.plannedendtime,
      sortable: true,
    },
    {
      name: 'Actual End Time',
      selector: (row: any) => row.actualendtime,
      sortable: true,
    },
    {
      name: 'Qty.',
      selector: (row: any) => row.qty,
      sortable: true,
    },

    {
      name: 'Hold/Unhold',
      selector: (row: any) => (
        <StatusColumn row={row}/>
      ),
      sortable: true,
    },
    {
      name: 'Action',
      selector: () => {
        return <><ActionButton edit history deleteAction/> </>
      },
      sortable: false,
      width: '10rem',
    },
  ]
  const data = [
    {
      id: '+',
      priority: 'z',
      orderno: '20313796',
      partnopartname: 'F73100600200 - FLOATING_BRG_HSG',
      modelsubassmcode: '',
      plannedstarttime: '31/05/2023 05:17:47 PM',
      plannedendtime: '23/08/2023 05:17:47 PM',
      actualendtime: '',
      qty: '1',
      status: 'Active',
    },
    {
      id: '+',
      priority: 'z',
      orderno: '150863',
      partnopartname: 'F73100600200 - FLOATING_BRG_HSG',
      modelsubassmcode: '',
      plannedstarttime: '31/05/2023 05:17:47 PM',
      plannedendtime: '23/08/2023 05:17:47 PM',
      actualendtime: '',
      qty: '10',
      status: 'Active',
    },
  ]

  return (
    <>
      <ManageMachineShop
        plannedProduction='Add Planned Production'
        updatePriority='Update Priority'
        cellPlanned='Add Cell Planned Production'
        importBtnTitle="Import"
        exportBtnTitle="Format"
      />
      <div className='bg-yellow-200 py-2 px-3 mt-3 rounded-lg text-black'>
        <p>  Future planning has been scheduled considering running operations. | Last Re-schedule Date & Time : 03/06/2024 12:08 PM to 03/06/2024 12:14 PM</p>
      </div>
      <Filter data={FilterArray.futureplusplanningFilter} />
      <div className='my-2.5 flex items-center gap-2'>
      <DatePickerComman 
          datePickerTxt="To" 
          btnClass="font-bold p-5 flex items-center justify-center text-white bg-indigo-500 hover:bg-indigo-600 focus:ring-4 focus:ring-indigo-300 font-medium text-sm px-5 py-2 mb-2 focus:outline-none mt-8" 
      />
        <button className='bg-green-500 h-8 font-bold p-5 flex items-center justify-center text-white hover:bg-green-600 focus:ring-4 focus:ring-indigo-300 font-medium text-sm px-5 py-2.5 focus:outline-none'> Under Deadline </button>
        <button className='bg-red-500 h-8 font-bold p-5 flex items-center justify-center text-white hover:bg-red-600 focus:ring-4 focus:ring-indigo-300 font-medium text-sm px-5 py-2.5 focus:outline-none'> Over Deadline </button>
      </div>
      <ReusableTable columns={columns} data={data} />
      
      <AddPlannedProduction />
      <UpdatePriority/>
    </>
  )
}

export default page
