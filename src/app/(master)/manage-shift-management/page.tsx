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
import SelectBox from '@/utils/selectBox/SelectBox';
import service from '@/utils/service/service';
import useFetchData from '@/utils/useFetchData/customFetchData';

import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
interface FormData {
    id: string;
    shiftName: string;
    firstShift: string;
    startTime: string;
    endTime: string;
    status: boolean;
    control: string;
    hrShiftCode:string;
}

const page = () => {
    const openAddModal = useSelector((state: any) => state.isModalOpen)
    const confirmationModal = useSelector((state: any) => state.isConfirmation)

    const { data, addData, updateData, deleteItem, getItemById }: any = useFetchData(service?.API_URL?.shiftManagement?.listing)
    const [shiftId, setShiftId] = useState<any>()
    const dispatch = useDispatch()
    const { register, handleSubmit, formState: { errors }, control, reset, setValue } = useForm<FormData>();

 
    const columns = [
        {
            name: 'Sr. No.',
            selector: (row: any) => row.id,
            sortable: true,
            width: '7rem'
        },
        {
            name: 'Shift Name',
            selector: (row: any) => row.shiftName,
            sortable: true,
        },
        {
            name: 'Shift Start Time',
            selector: (row: any) => row.startTime,
            sortable: true,
            width: '12rem',
        },
        {
            name: 'Shift End Time',
            selector: (row: any) => row.endTime,
            sortable: true,
            width: '12rem',
        },
        {
            name: 'Shift Duration',
            selector: (row: any) => row.shiftDuration,
            sortable: true,
            width: '12rem',
        },
        {
            name: 'Shift Working Duration',
            selector: (row: any) => row.workingDuration,
            sortable: true,
            width: '15rem',
        },
        {
            name: 'HR Shift Code',
            selector: (row: any) => row.hrShiftCode,
            sortable: true,
            width: '12rem',
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
                return (<ActionButton edit history deleteAction 
                    onClick={() => handleEdit(row?.shiftId)}
                    handleConfirmDelete={() => handleOpenDelete(row?.shiftId)}
                />)
            },
            width: '7rem',
            sortable: false,

        },
    ];
    const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
        const startTimeWithSeconds = shiftId ? data.startTime :`${data.startTime}:00`;
        const endTimeWithSeconds =  shiftId ? data.endTime: `${data.endTime}:00`;
        console.log("shiftId",shiftId)
        const body = {
            ...data,
            shiftId: shiftId ? shiftId : 0,
            isDelete: false,
            startTime:startTimeWithSeconds,
            endTime:endTimeWithSeconds
        }
        if (shiftId) {
            await updateData(body, service?.API_URL?.shiftManagement.update, reset)
        } else {
            await addData(body, service?.API_URL?.shiftManagement.add, reset)
        }
    }

    const handleEdit = async (id: any) => {

        try {
            setShiftId(id)
            const editMachineRes: any = await getItemById(id, service.API_URL.shiftManagement.getbyid);
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
        setShiftId(id)
        dispatch(confirmationOpen())
    }
    const handleConfirmDelete = async () => {
        if (shiftId) {
            await deleteItem(shiftId)
        }
    }
    return (
        <>
            <ManageMachineShop
                addBtnTitle="Add Shift Management"
                importBtnTitle="Import"
                exportBtnTitle="Export"
            />
            <Filter data={FilterArray.shiftManagementFilter} />

            <ReusableTable
                columns={columns}
                data={data}
            />

            <Modal
                mdlTitle="Add Manage Shift"
                btnSubmit="Save"
                openAddModal={openAddModal}
                onSubmit={handleSubmit(onSubmit)}
                body={
                    <div className="grid grid-cols-3 gap-4">
                        <div>
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
                        </div>
                        <div>
                            <label htmlFor="hrShiftCode" className="block text-gray-700">
                                HR Shift Code <span className="text-red-500">*</span>
                            </label>
                            <input
                                {...register('hrShiftCode', {
                                    required: 'This field is required',
                                })}
                                id="hrShiftCode"
                                type="text"
                                className="block w-full px-3 py-2 border rounded mt-2"
                            />
                              {errors?.hrShiftCode?.message && (
                                <span className="text-red-500">
                                    {errors?.hrShiftCode?.message}
                                </span>
                            )}
                        </div>

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
                headingText='Confirmation'
                onClose={() => dispatch(confirmationClose())}
                onClickInChild={handleConfirmDelete}
                title="Are you sure want delete ?"
                footerButton={{ closeText: "No", confirmText: 'Yes' }}
            />
        </>)
}

export default page
