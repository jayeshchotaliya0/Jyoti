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
import service from '@/utils/service/service';
import useFetchData from '@/utils/useFetchData/customFetchData';

import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

interface FormData {
    vehicleNumber: string
    vehicleName: string
    loadingCapacity: string
    status: boolean
}
const page = () => {
    const openAddModal = useSelector((state: any) => state.isModalOpen)
    const confirmationModal = useSelector((state: any) => state.isConfirmation)

    const { data, addData, updateData, deleteItem, getItemById } = useFetchData(service?.API_URL?.vehicles.listing);
    const [vehicleId, setVehicleId] = useState<any>()
    const dispatch = useDispatch()
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue
    } = useForm<FormData>()



    const columns = [
        {
            name: 'Sr. No.',
            selector: (row: any) => row.id,
            sortable: true,
            width: '7rem'
        },
        {
            name: 'Vehicle Number',
            selector: (row: any) => row.vehicleNumber,
            sortable: true,
        },
        {
            name: 'Vehicle Name',
            selector: (row: any) => row.vehicleName,
            sortable: true,
        },
        {
            name: 'Loading Capacity',
            selector: (row: any) => row.loadingCapacity,
            sortable: true,
            width: '50rem'

        },
        {
            name: 'Status',
            selector: (row: any) => <StatusColumn row={row} />,


            sortable: true,
        },
        {
            name: 'Action',
            selector: (row: any) => {
                return (<ActionButton edit history deleteAction
                    onClick={() => handleEdit(row?.vehicleId)}
                    handleConfirmDelete={() => handleOpenDelete(row?.vehicleId)}
                />)
            },
            sortable: false,
            width: '7rem'
        },
    ];

    const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
        const body = {
            ...data,
            vehicleId: vehicleId ? vehicleId : 0,
            isDelete: false,
        }
        if (vehicleId) {
            await updateData(body, service?.API_URL?.vehicles.update, reset)
        } else {
            await addData(body, service?.API_URL?.vehicles.add, reset)
        }
    }

    const handleEdit = async (id: any) => {

        try {
            setVehicleId(id)
            const editMachineRes: any = await getItemById(id, service.API_URL.vehicles.getbyid);
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
        setVehicleId(id)
        dispatch(confirmationOpen())
    }
    const handleConfirmDelete = async () => {
        if (vehicleId) {
            await deleteItem(vehicleId)
        }
    }
    return (
        <>
            <ManageMachineShop
                addBtnTitle="Add Vehicle"
                importBtnTitle="Import"
                exportBtnTitle="Export"
            />
            <Filter data={FilterArray.vehicleFilter} />

            <ReusableTable
                columns={columns}
                data={data || []}
            />
            <Modal
                mdlTitle="Add Vehicle"
                btnSubmit="Save"
                openAddModal={openAddModal}
                onSubmit={handleSubmit(onSubmit)}
                body={
                    <div className="grid grid-cols-3 gap-4">
                        <div>
                            <label htmlFor="vehicleNumber" className="block text-gray-700">
                                Vehicle Number <span className="text-red-500">*</span>
                            </label>
                            <input
                                {...register('vehicleNumber', {
                                    required: 'This field is required',
                                    pattern: {
                                        value: /^[a-zA-Z0-9]+$/,
                                        message: 'Vehicle Number must be alphanumeric',
                                    },
                                })}
                                id="vehicleNumber"
                                type="text"
                                className="block w-full px-3 py-2 border rounded mt-2"
                            />
                            {errors?.vehicleNumber?.message && (
                                <span className="text-red-500">
                                    {errors?.vehicleNumber?.message}
                                </span>
                            )}
                        </div>
                        <div>
                            <label htmlFor="vehicleName" className="block text-gray-700">
                                Vehicle Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                {...register('vehicleName', {
                                    required: 'This field is required',
                                    pattern: {
                                        value: /^[a-zA-Z\s]+$/,
                                        message: 'Vehicle Name must be alphabetic',
                                    },
                                })}
                                id="vehicleName"
                                type="text"
                                className="block w-full px-3 py-2 border rounded mt-2"
                            />
                            {errors?.vehicleName?.message && (
                                <span className="text-red-500">
                                    {errors?.vehicleName?.message}
                                </span>
                            )}
                        </div>
                        <div>
                            <label htmlFor="loadingCapacity" className="block text-gray-700">
                                Loading Capacity <span className="text-red-500">*</span>
                            </label>
                            <input
                                {...register('loadingCapacity', {
                                    required: 'This field is required',
                                    pattern: {
                                        value: /^[0-9]+$/,
                                        message: 'Loading Capacity must be numeric',
                                    },
                                })}
                                id="loadingCapacity"
                                type="text"
                                className="block w-full px-3 py-2 border rounded mt-2"
                            />
                            {errors?.loadingCapacity?.message && (
                                <span className="text-red-500">
                                    {errors?.loadingCapacity?.message}
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
                title="Are you sure want to go with the following implementation?"
                footerButton={{ closeText: "No", confirmText: 'Yes' }}
            />
        </>)
}

export default page