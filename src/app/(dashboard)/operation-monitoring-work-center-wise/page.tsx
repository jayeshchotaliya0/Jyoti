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
      name: '',
      selector: (row: any) => row.id,
      sortable: true,
      width: '7rem',
    },
    {
      name: 'Work Center',
      selector: (row: any) => row.workcenter,
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
      name: 'Planned SKU',
      selector: (row: any) => row.plannedsku,
      sortable: true,
      width: '15rem',
    },
    {
      name: 'Planned Qty.',
      selector: (row: any) => row.plannedqty,
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
      name: 'Actual SKU',
      selector: (row: any) => row.actualsku,
      sortable: true,
      width: '10rem',
    },
    {
      name: 'Actual Qty',
      selector: (row: any) => row.actualqty,
      sortable: true,
      width: '10rem',
    },
    {
      name: 'Achievement Based On Plan(%)',
      selector: (row: any) => row.achievementbasedonplan,
      sortable: true,
      width: '15rem',
    },
    {
      name: 'Advance SKU',
      selector: (row: any) => row.advancesku,
      sortable: true,
      width: '10rem',
    },
    {
      name: 'Advance Qty',
      selector: (row: any) => row.advanceqty,
      sortable: true,
      width: '10rem',
    },
    {
      name: 'Achievement Based On Actual(%)',
      selector: (row: any) => row.achievementbasedonactual,
      sortable: true,
      width: '15rem',
    },
    {
      name: 'Status',
      selector: (row: any) => <StatusColumn row={row} />,
      sortable: true

    },
    {
      name: 'Action',
      selector: () => {
        return <><ActionButton edit history deleteAction /> </>
      },
      sortable: false,
      width: '10rem',
    },
  ]
  const data = [
    {
      id: '+',
      workcenter: 'AZ01',
      workcentername: 'AX-300',
      plannedsku: '0',
      plannedqty: '0',
      plannedloadingtime: '19 hrs',
      actualsku: '0',
      actualqty: '0',
      achievementbasedonplan: '0',
      advancesku: '0',
      advanceqty: '0',
      achievementbasedonactual: '0',
      status: 'Active',
    },
    {
      id: '+',
      workcenter: 'AZ01',
      workcentername: 'AX-300',
      plannedsku: '3',
      plannedqty: '110.36',
      plannedloadingtime: '18 Hrs 24 Min',
      actualsku: '0',
      actualqty: '0',
      achievementbasedonplan: '0',
      advancesku: '1',
      advanceqty: '25',
      achievementbasedonactual: '46.7',
      status: 'Active',
    },
  ]

  return (
    <>
      <ManageMachineShop
        importBtnTitle="Export"
      />
      <Filter data={FilterArray.operationmonitoringFilter} />
      <ReusableTable columns={columns} data={data} />
    </>
  )
}

export default page