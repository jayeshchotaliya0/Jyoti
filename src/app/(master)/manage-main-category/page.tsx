'use client'
import ManageMachineShop from '@/component/TableCommanHeader/TableCommanHeader'
import ActionButton from '@/component/actionButton/ActionButton'
import Filter from '@/component/higherOrderComponent/Filter/Filter'
import Modal from '@/component/higherOrderComponent/modal/Modal'
import ReusableTable from '@/component/react-data-table/Table'
import ConfirmPop from '@/utils/ConfirmPop/ConfirmPop'
import FilterArray from '@/utils/FilterArray'
import { StatusColumn } from '@/utils/functions/commonFunction'
import { confirmationClose, confirmationOpen, openModal } from '@/utils/redux/features/reduxData'
import service from '@/utils/service/service'
import useFetchData from '@/utils/useFetchData/customFetchData'
import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'

interface FormData {
  maincategory: string
  status: any
}

interface RowData {
  id: number
  status: boolean
  [key: string]: any
}

interface Row {
  id: number
  status: boolean
}

const page = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    setError,
  } = useForm<FormData>()
  const dispatch = useDispatch()
  const openAddModal = useSelector((state: any) => state.isModalOpen)
  const [loader, setLoader] = useState(false)
  const [machineMainId, setMachineMainId] = useState('')
  const [manageMainCategory, setManageMainCategory] = useState<RowData[]>([])
  const { data, addData, updateData, deleteItem } = useFetchData(service?.API_URL?.maincategories?.listing);
  const confirmationModal = useSelector((state: any) => state.isConfirmation)



  const handleStatusChange = (id: number) => {
    setManageMainCategory(
      manageMainCategory.map((row) =>
        row.id === id ? { ...row, status: !row.status } : row,
      ),
    )
  }

  const columns = [
    {
      name: 'Sr.No',
      selector: (row: any) => row.machineMainCategoryId,
      sortable: true,
      width: '7rem',
    },
    {
      name: 'Main Category',
      selector: (row: any) => row.mainCategory,
      sortable: true,
      width: '70rem',
    },
    {
      name: 'Status',
      selector: (row: Row) => (
        <StatusColumn row={row} onStatusChange={handleStatusChange} />
      ),
      sortable: true,
    },
    {
      name: 'Action',
      selector: (row: any) => {
        return <ActionButton edit history
          onClick={() => handleEdit(row?.machineMainCategoryId)}
          handleConfirmDelete={()=>handleOpenDelete(row?.machineMainCategoryId)}
        />
      },
      sortable: false,
      width: '7rem',
    },
  ]

  const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {

    const body = {
      machineMainCategoryId: machineMainId ? machineMainId : 0,
      ...data,
      isDelete: false,
    }

    if (machineMainId) {
      await updateData(body, service?.API_URL?.maincategories.update, reset)
    } else {
      await addData(body, service?.API_URL?.maincategories?.add, reset)
    }
  }

  const handleEdit = async (id: any) => {
    dispatch(openModal());
    setMachineMainId(id)
    try {
      const editMachineRes: any = await service.makeAPICall({
        methodName: service.Methods.GET,
        apiUrl: service?.API_URL?.maincategories?.getbyid,
        query: { id: id },
      })

      setLoader(true)

      if (editMachineRes?.apiStatus) {
        setLoader(false)
        setValue('maincategory', editMachineRes?.apiData?.mainCategory)
        setValue('status', editMachineRes?.apiData?.status)
      } else {
        console.error('API call was not successful:', editMachineRes)
      }
    } catch (error) {
      // Handle the error
      console.error('An error occurred while fetching the shop list:', error)
      // You can set some error state here if needed
    } finally {
      setLoader(false) // Ensure the loader is turned off
    }
  }
  const handleOpenDelete = async (id: any) => {
    setMachineMainId(id)
    dispatch(confirmationOpen())
  }
  const handleConfirmDelete = async () => {
    if (machineMainId) {
      await deleteItem(machineMainId)
    }
  }
  return (
    <>
      <ManageMachineShop
        title="Manage line"
        addBtnTitle="Add Main Category"
        importBtnTitle="Import"
        exportBtnTitle="Export"
      />
      <Filter data={FilterArray.machineManageMainCategory} />
      <ReusableTable columns={columns} data={data} />
      <Modal
        mdlTitle={`${machineMainId ? 'Edit' : 'Add'} Main Category`}
        btnSubmit="Save"
        openAddModal={openAddModal}
        onSubmit={handleSubmit(onSubmit)}
        body={
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label htmlFor="inputText3" className="block text-gray-700">
                Main Category <span className="text-red-500">*</span>
              </label>
              <input
                {...register('maincategory', {
                  required: 'This field is required',
                })}
                id="inputText3"
                type="text"
                className="block w-full px-3 py-2 border rounded mt-2"
              />
              {errors?.maincategory?.message && (
                <span className="text-red-500">
                  {errors?.maincategory?.message}
                </span>
              )}
            </div>

            <div>
              <label htmlFor="inputText3" className="block text-gray-700">
                Status
              </label>
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  {...register('status', {})}
                  className="sr-only peer"
                />
                <div className="relative w-11 h-6 mt-5 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
              </label>
            </div>
          </div>
        }
      />
      <ConfirmPop
        isOpen={confirmationModal}
        headingText='Confirmation'
        onClose={() => dispatch(confirmationClose())}
        onClickInChild={handleConfirmDelete}
        title="Are you sure want to go delete ?"
        footerButton={{ closeText: "No", confirmText: 'Yes' }}
      />
    </>
  )
}

export default page
