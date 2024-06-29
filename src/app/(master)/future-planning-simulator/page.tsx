'use client'
import ManageMachineShop from '@/component/TableCommanHeader/TableCommanHeader'
import ActionButton from '@/component/actionButton/ActionButton'
import Filter from '@/component/higherOrderComponent/Filter/Filter'
import Input from '@/component/higherOrderComponent/input'
import Modal from '@/component/higherOrderComponent/modal/Modal'

import ReusableTable from '@/component/react-data-table/Table'
import FilterArray from '@/utils/FilterArray'
import { StatusColumn, onlyAllowNumber } from '@/utils/functions/commonFunction'
import SelectBox from '@/utils/selectBox/SelectBox'
import service from '@/utils/service/service'

import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import AddPlannedProduction from './add-planned-production/AddPlannedProduction'
import UpdatePriority from './updatePriority/UpdatePriority'
import DatePickerComman from '@/component/higherOrderComponent/datepicker/DatePickerComman'
import { deleteIcon, printer } from '@/utils/icons/icons'

interface FormData {
  machineShop: string,
  shift: any,
  machineShopLine: any,
  machineCategory: any,
  workCenterName: any,
  workCenterDesc: any,
  workCenterType: any,
  asstManager: any,
  supervisorGroup: any,
  cycleTimeSplitter: any,
  cycleTimeSplitterSimulator: any,
  status: any,

}

const page = () => {
  const modals = useSelector((state: any) => state.modals);
  console.log("🚀 ~ page ~ modals:", modals)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,

    control,
  } = useForm<FormData>()

  const [loader, setLoader] = useState(false)

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
      width: '15rem',
    },
    {
      name: 'Model / Sub. Assm. Code',
      selector: (row: any) => row.modelsubassmcode,
      sortable: true,
      width: '15rem',
    },
    {
      name: 'Planned Start Time',
      selector: (row: any) => row.plannedstarttime,
      sortable: true,
      width: '15rem',
    },
    {
      name: 'Planned End Time',
      selector: (row: any) => row.plannedendtime,
      sortable: true,
      width: '15rem',
    },
    {
      name: 'Actual Start Time',
      selector: (row: any) => row.actualstarttime,
      sortable: true,
      width: '15rem',
    },
    {
      name: 'Actual End Time',
      selector: (row: any) => row.actualendtime,
      sortable: true,
      width: '15rem',
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
        return <><ActionButton edit history printer deleteAction/> </>
      },
      sortable: false,
      width: '10rem',
    },
  ]
  const data = [
    {
      id: '+',
      priority: 'A',
      orderno: '37',
      partnopartname: 'ASFXA0421_A-TABLE SHAFT',
      modelsubassmcode: '',
      plannedstarttime: '31/05/2023 05:17:47 PM',
      plannedendtime: '23/08/2023 05:17:47 PM',
      actualendtime: '',
      actualstarttime: '',
      qty: '1',
      status: 'Active',
    },
    {
      id: '+',
      priority: 'z',
      orderno: '165',
      partnopartname: 'ASFXA0421_A-TABLE SHAFT',
      modelsubassmcode: '',
      plannedstarttime: '31/05/2023 05:17:47 PM',
      plannedendtime: '23/08/2023 05:17:47 PM',
      actualendtime: '',
      actualstarttime: '',
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
      <Filter data={FilterArray.futureplanningsimulatorFilter} />
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
