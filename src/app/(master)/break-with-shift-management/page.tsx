'use client'
import ManageMachineShop from '@/component/TableCommanHeader/TableCommanHeader';
import ActionButton from '@/component/actionButton/ActionButton';
import Filter from '@/component/higherOrderComponent/Filter/Filter';
import Modal from '@/component/higherOrderComponent/modal/Modal';
;
import ReusableTable from '@/component/react-data-table/Table';
import ConfirmPop from '@/utils/ConfirmPop/ConfirmPop';
import FilterArray from '@/utils/FilterArray';
import { confirmationClose, confirmationOpen, openModal } from '@/utils/redux/features/reduxData';
import service from '@/utils/service/service';
import useFetchData from '@/utils/useFetchData/customFetchData';

import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
interface FormData {
    id: string;
    breakName: string;
    // shiftName: string;
    startTime: string;
    endTime: string;
    status: boolean;
}
const page = () => {
    const { 
        register, 
        handleSubmit, 
        setValue,
        reset,
        formState: { errors } 
    } = useForm<FormData>();
    const dispatch = useDispatch();
    const[loader,setLoader]=useState(false)
    const[breakMasterId,setBreakMasterId] = useState(false);
    const[deleteId,setDeleteId] = useState(false);
    const confirmationModal = useSelector((state: any) => state.isConfirmation)
    const openAddModal = useSelector((state: any) => state.isModalOpen)
    const { data ,loading, error, addData, updateData,deleteItem} = useFetchData(service?.API_URL?.breakWithShiftManagement.listing);

    

    const columns = [
        {
            name: 'Sr. No.',
            selector: (row: any,index:number) => index+1,
            sortable: true,
            width: '7rem'
        },
        {
            name: 'Break Name',
            selector: (row: any) => row.breakName,
            sortable: true,
             width: '15rem'
        },
        {
            name: 'Start Time',
            selector: (row: any) => row.breakFrom,
            sortable: true,
            width: '10rem'
        },
        {
            name: 'End Time',
            selector: (row: any) => row.breakTo,
            sortable: true,
            width: '10rem'
        },
        {
            name: 'Duration',
            selector: (row: any) => row.duration,
            sortable: true,
            width: '40rem'

        },
        {
            name: 'Status',
            selector: (row: any) => <label className="inline-flex items-center cursor-pointer">
                <input type="checkbox" value="" className="sr-only peer" checked />
                <div className="relative w-11 h-6 mt-5 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
            </label>,
            sortable: true,
        },
        {
            name: 'Action',
            selector: (row:any) => {
                return (<ActionButton 
                    edit 
                    history 
                    deleteAction 
                    onClick={() => handleEdit(row?.breakMasterId)}
                    handleConfirmDelete={() => handleOpenDelete(row?.breakMasterId)}
                    />)
            },
            sortable: false,
            width: '7rem'

        },
    ];

    const handleEdit = async (id: any) => {
        try {
          dispatch(openModal())
          setBreakMasterId(id)
    
          const breakWithShiftMgtRes: any = await service.makeAPICall({
            methodName: service.Methods.GET,
            apiUrl: service.API_URL.managesubcategory.getbyid,
            query: { id: id },
          })
          setLoader(true)
    
          if (breakWithShiftMgtRes?.apiStatus) {
            setLoader(false);
            setValue('breakName', breakWithShiftMgtRes?.apiData?.breakName);    
            // setValue('shiftName', breakWithShiftMgtRes?.apiData?.shiftName);   
            setValue('startTime', breakWithShiftMgtRes?.apiData?.breakFrom); 
            setValue('endTime', breakWithShiftMgtRes?.apiData?.breakTo);    
          } 
          else 
          {
            console.error('API call was not successful:', breakWithShiftMgtRes)
          }
        } catch (error) {
          // Handle the error
          console.error('An error occurred while fetching the shop list:', error)
          // You can set some error state here if needed
        } finally {
          setLoader(false) // Ensure the loader is turned off
        }
    }
    
    const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
        const body = {
            breakMasterId: breakMasterId ? breakMasterId : 0,
            ...data,
        }
        if (breakMasterId) {
            await updateData(body, service?.API_URL?.breakWithShiftManagement?.update,reset)
            
        } else {
            await addData(body, service?.API_URL?.breakWithShiftManagement?.add,reset)
            
        }
    }

    const handleOpenDelete = async (id: any) => {
        setDeleteId(id);
        dispatch(confirmationOpen())
    }
    const handleConfirmDelete = async() => {
        

    if (deleteId) {
        await deleteItem(deleteId)
        // dispatch(confirmationClose())
    }
    }
    return (
        <>
            <ManageMachineShop
                addBtnTitle="Add Break With Shift Management"
                importBtnTitle="Import"
                exportBtnTitle="Export"
            />
            <Filter data={FilterArray.breakManagementFilter} />

            <ReusableTable
                columns={columns}
                data={data}
            />
            <Modal
                mdlTitle="Add Break with Shift"
                btnSubmit="Save"
                openAddModal={openAddModal}
                onSubmit={handleSubmit(onSubmit)}
                reset={reset}
                body={
                        <div className="grid grid-cols-3 gap-4">
                            <div>
                                <label htmlFor="breakName" className="block text-gray-700">
                                    Break Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    {...register('breakName', {
                                        required: 'This field is required',
                                    })}
                                    id="breakName"
                                    type="text"
                                    className="block w-full px-3 py-2 border rounded mt-2"
                                />
                                {errors?.breakName?.message && (
                                    <span className="text-red-500">
                                        {errors?.breakName?.message}
                                    </span>
                                )}
                            </div>
                            {/* <div>
                                <label htmlFor="shiftName" className="block text-gray-700">
                                    Shift Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    {...register('shiftName', {
                                        required: 'This field is required',
                                    })}
                                    id="shiftName"
                                    type="text"
                                    className="block w-full px-3 py-2 border rounded mt-2"
                                />
                                {errors?.shiftName?.message && (
                                    <span className="text-red-500">
                                        {errors?.shiftName?.message}
                                    </span>
                                )}
                            </div> */}
                            <div>
                                <label htmlFor="startTime" className="block text-gray-700">
                                    Start Time <span className="text-red-500">*</span>
                                </label>
                                <input
                                    {...register('startTime', {
                                        required: 'This field is required',
                                    })}
                                    id="startTime"
                                    type="time"
                                    className="block w-full px-3 py-2 border rounded mt-2"
                                />
                                {errors?.startTime?.message && (
                                    <span className="text-red-500">
                                        {errors?.startTime?.message}
                                    </span>
                                )}
                            </div>
                            <div>
                                <label htmlFor="endTime" className="block text-gray-700">
                                    End Time <span className="text-red-500">*</span>
                                </label>
                                <input
                                    {...register('endTime', {
                                        required: 'This field is required',
                                    })}
                                    id="endTime"
                                    type="time"
                                    className="block w-full px-3 py-2 border rounded mt-2"
                                />
                                {errors?.endTime?.message && (
                                    <span className="text-red-500">
                                        {errors?.endTime?.message}
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
        headingText="Confirmation"
        onClose={() => dispatch(confirmationClose())}
        onClickInChild={handleConfirmDelete}
        title="Are you sure want to go with the following implementation?"
        footerButton={{ closeText: 'No', confirmText: 'Yes' }}
      />

        </>
    )
}

export default page