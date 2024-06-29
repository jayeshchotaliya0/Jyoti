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
    locationName: string
    status: boolean
}
const page = () => {
    const [dispatchToId, setDispatchToId] = useState<any>()
    const { data, loading, error, addData, updateData, getItemById, deleteItem } = useFetchData(service?.API_URL?.dispatchTo.listing)
    const confirmationModal = useSelector((state: any) => state.isConfirmation)

    const openAddModal = useSelector((state: any) => state.isModalOpen)
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
        setValue
    } = useForm<FormData>()
    const dispatch = useDispatch()
    const columns = [
        {
            name: 'Sr. No.',
            selector: (row: any) => row.id,
            sortable: true,
            width: '7rem'
        },
        {
            name: 'Dispatch To',
            selector: (row: any) => row.locationName,
            sortable: true,
            width: '75rem'

        },
        {
            name: 'Status',
            selector: (row: any) => <label className="inline-flex items-center cursor-pointer">
                <input type="checkbox" value="" className="sr-only peer" checked={row.status} />
                <div className="relative w-11 h-6 mt-5 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
            </label>,
            sortable: true,
        },
        {
            name: 'Action',
            selector: (row: any) => {
                return (<ActionButton edit history
                    onClick={() => handleEdit(row?.dispatchToId)}
                    handleConfirmDelete={()=>handleOpenDelete(row?.dispatchToId)}
                />)
            },
            sortable: false,
            width: '7rem'

        },
    ];

    const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
        const body = {
            dispatchToId: dispatchToId ? dispatchToId : 0,
            ...data,
        }
        if (dispatchToId) {
            await updateData(body, service?.API_URL?.dispatchTo.update, reset)
        } else {
            await addData(body, service?.API_URL?.dispatchTo.add, reset)
        }
    }
    const handleEdit = async (id: any) => {

        try {
            setDispatchToId(id)
            const editMachineRes: any = await getItemById(id, service.API_URL.dispatchTo.getbyid);
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
        setDispatchToId(id)
        dispatch(confirmationOpen())
    }
    const handleConfirmDelete = async () => {
        if (dispatchToId) {
            await deleteItem(dispatchToId)
        }
    }
    return (
        <>
            <ManageMachineShop
                addBtnTitle="Manage Dispatch To"
                importBtnTitle="Import"
                exportBtnTitle="Export"
            />
            <Filter data={FilterArray.manageDispatch} />
            <ReusableTable
                columns={columns}
                data={data}
            />
            <Modal
                mdlTitle="Add Dispatch To"
                btnSubmit="Save"
                openAddModal={openAddModal}
                onSubmit={handleSubmit(onSubmit)}
                body={
                    <div className="grid grid-cols-3 gap-4">
                        <div>
                            <label htmlFor="inputText3" className="block text-gray-700">
                                Dispatch Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                {...register('locationName', {
                                    required: 'This field is required',
                                })}
                                id="inputText3"
                                type="text"
                                className="block w-full px-3 py-2 border rounded mt-2"
                            />
                            {errors?.locationName?.message && (
                                <span className="text-red-500">
                                    {errors?.locationName?.message}
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
                title="Are you sure want to go delete ?"
                footerButton={{ closeText: "No", confirmText: 'Yes' }}
            />
        </>
    )
}

export default page