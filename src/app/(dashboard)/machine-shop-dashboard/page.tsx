'use client'
import ManageMachineShop from '@/component/TableCommanHeader/TableCommanHeader'
import ActionButton from '@/component/actionButton/ActionButton'
import Filter from '@/component/higherOrderComponent/Filter/Filter'
import DatePickerComman from '@/component/higherOrderComponent/datepicker/DatePickerComman'
import Input from '@/component/higherOrderComponent/input'
import Modal from '@/component/higherOrderComponent/modal/Modal'

import ReusableTable from '@/component/react-data-table/Table'
import FilterArray from '@/utils/FilterArray'
import { onlyAllowNumber } from '@/utils/functions/commonFunction'
import SelectBox from '@/utils/selectBox/SelectBox'
import service from '@/utils/service/service'

import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'

interface FormData {
  machineShop: string,
  shift:any,
  machineShopLine:any,
  machineCategory:any,
  workCenterName:any,
  workCenterDesc:any,
  workCenterType:any,
  asstManager:any,
  supervisorGroup:any,
  cycleTimeSplitter:any,
  cycleTimeSplitterSimulator:any,
  status: any,
  
}

const page = () => {
  const openAddModal = useSelector((state: any) => state.isModalOpen)
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    setError,
    control,
  } = useForm<FormData>()
  
  const[updateProduction,setUpdateProduction]=useState(false)
  const [loader, setLoader] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [workCenterId, setWorkCenterId] = useState('')

  const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
    try {
      console.log('data', data)
      setLoader(true)
      const body = {
        machineshopid: 0,
        ...data,
      }
      const updateData = {
        // id:machineShopId?.toString(),
        // machineshopid: machineShopId,
        ...data,
      }

      const addManageShopRes: any = await service.makeAPICall({
        methodName: workCenterId ? service.Methods.PUT : service.Methods.POST,
        apiUrl: workCenterId
          ? service.API_URL.managesubcategory.update
          : service.API_URL.managesubcategory.add,
        body: workCenterId ? updateData : body,
      })

      if (addManageShopRes.apiStatus === true) {
        setLoader(false)
        // await getManageShopList();
        reset()
      } else {
        // setError('machineshopname', { type: 'custom', message: addManageShopRes?.apiErrorData?.machineshopname || 'Error' });
        // setError('machineshopcode', { type: 'custom', message: addManageShopRes?.apiErrorData?.machineshopcode || 'Error' });
        // setLoader(false);
      }
      reset()
    } catch (error) {
      console.error('Error while adding machine shop:', error)
      setLoader(false)
    }
  }

  const columns = [
    {
      name: 'Sr. No.',
      selector: (row: any) => row.id,
      sortable: true,
      width: '7rem',
    },
    {
      name: 'Order No.',
      selector: (row: any) => row.orderno,
      sortable: true,
    },
    {
      name: 'Part No.',
      selector: (row: any) => row.partno,
      sortable: true,
    },
    {
      name: 'Part Description',
      selector: (row: any) => row.partdescription,
      sortable: true,
    },
    {
      name: 'Op. No',
      selector: (row: any) => row.opno,
      sortable: true,
    },
    {
      name: 'Work Center',
      selector: (row: any) => row.workcenter,
      sortable: true,
    },
    {
      name: 'Batch Qty.',
      selector: (row: any) => row.batchqty,
      sortable: true,
    },
    {
      name: 'Start Time',
      selector: (row: any) => row.starttime,
      sortable: true,
    },
    {
      name: 'End Time',
      selector: (row: any) => row.endtime,
      sortable: true,
    },
    {
      name: 'Waiting Time',
      selector: (row: any) => row.waitingtime,
      sortable: true,
    },
  ]
  const data = [
    {
      id: '1',
      orderno: '2048413',
      partno: 'K25200100000',
      partdescription: 'SPINDLE 12K SK-40 SIEMENS',
      opno: '10',
      workcenter: 'MN01',
      batchqty: '9',
      starttime: '04/06/2024 7:37 AM',
      endtime: '04/06/2024 7:37 AM',
      waitingtime: '00:23:43',
    },
    {
      id: '2',
      orderno: '20047724',
      partno: 'L85200100000',
      partdescription: 'COLUMN_SIDE_PAD',
      opno: '20',
      workcenter: 'TR01',
      batchqty: '29',
      starttime: '04/06/2024 8:00 AM',
      endtime: '04/06/2024 8:00 AM',
      waitingtime: '00:32:45',
    },

  ]

  return (
    <>
      <ManageMachineShop
      // plannedProduction='+Add Planned Production'
      // updatePriority='+ Update Priority'
      // cellPlanned='+ Add Cell Planned Production'
      // importBtnTitle="Import"
      // exportBtnTitle="Format"
      />

      <Filter data={FilterArray.futureplusplanningFilter} />
      <DatePickerComman  
        btnText="Search"
        btnClass="font-bold p-10 flex items-center justify-center text-white bg-indigo-500 hover:bg-indigo-600 focus:ring-4 focus:ring-indigo-300 font-medium text-sm px-5 py-2 mb-2 focus:outline-none mt-2"
      />
     
      <ReusableTable columns={columns} data={data} />

    
    </>
  )
}

export default page
