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
    dayName: string;
    reason: string;
    startDate: string;
    startTime: string;
    endDate: string;
    endTime: string;
    workCenter: string;
    unitName: string;
    status: boolean;
}

const page = () => {
    const openAddModal = useSelector((state: any) => state.isModalOpen)

    const confirmationModal = useSelector((state: any) => state.isConfirmation)

    const { data, addData, updateData, deleteItem, getItemById, commonAPI }: any = useFetchData(service?.API_URL?.specialWorking?.listing)
    const [specialDayId, setSpecialDayId] = useState<any>()
    const dispatch = useDispatch()
    const { register, handleSubmit, formState: { errors }, control, reset, setValue } = useForm<FormData>();
    const [commanData, setCommanData] = useState(
        {
            workCenter: [],
            unitName: []
        });
    const columns = [
        {
            name: 'Sr. No.',
            selector: (row: any) => row.id,
            sortable: true,
            width: '7rem'
        },
        {
            name: 'Special Day Name ',
            selector: (row: any) => row.dayName,
            sortable: true,
            width: '12rem'
        },
        {
            name: 'Unit Name',
            selector: (row: any) => row.unitName,
            sortable: true,
            width: '12rem'
        },
        {
            name: 'Reason',
            selector: (row: any) => row.reason,
            sortable: true,
            width: '12rem'
        },
        {
            name: 'Work Center Name',
            selector: (row: any) => row.workCenterName,
            sortable: true,
            width: '12rem'

        },
        {
            name: 'Start Date',
            selector: (row: any) => <>{showFormattedDate(row.startDate)}</>,
            sortable: true,
            width: '10rem'

        },
        {
            name: 'End Date',
            selector: (row: any) => <>{showFormattedDate(row.endDate)}</>,
            sortable: true,
            width: '10rem'

        },
        {
            name: 'Start Time',
            selector: (row: any) => <>{showFormattedTime(row.startTime)}</>,
            sortable: true,
            width: '10rem'

        },
        {
            name: 'End Time',
            selector: (row: any) => <>{showFormattedTime(row.endTime)}</>,
            sortable: true,
            width: '10rem'
        },
        {
            name: 'Total Days',
            selector: (row: any) => row.totalDays,
            sortable: true,
            width: '10rem'
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
                    onClick={() => handleEdit(row?.specialWorkingDayId)}
                    handleConfirmDelete={() => handleOpenDelete(row?.specialWorkingDayId)}
                />)
            },
            sortable: false,
            width: '7rem'
        },
    ];
    const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
        const body = {
            ...data,
            specialWorkingDayId: specialDayId ? specialDayId : 0,
            isDelete: false,
        }
        if (specialDayId) {
            await updateData(body, service?.API_URL?.specialWorking.update, reset)
        } else {
            await addData(body, service?.API_URL?.specialWorking.add, reset)
        }
    }

    const handleEdit = async (id: any) => {

        try {
            setSpecialDayId(id)
            const editMachineRes: any = await getItemById(id, service.API_URL.specialWorking.getbyid);
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
        setSpecialDayId(id)
        dispatch(confirmationOpen())
    }
    const handleConfirmDelete = async () => {
        if (specialDayId) {
            await deleteItem(specialDayId)
        }
    }
    const modalListing = async () => {
        try {
            const body = ["Work Center", "UnitName"];
            setCommanData(await commonAPI(body, service?.API_URL?.common?.listing));
        } catch (error) {
            console.error("Error fetching common data:", error);
        }
    };

    useEffect(() => {
        if (openAddModal) {
            modalListing();
        }
    }, [openAddModal]);
    console.log("commanData", commanData)
    return (
        <>
            <ManageMachineShop
                addBtnTitle="Add Special Working Day"
                importBtnTitle="Import"
                exportBtnTitle="Export"
            />

            <Filter data={FilterArray.specialWorkingFilter} />

            <ReusableTable
                columns={columns}
                data={data || []}
            />

            <Modal
                mdlTitle="Add Special Working Day"
                btnSubmit="Save"
                openAddModal={openAddModal}
                onSubmit={handleSubmit(onSubmit)}
                reset={() => reset()}
                body={
                    <div className="grid grid-cols-3 gap-4">
                        <div>
                            <label htmlFor="dayName" className="block text-gray-700">
                                Day Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                {...register('dayName', {
                                    required: 'This field is required',
                                })}
                                id="dayName"
                                type="text"
                                className="block w-full px-3 py-2 border rounded mt-2"
                            />
                            {errors?.dayName?.message && (
                                <span className="text-red-500">
                                    {errors?.dayName?.message}
                                </span>
                            )}
                        </div>
                        <div>
                            <label htmlFor="reason" className="block text-gray-700">
                                Reason
                            </label>
                            <input
                                {...register('reason')}
                                id="reason"
                                type="text"
                                className="block w-full px-3 py-2 border rounded mt-2"
                            />
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
                            <label htmlFor="endDate" className="block text-gray-700">
                                End Date
                            </label>
                            <input
                                {...register('endDate')}
                                id="endDate"
                                type="date"
                                className="block w-full px-3 py-2 border rounded mt-2"
                            />
                        </div>
                        <div>
                            <label htmlFor="endTime" className="block text-gray-700">
                                End Time
                            </label>
                            <input
                                {...register('endTime')}
                                id="endTime"
                                type="time"
                                className="block w-full px-3 py-2 border rounded mt-2"
                            />
                        </div>
                        <div>
                            <label htmlFor="unitName" className="block text-gray-700">
                                Unit Name <span className="text-red-500">*</span>
                            </label>
                            <SelectBox
                                list={[{ id: 1, lins: 'PPC' }, { id: 2, lins: 'PPC2' }]}
                                keyField="id"
                                valueField="lins"
                                name="manageshop"
                                control={control}
                                errors={errors}
                                className="block w-full px-3 py-2.5 border bg-white rounded mt-2"
                            />
                        </div>
                        <div>
                            <label htmlFor="workCenter" className="block text-gray-700">
                                Work Center
                            </label>
                            <SelectBox
                                list={[{ id: 1, lins: 'PPC' }, { id: 2, lins: 'PPC2' }]}
                                keyField="id"
                                valueField="lins"
                                name="manageshop"
                                control={control}
                                errors={errors}
                                className="block w-full px-3 py-2.5 border bg-white rounded mt-2"
                            />
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