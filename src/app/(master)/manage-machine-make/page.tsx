'use client'
import ManageMachineShop from '@/component/TableCommanHeader/TableCommanHeader'
import ActionButton from '@/component/actionButton/ActionButton'
import Filter from '@/component/higherOrderComponent/Filter/Filter'
import Input from '@/component/higherOrderComponent/input'
import Modal from '@/component/higherOrderComponent/modal/Modal'
import ReusableTable from '@/component/react-data-table/Table'
import ConfirmPop from '@/utils/ConfirmPop/ConfirmPop'
import FilterArray from '@/utils/FilterArray'
import { StatusColumn } from '@/utils/functions/commonFunction'
import { confirmationClose, confirmationOpen, openModal } from '@/utils/redux/features/reduxData'
import MultiSelect from '@/utils/selectBox/MultiSelect'
import SelectBox from '@/utils/selectBox/SelectBox'
import service from '@/utils/service/service'
import useFetchData from '@/utils/useFetchData/customFetchData'

import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
interface FormData {
  machineMake: string;
  status: any;
  manufacturingCountryId:any
}
const page = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    setError,
    control,
  } = useForm<FormData>()
  const { data, loading, updateData, addData, deleteItem, getItemById } = useFetchData(service?.API_URL?.machineMake.listing);
  const confirmationModal = useSelector((state: any) => state.isConfirmation)

  const dispatch = useDispatch()
  const openAddModal = useSelector((state: any) => state.isModalOpen)
  const [machineMakeId, setMachineMakeId] = useState('')

  const columns = [
    {
      name: 'Sr. No.',
      selector: (row: any) => row.id,
      sortable: true,
      width: '7rem',
    },
    {
      name: 'Machine Make',
      selector: (row: any) => row.machineMake,
      sortable: true,
    },
    {
      name: 'Manufacturing Country',
      selector: (row: any) => row.manufacturingCountry,
      sortable: true,
    },
    {
      name: 'Status',
      selector: (row: any) => <StatusColumn row={row} />,

      sortable: true,
    },
    {
      name: 'Action',
      selector: (row: any) => {
        return <ActionButton edit history deleteAction
          onClick={() => handleEdit(row?.machineMakeId)}
          handleConfirmDelete={() => handleOpenDelete(row?.machineMakeId)}
        />
      },
      sortable: false,
      width: '7rem',
    },
  ]


  const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
    const body = {
      ...data,
      machineMakeId: machineMakeId ? machineMakeId : 0,
      isDelete: false,
      manufacturingCountry:data.manufacturingCountry.toString()
    }
    if (machineMakeId) {
      await updateData(body, service?.API_URL?.machineMake.update, reset)
    } else {
      await addData(body, service?.API_URL?.machineMake.add, reset)
    }
  }

  const handleEdit = async (id: any) => {

    try {
      setMachineMakeId(id)
      const editMachineRes: any = await getItemById(id, service.API_URL.machineMake.getbyid);
      if (editMachineRes) {
        dispatch(openModal());
        Object.keys(editMachineRes).forEach((key) => {
          setValue(key as keyof FormData, editMachineRes[key]);
        });

      } else {
        // Handle the case where apiStatus is false
        console.error('API call was not successful:', editMachineRes)
        // You can set some error state here if needed
      }
    } catch (error) {
      // Handle the error
      // You can set some error state here if needed
    } finally {
    }
    // Perform your edit actions here
  }
  const handleOpenDelete = async (id: any) => {
    setMachineMakeId(id)
    dispatch(confirmationOpen())
  }
  const handleConfirmDelete = async () => {
    if (machineMakeId) {
      await deleteItem(machineMakeId)
    }
  }
  return (
    <>

      <ManageMachineShop
        addBtnTitle="Add Machine Make"
        importBtnTitle="Import"
        exportBtnTitle="Export"
      />
      <Filter data={FilterArray.manageMachineMake} />

      <ReusableTable columns={columns} data={data||[]} />

      <Modal
        mdlTitle="Add Machine Make"
        btnSubmit="Save"
        openAddModal={openAddModal}
        onSubmit={handleSubmit(onSubmit)}
        body={
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label htmlFor="inputText3" className="block text-gray-700">
                Machine Make <span className="text-red-500">*</span>
              </label>
              <Input
                type="text"
                className="block w-full px-3 py-2 border rounded mt-2"
                {...register('machineMake', {
                  required: true,
                })}
              />
              {errors.machineMake && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>

            <div>
              <label htmlFor="inputText3" className="block text-gray-700">
                Manufacturing Country<span className="text-red-500">*</span>
              </label>
          
               <MultiSelect
                name="manufacturingCountry"
                options={[{ value: 'india', label: 'India' }]}
                isMulti={false}
                control={control}
                errors={errors}
              />
            </div>

            <div>
              <label htmlFor="inputText3" className="block text-gray-700">
                Status
              </label>
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  {...register('status')}
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
        title="Are you sure want delete?"
        footerButton={{ closeText: "No", confirmText: 'Yes' }}
      />
    </>
  )
}

export default page
