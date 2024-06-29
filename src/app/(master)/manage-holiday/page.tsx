'use client'
import ManageMachineShop from '@/component/TableCommanHeader/TableCommanHeader';
import ActionButton from '@/component/actionButton/ActionButton';
import Filter from '@/component/higherOrderComponent/Filter/Filter';
import Modal from '@/component/higherOrderComponent/modal/Modal';
;
import ReusableTable from '@/component/react-data-table/Table';
import ConfirmPop from '@/utils/ConfirmPop/ConfirmPop';
import FilterArray from '@/utils/FilterArray';
import { showFormattedDate, showFormattedTime } from '@/utils/functions/commonFunction';
import { confirmationClose, confirmationOpen, openModal } from '@/utils/redux/features/reduxData';
import SelectBox from '@/utils/selectBox/SelectBox';
import service from '@/utils/service/service';
import useFetchData from '@/utils/useFetchData/customFetchData';

import React, { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

interface FormData {
    id: string;
    holidayType: string;
    holidayName: string;
    unitId: string;
    startDate: string;
    endDate: string;
    status: boolean;
}
const page = () => {
    const openAddModal = useSelector((state: any) => state.isModalOpen)

    const confirmationModal = useSelector((state: any) => state.isConfirmation)

    const { data, addData, updateData, listData,deleteItem, getItemById,getListData }: any = useFetchData(service?.API_URL?.holidays.listing)
    const [holidayId, setHolidayId] = useState<any>()
    const dispatch = useDispatch()
    const { register, handleSubmit, formState: { errors }, control, reset, setValue } = useForm<FormData>();

    const columns = [
        {
            name: 'Holiday Type',
            selector: (row: any) => row.holidayType,
            sortable: true,
        },
        {
            name: 'Unit Name',
            selector: (row: any) => row.holidayName,
            sortable: true,
        },
        {
            name: 'Holiday/Week Off Name',
            selector: (row: any) => row.holidayName,
            sortable: true,
            width: '15rem'
        },
        {
            name: 'Start Date',
            selector: (row: any) => <>{showFormattedDate(row.startDate)}</>,
            sortable: true,
        },
        {
            name: 'End Date',
            selector: (row: any) => <>{showFormattedDate(row.endDate)}</>,
            sortable: true,
        },
        {
            name: 'Total Days',
            selector: (row: any) => row.totalDays,
            sortable: true,
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
            selector: (row: any) => {
                return (<ActionButton edit history deleteAction
                    onClick={() => handleEdit(row?.holidayId)}
                    handleConfirmDelete={() => handleOpenDelete(row?.holidayId)}
                />)
            },
            sortable: false,
            width: '7rem'
        },
    ];
    const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
        const body = {
            ...data,
            holidayId: holidayId ? holidayId : 0,
            isDelete: false,
        }
        if (holidayId) {
            await updateData(body, service?.API_URL?.holidays.update, reset)
        } else {
            await addData(body, service?.API_URL?.holidays.add, reset)
        }
    }

    const handleEdit = async (id: any) => {
        try {
            setHolidayId(id)
            const editMachineRes: any = await getItemById(id, service.API_URL.holidays.getbyid);
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
        setHolidayId(id)
        dispatch(confirmationOpen())
    }
    const handleConfirmDelete = async () => {
        if (holidayId) {
            await deleteItem(holidayId)
        }
    }
    const modalListing = async () => {
        const apiUrls = {
          unitList: service?.API_URL?.unitList?.listing,
        };
        await getListData(apiUrls);
      };
    
      useEffect(() => {
        if (openAddModal) {
          modalListing();
        }
      }, [openAddModal]);
    return (
        <>
            <ManageMachineShop
                addBtnTitle="Add Holiday"
                importBtnTitle="Import"
                exportBtnTitle="Export"
            />
            <Filter data={FilterArray.holidayFilter} />

            <ReusableTable
                columns={columns}
                data={data}
            />

            <Modal
                mdlTitle="Add Holiday"
                btnSubmit="Save"
                openAddModal={openAddModal}
                onSubmit={handleSubmit(onSubmit)}
                reset={() => reset()}
                body={
                    <div className="grid grid-cols-3 gap-4">
                        <div>
                            <label htmlFor="holidayType" className="block text-gray-700">
                                Holiday Type <span className="text-red-500">*</span>
                            </label>
                            <SelectBox
                                list={[
                                    { id: 'national', lins: 'National' },
                                    { id: 'state', lins: 'State' },
                                    { id: 'week off', lins: 'Week Off' },
                                ]}
                                keyField="id"
                                valueField="lins"
                                name="holidayType"
                                control={control}
                                errors={errors}
                                className="block w-full px-3 py-2.5 border bg-white rounded mt-2"
                            />
                        </div>
                        <div>
                            <label htmlFor="unitId" className="block text-gray-700">
                                Unit Name <span className="text-red-500">*</span>
                            </label>
                            <SelectBox
                                list={listData.unitList}
                                keyField="unitId"
                                valueField="unitName"
                                name="unitId"
                                control={control}
                                errors={errors}
                                className="block w-full px-3 py-2.5 border bg-white rounded mt-2"
                            />
                        </div>
                        {errors?.unitId?.message && (
                                <span className="text-red-500">
                                    {errors?.unitId?.message}
                                </span>
                            )}
                        <div>
                            <label htmlFor="holidayName" className="block text-gray-700">
                                Holiday/Week Off Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                {...register('holidayName', {
                                    required: 'This field is required',
                                })}
                                id="holidayName"
                                type="text"
                                className="block w-full px-3 py-2 border rounded mt-2"
                            />
                            {errors?.holidayName?.message && (
                                <span className="text-red-500">
                                    {errors?.holidayName?.message}
                                </span>
                            )}
                        </div>
                        <div>
                            <label htmlFor="startDate" className="block text-gray-700">
                                Start Date <span className="text-red-500">*</span>
                            </label>
                            <input
                                {...register('startDate', {
                                    required: 'This field is required',
                                })}
                                id="startDate"
                                type="date"
                                className="block w-full px-3 py-2 border rounded mt-2"
                            />
                            {errors?.startDate?.message && (
                                <span className="text-red-500">
                                    {errors?.startDate?.message}
                                </span>
                            )}
                        </div>

                        <div>
                            <label htmlFor="endDate" className="block text-gray-700">
                                End Date <span className="text-red-500">*</span>
                            </label>
                            <input
                                {...register('endDate', {
                                    required: 'This field is required',
                                })}
                                id="endDate"
                                type="date"
                                className="block w-full px-3 py-2 border rounded mt-2"
                            />
                            {errors?.endDate?.message && (
                                <span className="text-red-500">
                                    {errors?.endDate?.message}
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