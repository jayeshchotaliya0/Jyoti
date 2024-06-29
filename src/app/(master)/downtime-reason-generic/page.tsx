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
import SelectBox from '@/utils/selectBox/SelectBox'
import service from '@/utils/service/service'
import useFetchData from '@/utils/useFetchData/customFetchData'

import React, { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'

interface FormData {
  downtimeReason: any;
  downtimeReasonCode:any;
  downWorkCenter:any;
  downtimeCategoryId:any;
  status: any
}
const page = () => {
  const { data,addData,updateData,getListData,listData,getItemById,deleteItem } = useFetchData(service?.API_URL?.downTimeReason.listing);
  const dispatch = useDispatch()
  const [downtimeCategoryId, setDowntimeCategoryId] = useState<any>()
  const openAddModal = useSelector((state: any) => state.isModalOpen)
  const confirmationModal = useSelector((state: any) => state.isConfirmation)

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    control,
    reset ,
    getValues
  } = useForm<FormData>()
  const handleStatusChange = (id: number) => {
    
  }
  const columns = [
    {
      name: 'Sr. No.',
      selector: (row: any) => row.id,
      sortable: true,
      width: '7rem',
    },
    {
      name: 'Downtime Reason',
      selector: (row: any) => row.downtimeReason,
      sortable: true,
      width: '25rem',
    },
    {
      name: 'Code',
      selector: (row: any) => row.downtimeReasonCode,
      sortable: true,
      width: '10rem',
    },
    {
      name: 'Downtime Category',
      selector: (row: any) => row.downTimeCategory,
      sortable: true,
      width: '20rem',
    },
    {
      name: 'Down work center',
      selector: (row: any) => <StatusColumn row={row} onStatusChange={handleStatusChange} />
      ,
      sortable: true,
    },
    {
      name: 'Status',
      selector: (row: any) =>  <StatusColumn row={row} onStatusChange={handleStatusChange} />,
      sortable: true,
    },
    {
      name: 'Action',
      selector: (row:any) => {
        return <ActionButton edit history deleteAction
        onClick={() => handleEdit(row?.downtimeCategoryReasonId)}
        handleConfirmDelete={()=>handleOpenDelete(row?.downtimeCategoryReasonId)}
        />
      },
      sortable: false,
      width: '7rem',
    },
  ]

  const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
    const body = {
      ...data,
      downWorkCenter:data.downWorkCenter==='yes'?true:false,
      downtimeCategoryReasonId: downtimeCategoryId ? downtimeCategoryId : 0,
      isDelete: false,
    }
    if (downtimeCategoryId) {
      await updateData(body, service?.API_URL?.downTimeReason.update,reset)
      
    } else {
      await addData(body, service?.API_URL?.downTimeReason.add,reset)
    }
  }
  const handleOpenDelete=async(id:any)=>{
    setDowntimeCategoryId(id)
    dispatch(confirmationOpen())
  }
  const handleConfirmDelete=async()=>{
    if (downtimeCategoryId) {
      await deleteItem(downtimeCategoryId)
    }
  }
  const modalListing = async () => {
    const apiUrls = {
      downTimeCategory: service?.API_URL?.downTimeCategory.listing,
    };
    await getListData(apiUrls);
  };
  const handleEdit = async (id: any) => {
    
    try {
      setDowntimeCategoryId(id)
      const editMachineRes: any = await getItemById(id, service.API_URL.downTimeReason.getbyid);
      if (editMachineRes) {
        dispatch(openModal());
        Object.keys(editMachineRes).forEach((key) => {
          setValue(key as keyof FormData, editMachineRes[key]);
          
        });
      setValue('downWorkCenter',editMachineRes.downWorkCenter==true ?'yes':'no')
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
  useEffect(() => {
    if (openAddModal) {
      modalListing();
    }
  }, [openAddModal]);
  return (
    <>
      <ManageMachineShop
        addBtnTitle="Add Downtime Reason"
        importBtnTitle="Import"
        exportBtnTitle="Export"
      />
      <Filter data={FilterArray.ManageDowntownReason} />
      <ReusableTable columns={columns} data={data || []} />
      <Modal
        mdlTitle="Add Downtime Reason"
        btnSubmit="Save"
        openAddModal={openAddModal}
        onSubmit={handleSubmit(onSubmit)}
        body={
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label htmlFor="inputText3" className="block text-gray-700">
                Downtime Reason <span className="text-red-500">*</span>
                </label>
                <input
                  {...register('downtimeReason', {
                    required: 'This field is required',
                  })}
                  id="inputText3"
                  type="text"
                  className="block w-full px-3 py-2 border rounded mt-2"
                />
                {errors?.downtimeReason?.message && (
                  <span className="text-red-500">
                    {errors?.downtimeReason?.message}
                  </span>
                )}
              </div>
              <div>
                <label htmlFor="inputText3" className="block text-gray-700">
                  Downtime Category <span className="text-red-500">*</span>
                </label>
                <SelectBox
                  list={listData.downTimeCategory}
                  keyField="downtimeCategoryId"
                  valueField="downtimeCategoryName"
                  name="downtimeCategoryId"
                  control={control}
                  errors={errors}
                  className="block w-full px-3 py-2.5 border bg-white rounded mt-2"
                />
              </div>
              <div>
                <label htmlFor="inputText3" className="block text-gray-700">
                Code <span className="text-red-500">*</span>
                </label>
                <input
                  {...register('downtimeReasonCode', {
                    required: 'This field is required',
                  })}
                  id="inputText3"
                  type="text"
                  className="block w-full px-3 py-2 border rounded mt-2"
                />
                {errors?.downtimeCategoryId?.message && (
                  <span className="text-red-500">
                    {errors?.downtimeCategoryId?.message}
                  </span>
                )}
              </div>
              <div>
                <label htmlFor="inputText3" className="block text-gray-700">
                  Down work center
                </label>
                <div>
        <input
          id="red-radio"
          type="radio"
          value="yes"
          {...register('downWorkCenter', { required: 'This field is required' })}
          className="w-4 h-4 bg-gray-100 border-gray-300"
        />
        <label
          htmlFor="red-radio"
          className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          Yes
        </label>

        <input
          id="no-radio"
          type="radio"
          value={"no"}
          {...register('downWorkCenter', { required: 'This field is required' })}
          className="w-4 h-4 ml-5 bg-gray-100 border-gray-300"
        />
        <label
          htmlFor="no-radio"
          className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          No
        </label>

        {errors.downWorkCenter && (
          <p className="text-red-500 text-sm mt-1">{errors?.downWorkCenter.message}</p>
        )}
      </div>
              </div>
              <div>
                <label htmlFor="inputText3" className="block text-gray-700">
                  Status
                </label>
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    {...register('status',)}
                    className="sr-only peer"
                  />
                  <div className="relative w-11 h-6 mt-4 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                </label>
              </div>
            </div>
        }
      />
       <ConfirmPop  
          isOpen={confirmationModal}
          headingText='Confirmation'
          onClose={() =>dispatch(confirmationClose())}
          onClickInChild={handleConfirmDelete}
          title="Are you sure want to go with the following implementation?"
          footerButton={{closeText:"No",confirmText:'Yes'}}
      />
    </>
  )
}

export default page
