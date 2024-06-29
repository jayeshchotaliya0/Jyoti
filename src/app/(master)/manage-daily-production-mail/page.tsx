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
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import DatePicker from "react-datepicker";

interface FormData {
    planningType: string;
    mails: string;
    planningRunning: string;
    startDateTime: string;
    endDateTime: string;
    status: boolean;
}

const page = () => {
    const openAddModal = useSelector((state: any) => state.isModalOpen)

    const confirmationModal = useSelector((state: any) => state.isConfirmation)

    const { data, addData, updateData, deleteItem, getItemById, getListData, listData } = useFetchData(service?.API_URL?.dailyProductionMail.listing);
    const { register, handleSubmit, formState: { errors }, reset, setValue, control } = useForm<FormData>();
    const [dailyProductionId, setDailyProductionId] = useState()
    const [startDate, setStartDate] = useState<any>(null);
    const [endDate, setEndDate] = useState<any>(null);
    const dispatch = useDispatch()
    const columns = [
        {
            name: 'Sr. No.',
            selector: (row: any) => row.id,
            sortable: true,
            width: '7rem'
        },
        {
            name: 'Planning Type',
            selector: (row: any) => row.planningType,
            sortable: true,
        },
        {
            name: 'Mails',
            selector: (row: any) => row.mails,
            sortable: true,
        },
        {
            name: 'Planning Running',
            selector: (row: any) => <>

                <label className="inline-flex items-center cursor-pointer">
                    <input type="checkbox" value="" className="sr-only peer" checked={row.planningRunning == true ? true : false} />
                    <div className="relative w-11 h-6 mt-5 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                </label>,
            </>,
            sortable: true,
        },
        {
            name: 'Plan Start Date',
            selector: (row: any) => row.startDateTime,
            sortable: true,
        },
        {
            name: 'Plan End Date',
            selector: (row: any) => row.endDateTime,
            sortable: true,
        },
        {
            name: 'Plan Duration',
            selector: (row: any) => row.PlanDuration,
            sortable: true,
        },
        {
            name: 'Status',
            selector: (row: any) => <label className="inline-flex items-center cursor-pointer">
                <input type="checkbox" value="" className="sr-only peer" checked />
                <div className="relative w-11 h-6 mt-5 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
            </label>,
            sortable: true,
            width: '10rem'

        },
        {
            name: 'Action',
            selector: (row: any) => {
                return (<ActionButton edit history deleteAction
                    onClick={() => handleEdit(row?.dmpLogId)}
                    handleConfirmDelete={() => handleOpenDelete(row?.dmpLogId)}
                />)
            },
            sortable: false,
            width: '7rem'

        },
    ];
    const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
        const body = {
            ...data,
            planningRunning:data.planningRunning=='yes'?true:false,
            dmpLogId: dailyProductionId ? dailyProductionId : 0,
            isDelete: false,
        }
        if (dailyProductionId) {
            await updateData(body, service?.API_URL?.dailyProductionMail.update, reset)
        } else {
            await addData(body, service?.API_URL?.dailyProductionMail.add, reset)
        }
    }

    const handleEdit = async (id: any) => {

        try {
            setDailyProductionId(id)
            const editMachineRes: any = await getItemById(id, service.API_URL.dailyProductionMail.getbyid);
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
        setDailyProductionId(id)
        dispatch(confirmationOpen())
    }
    const handleConfirmDelete = async () => {
        if (dailyProductionId) {
            await deleteItem(dailyProductionId)
        }
    }
    return (
        <>
            <ManageMachineShop
                addBtnTitle="Add Daily Production Mail "
                importBtnTitle="Import"
                exportBtnTitle="Export"
            />
            <Filter data={FilterArray.dailyProductionMailFilter} />

            <ReusableTable
                columns={columns}
                data={data}
            />
            <Modal
                mdlTitle="Add Daily Production Mail"
                btnSubmit="Save"
                openAddModal={openAddModal}
                onSubmit={handleSubmit(onSubmit)}
                body={
                    <div className="grid grid-cols-3 gap-4">
                        <div>
                            <label htmlFor="planningType" className="block text-gray-700">
                                Planning Type <span className="text-red-500">*</span>
                            </label>
                            <input
                                {...register('planningType', {
                                    required: 'This field is required',
                                })}
                                id="planningType"
                                type="text"
                                className="block w-full px-3 py-2 border rounded mt-2"
                            />
                            {errors?.planningType?.message && (
                                <span className="text-red-500">
                                    {errors?.planningType?.message}
                                </span>
                            )}
                        </div>
                        <div>
                            <label htmlFor="mails" className="block text-gray-700">
                                Mails <span className="text-red-500">*</span>
                            </label>
                            <input
                                {...register('mails', {
                                    required: 'This field is required',
                                })}
                                id="mails"
                                type="text"
                                className="block w-full px-3 py-2 border rounded mt-2"
                            />
                            {errors?.mails?.message && (
                                <span className="text-red-500">
                                    {errors?.mails?.message}
                                </span>
                            )}
                        </div>
                        <div>
                            <label htmlFor="planningRunning" className="block text-gray-700">
                                Planning Running <span className="text-red-500">*</span>
                            </label>
                            <div className='mt-4 p-1'>
                  <input
                    id="planningRunning"
                    type="radio"
                    value="yes"
                    {...register('planningRunning', { required: 'This field is required' })}
                    className="w-4 h-4 bg-gray-100 border-gray-300"
                  />
                  <label htmlFor="planningRunning" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Yes</label>

                  <input
                    id="planningRunning"
                    type="radio"
                    value="no"
                    {...register('planningRunning', { required: 'This field is required' })}
                    className="w-4 h-4 ml-5 bg-gray-100 border-gray-300"
                  />
                  <label htmlFor="planningRunning" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">No</label>
                </div>
                            
                            {errors?.planningRunning?.message && (
                                <span className="text-red-500">
                                    {errors?.planningRunning?.message}
                                </span>
                            )}
                        </div>
                        <div>
                            <label htmlFor="startDateTime" className="block text-gray-700">
                                Planning Start Date <span className="text-red-500">*</span>
                            </label>
                            {/* <input
                                {...register('startDateTime', {
                                    required: 'This field is required',
                                })}
                                id="startDateTime"
                                type="date"
                                className="block w-full px-3 py-2 border rounded mt-2"
                            /> */}
                            <Controller
                                name="startDateTime"
                                control={control}
                                rules={{ required: 'This field is required' }}
                                render={({ field }) => (
                                    <DatePicker
                                        {...field}
                                        selected={field.value}
                                        onChange={(date) => field.onChange(date)}
                                        selectsStart
                                        showTimeSelect
                                        startDate={startDate}
                                        endDate={endDate}
                                        placeholderText="Start Date"
                                        className="block w-full px-3 py-2 border rounded h-9"
                                    />
                                )}
                            />
                            {errors?.startDateTime?.message && (
                                <span className="text-red-500">
                                    {errors?.startDateTime?.message}
                                </span>
                            )}
                        </div>
                        <div>
                            <label htmlFor="endDateTime" className="block text-gray-700">
                                Planning End Date <span className="text-red-500">*</span>
                            </label>
                            <Controller
                                name='endDateTime'
                                control={control}
                                rules={{ required: 'This field is required' }}
                                render={({ field }) => (
                                    <DatePicker
                                        {...field}
                                        selected={field.value}
                                        onChange={(date) => field.onChange(date)}
                                        selectsStart
                                        showTimeSelect
                                        startDate={startDate}
                                        endDate={endDate}
                                        placeholderText="End Date"
                                        className="block w-full px-3 py-2 border rounded h-9"
                                    />
                                )}
                            />
                            {errors?.endDateTime?.message && (
                                <span className="text-red-500">
                                    {errors?.endDateTime?.message}
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
        </>
    )
}

export default page