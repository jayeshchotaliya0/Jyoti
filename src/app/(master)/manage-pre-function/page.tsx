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
    description: string;
    functionName: string;
    status: boolean;
}
const page = () => {
    const openAddModal = useSelector((state: any) => state.isModalOpen)
    const confirmationModal = useSelector((state: any) => state.isConfirmation)

    const { data, addData, updateData, deleteItem, getItemById } = useFetchData(service?.API_URL?.preFunctions.listing);
    const [preFunctionId, setPreFunctionId] = useState()
    const dispatch = useDispatch()
    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm<FormData>();

    const columns = [
        {
            name: 'Sr. No.',
            selector: (row: any) => row.id,
            sortable: true,
            width: '7rem'
        },
        {
            name: 'Function',
            selector: (row: any) => row.functionName,
            sortable: true,
        },
        {
            name: 'Description',
            selector: (row: any) => row.description,
            sortable: true,
        },
        {
            name: 'Status',
            selector: (row: any) => <StatusColumn row={row} />,
            sortable: true,
            width: '10rem'

        },
        {
            name: 'Action',
            selector: (row:any) => {
                return (<ActionButton edit history 
                    onClick={() => handleEdit(row?.preFunctionId)}
                    handleConfirmDelete={()=>handleOpenDelete(row?.preFunctionId)}
                />)
            },
            sortable: false,
            width: '10rem'
        },
    ];
    const handleOpenDelete = async (id: any) => {
        setPreFunctionId(id)
        dispatch(confirmationOpen())
    }
    const handleConfirmDelete = async () => {
        if (preFunctionId) {
            await deleteItem(preFunctionId)
        }
    }
    const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
        const body = {
            ...data,
            preFunctionId: preFunctionId ? preFunctionId : 0,
            isDelete: false,
        }
        if (preFunctionId) {
            await updateData(body, service?.API_URL?.preFunctions.update, reset)
        } else {
            await addData(body, service?.API_URL?.preFunctions.add, reset)
        }
    }

    const handleEdit = async (id: any) => {

        try {
            setPreFunctionId(id)
            const editMachineRes: any = await getItemById(id, service.API_URL.preFunctions.getbyid);
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

    return (
        <>
            <ManageMachineShop
                addBtnTitle="Add Pre Function"
                importBtnTitle="Import"
                exportBtnTitle="Export"
            />
            <Filter data={FilterArray.preFunctionFilter} />


            <ReusableTable
                columns={columns}
                data={data || []}
            />

            <Modal
                mdlTitle="Add Pre Function"
                btnSubmit="Save"
                openAddModal={openAddModal}
                onSubmit={handleSubmit(onSubmit)}
                body={
                    <div className="grid grid-cols-3 gap-4">
                        <div>
                            <label htmlFor="functionName" className="block text-gray-700">
                            Function  <span className="text-red-500">*</span>
                            </label>
                            <input
                                {...register('functionName', {
                                    required: 'This field is required',
                                })}
                                id="functionName"
                                type="text"
                                className="block w-full px-3 py-2 border rounded mt-2"
                            />
                            {errors?.functionName?.message && (
                                <span className="text-red-500">
                                    {errors?.functionName?.message}
                                </span>
                            )}
                        </div>
                        <div>
                            <label htmlFor="description" className="block text-gray-700">
                                Description <span className="text-red-500">*</span>
                            </label>
                            <input
                                {...register('description', {
                                    required: 'This field is required',
                                })}
                                id="description"
                                type="text"
                                className="block w-full px-3 py-2 border rounded mt-2"
                            />
                            {errors?.description?.message && (
                                <span className="text-red-500">
                                    {errors?.description?.message}
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
        </>)
}

export default page