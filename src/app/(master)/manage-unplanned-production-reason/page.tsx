'use client'
import ManageMachineShop from '@/component/TableCommanHeader/TableCommanHeader';
import ActionButton from '@/component/actionButton/ActionButton';
import Filter from '@/component/higherOrderComponent/Filter/Filter';
import Modal from '@/component/higherOrderComponent/modal/Modal';
;
import ReusableTable from '@/component/react-data-table/Table';
import ConfirmPop from '@/utils/ConfirmPop/ConfirmPop';
import FilterArray from '@/utils/FilterArray';
import { StatusColumn } from '@/utils/functions/commonFunction';
import { confirmationClose, confirmationOpen, openModal } from '@/utils/redux/features/reduxData';
import SelectBox from '@/utils/selectBox/SelectBox';
import service from '@/utils/service/service';
import useFetchData from '@/utils/useFetchData/customFetchData';

import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
interface FormData {
    reason: string
    status: any
}
const page = () => {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
        reset,
        control
    } = useForm<FormData>()

    const dispatch = useDispatch();
    const [unplnReasonId,setUnplnReasonId] = useState('')
    const [deletededId,setDeletededId] = useState('')
    const [loader, setLoader] = useState(false)
    const { data, loading, error,addData,updateData,getItemById} = useFetchData(service?.API_URL?.unPlannedprdReasons.listing);
    const openAddModal = useSelector((state: any) => state.isModalOpen);
    const confirmationModal = useSelector((state: any) => state.isConfirmation)
   
    const handleStatusChange = (id: number) => {
    
    }
    const columns = [
        {
            name: 'Sr. No.',
            selector: (row: any) => row.unplannedPrdReasonId,
            sortable: true,
            width: '7rem'
        },
        {
            name: 'Unplanned Production Reason',
            selector: (row: any) => row.reason,
            sortable: true,
            width: '75rem'

        },
        {
            name: 'Status',
            selector: (row: any) =>  <StatusColumn row={row} onStatusChange={handleStatusChange} />,

            sortable: true,
        },
        {
            name: 'Action',
            selector: (row:any) => {
                return (<ActionButton 
                    edit 
                    history 
                    deleteAction onClick={() => handleEdit(row?.unplannedPrdReasonId)} 
                    handleConfirmDelete={()=>handleOpenDelete(row?.unplannedPrdReasonId)}
                    />)
            },
            sortable: false,
            width: '7rem'

        },
    ];

    const handleOpenDelete=async(id:any)=>{
        setDeletededId(id);
        dispatch(confirmationOpen())
    }

    const handleConfirmDelete=()=>{
        dispatch(confirmationClose())
        console.log("dkfhdkfdk",deletededId);

    }

    const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
        const body = {
            unplannedPrdReasonId: unplnReasonId ? unplnReasonId : 0,
            ...data,
          }
      
          if (unplnReasonId) {
            await updateData(body, service?.API_URL?.unPlannedprdReasons    .update,reset)
            reset()
          } else {
            await addData(body, service?.API_URL?.unPlannedprdReasons?.add,reset)
            reset()
      
          }
    }

    const handleEdit = async (id: any) => {
        try {
            dispatch(openModal());
            setUnplnReasonId(id)
            const unPlannedprdRes = await getItemById(id,service?.API_URL?.unPlannedprdReasons.getbyid)
             setLoader(true)
          if (unPlannedprdRes) {
            setLoader(false) 
            setValue('reason', unPlannedprdRes?.reason)
            setValue('status', unPlannedprdRes?.status)
          } else {
            console.error('API call was not successful:')
          }
        } catch (error) {
          // Handle the error
          console.error('An error occurred while fetching the shop list:', error)
          // You can set some error state here if needed
        } finally {
          setLoader(false) // Ensure the loader is turned off
        }
    }

    return (
        <>
            <ManageMachineShop
                addBtnTitle="Add Unplanned Production reason"
                importBtnTitle="Import"
                exportBtnTitle="Export"
            />
            <Filter data={FilterArray.ManageUnplannedProductionReason} />
            <ReusableTable
                columns={columns}
                data={data}
            />

            <Modal
                mdlTitle="Add Unplanned Production Reason"
                btnSubmit="Save"
                openAddModal={openAddModal}
                onSubmit={handleSubmit(onSubmit)}
                body={
                        <div className="grid grid-cols-3 gap-4">

                            <div>
                                <label htmlFor="inputText3" className="block text-gray-700">
                                    Unplanned Production Reason <span className="text-red-500">*</span>
                                </label>
                                <input
                            {...register('reason', {
                                required: 'This field is required',
                            })}
                            id="grpName"
                            type="text"
                            className="block w-full px-3 py-2 border rounded mt-2"
                            />
                            {errors?.reason?.message && (
                            <span className="text-red-500">
                                {errors?.reason?.message}
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
          onClose={() =>dispatch(confirmationClose())}
          onClickInChild={handleConfirmDelete}
          title="Are you sure want to go with the following implementation?"
          footerButton={{closeText:"No",confirmText:'Yes'}}
      />
        </>)
}

export default page