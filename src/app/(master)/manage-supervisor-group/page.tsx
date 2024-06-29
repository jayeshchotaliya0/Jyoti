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
import MultiSelect from '@/utils/selectBox/MultiSelect'
import SelectBox from '@/utils/selectBox/SelectBox'
import service from '@/utils/service/service'
import useFetchData from '@/utils/useFetchData/customFetchData'

import React, { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
interface FormData {
  supervisoursGroupName: string
  status: any
  supervisorIds:any
}
const page = () => {
  const openAddModal = useSelector((state: any) => state.isModalOpen)
  const[supervisorId,setSupervisorId]=useState<any>()
  const { data,listData,addData, getListData, updateData,deleteItem, getItemById } = useFetchData(service?.API_URL?.supervisoursGroup.listing);
  const confirmationModal = useSelector((state: any) => state.isConfirmation)

const dispatch=useDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors }, control,
    setValue,
    reset
  } = useForm<FormData>()
  const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
    const body = {
      ...data,
      supervisorGroupId: supervisorId ? supervisorId : 0,
      isDelete: false,
      
    }
    if (supervisorId) {
      await updateData(body, service?.API_URL?.supervisoursGroup.update,reset)
    } else {
      await addData(body, service?.API_URL?.supervisoursGroup.add,reset)
    }
  }

  const handleEdit = async (id: any) => {
    
    try {
      setSupervisorId(id)
      const editMachineRes: any = await getItemById(id, service.API_URL.supervisoursGroup.getbyid);
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
  const columns = [
    {
      name: 'Sr. No.',
      selector: (row: any) => row.id,
      sortable: true,
      width: '7rem',
    },
    {
      name: 'Group Name',
      selector: (row: any) => row.supervisorGroupName,
      sortable: true,
    },
    {
      name: 'Supervisor',
      selector: (row: any) => <>
      {
        row.supervisors.map((item:any)=>{
          return(
            <span className="bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300">{item?.firstName + ' ' + item?.lastName}</span>

          )
        })
      }
      </>,
      sortable: true,
    },
    {
      name: 'Status',
      selector: (row: any) => <StatusColumn row={row} />,
      sortable: true,
      width: '10rem',
    },
    {
      name: 'Action',
      selector: (row:any) => {
        return <><ActionButton edit history deleteAction
        onClick={() => handleEdit(row?.supervisorGroupId)}
        handleConfirmDelete={()=>handleOpenDelete(row?.supervisorGroupId)}
        /> </>
      },
      sortable: false,
      width: '10rem',
    },
  ]
  const handleOpenDelete=async(id:any)=>{
    setSupervisorId(id)
    dispatch(confirmationOpen())
  }
  const handleConfirmDelete=async()=>{
    if (supervisorId) {
      await deleteItem(supervisorId)
    }
  }
  const modalListing = async () => {
    const apiUrls :any= {
      employees: service?.API_URL?.employees?.listing,
      
    };
    await getListData(apiUrls);
  };

  useEffect(() => {
    if (openAddModal) {
      modalListing();
    }
  }, [openAddModal]);
  const options = listData?.employees?.map(v => ({
    value: v.empId,
    label: v?.firstName + ' ' + v?.lastName
  }));

  return (
    <div>
      <ManageMachineShop
        addBtnTitle="Add Supervisor Group"
        importBtnTitle="Import"
        exportBtnTitle="Export"
      />
      <Filter data={FilterArray.supervisorGroupFilter} />

      <ReusableTable columns={columns} data={data} />

      <Modal
        mdlTitle="Add Supervisor Group"
        btnSubmit="Save"
        openAddModal={openAddModal}
        onSubmit={handleSubmit(onSubmit)}
        body={
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label htmlFor="supervisoursGroupName" className="block text-gray-700">
                Supervisor Group Name <span className="text-red-500">*</span>
              </label>
              <input
                {...register('supervisoursGroupName', {
                  required: 'This field is required',
                })}
                id="supervisoursGroupName"
                type="text"
                className="block w-full px-3 py-2 border rounded mt-2"
              />
              {errors?.supervisoursGroupName?.message && (
                <span className="text-red-500">
                  {errors?.supervisoursGroupName?.message}
                </span>
              )}
            </div>
            <div>
              <label htmlFor="supervisorGroupName" className="block text-gray-700">
                Supervisor Name <span className="text-red-500">*</span>
              </label>
          
               <MultiSelect
                name="supervisorIds"
                options={options}
                isMulti={true}
                control={control}
                required
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
          onClose={() =>dispatch(confirmationClose())}
          onClickInChild={handleConfirmDelete}
          title="Are you sure want to go with the following implementation?"
          footerButton={{closeText:"No",confirmText:'Yes'}}
      />
    </div>
  )
}

export default page