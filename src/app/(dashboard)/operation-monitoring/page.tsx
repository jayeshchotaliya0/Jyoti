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

interface FormData {
  machineShop: string
  shift: any
  machineShopLine: any
  machineCategory: any
  workCenterName: any
  workCenterDesc: any
  workCenterType: any
  asstManager: any
  supervisorGroup: any
  cycleTimeSplitter: any
  cycleTimeSplitterSimulator: any
  status: any
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
      width: '10rem',
    },
    {
      name: 'Work Center Name',
      selector: (row: any) => row.workcentername,
      sortable: true,
      width: '15rem',
    },
    {
      name: 'Operation No.',
      selector: (row: any) => row.operationno,
      sortable: true,
      width: '15rem',
    },
    {
      name: 'Part No./Part Name',
      selector: (row: any) => row.partnopartname,
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
      name: 'Planned End  Time',
      selector: (row: any) => row.plannedendtime,
      sortable: true,
      width: '15rem',
    },
    {
      name: 'Actual Setup Start',
      selector: (row: any) => row.actualsetupstart,
      sortable: true,
      width: '15rem',
    },
    {
      name: 'Actual Setup End',
      selector: (row: any) => row.actualsetupend,
      sortable: true,
      width: '15rem',
    },
    {
      name: 'Setup Status',
      selector: (row: any) => row.setupstatus,
      sortable: true,
      width: '15rem',
    },
    {
      name: 'Operation Status',
      selector: (row: any) => row.operationstatus,
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
      name: 'Planned Qty.(Report Date)',
      selector: (row: any) => row.plannedqtyreportdate,
      sortable: true,
      width: '15rem',
    },
    {
      name: 'Planned Loading Time',
      selector: (row: any) => row.plannedloadingtime,
      sortable: true,
      width: '15rem',
    },
    {
      name: 'Produced Qty.',
      selector: (row: any) => row.producedqty,
      sortable: true,
      width: '15rem',
    },
    {
      name: 'Good Qty.',
      selector: (row: any) => row.goodqty,
      sortable: true,
    },
    {
      name: 'Scrap Qty.',
      selector: (row: any) => row.scrapqty,
      sortable: true,
    },
    {
      name: 'Plan/Advanced',
      selector: (row: any) => row.planadvanced,
      sortable: true,
      width: '15rem',
    },
    {
      name: 'Status',
      selector: (row: any) =>  <StatusColumn row={row} />,
      sortable: true

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
      id: 'A',
      orderno: '2039',
      workcentername: 'QC05-QC05',
      operationno: '50',
      partnopartname: 'T101300600-BODY',
      plannedstarttime: '13/06/2024 5:25 PM',
      plannedendtime: '13/06/2024 5:25 PM',
      actualsetupstart: '13/06/2024 5:25 PM',
      actualsetupend: '13/06/2024 5:25 PM',
      setupstatus: 'Completed',
      operationstatus: 'Completed',
      actualstarttime: '13/06/2024 5:25 PM',
      actualendtime: '13/06/2024 5:25 PM',
      plannedqtyreportdate: '0.00',
      plannedloadingtime: '',
      producedqty: '8',
      goodqty: '20',
      scrapqty: '0',
      planadvanced: 'Advanced',
      status: 'Active',
    },
    {
      id: 'B',
      orderno: '2038',
      workcentername: 'QC05-QC05',
      operationno: '10',
      partnopartname: 'T101300600-BODY',
      plannedstarttime: '13/06/2024 5:25 PM',
      plannedendtime: '13/06/2024 5:25 PM',
      actualsetupstart: '13/06/2024 5:25 PM',
      actualsetupend: '13/06/2024 5:25 PM',
      setupstatus: 'Pending',
      operationstatus: 'Paused',
      actualstarttime: '13/06/2024 5:25 PM',
      actualendtime: '13/06/2024 5:25 PM',
      plannedqtyreportdate: '0.00',
      plannedloadingtime: '',
      producedqty: '20',
      goodqty: '8',
      scrapqty: '0',
      planadvanced: 'Advanced',
      status: 'Active',
    },
  ]

  return (
    <>
      <ManageMachineShop importBtnTitle="Export" />

      <Filter data={FilterArray.operationmonitoringFilter} />
      <div className="flex justify-between items-center my-2 bg-white h-12 p-3">
        <div className="flex gap-2">
          <button className="h-8 font-bold p-5 flex items-center justify-center text-white bg-indigo-500 hover:bg-indigo-600 focus:ring-4 focus:ring-indigo-300 font-medium text-sm px-5 py-2.5 focus:outline-none">
            Not Started
          </button>
          <button className="h-8 font-bold flex items-center justify-center text-white bg-teal-500 hover:bg-teal-600 focus:ring-4 focus:ring-teal-300 font-medium text-sm px-5 py-2.5 focus:outline-none">
            Early Started
          </button>
          <button className="h-8 font-bold flex items-center justify-center text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:ring-teal-300 font-medium text-sm px-5 py-2.5 focus:outline-none">
            Late Started
          </button>
          <button className="h-8 font-bold flex items-center justify-center text-white bg-teal-500 hover:bg-teal-600 focus:ring-4 focus:ring-teal-300 font-medium text-sm px-5 py-2.5 focus:outline-none">
            Early Finished
          </button>
          <button className="h-8 font-bold flex items-center justify-center text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:ring-teal-300 font-medium text-sm px-5 py-2.5 focus:outline-none">
            Late Finished
          </button>
        </div>
        <div className="flex gap-2">
          <button className="h-8 font-bold flex items-center justify-center text-white bg-teal-500 hover:bg-teal-600 focus:ring-4 focus:ring-teal-300 font-medium text-sm px-5 py-2.5 focus:outline-none">
            Planned
          </button>
          <button className="h-8 font-bold flex items-center justify-center text-white bg-teal-500 hover:bg-teal-600 focus:ring-4 focus:ring-teal-300 font-medium text-sm px-5 py-2.5 focus:outline-none">
            Advance
          </button>
        </div>
      </div>
      <ReusableTable columns={columns} data={data} />
    </>
  )
}

export default page
