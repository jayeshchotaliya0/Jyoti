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

import React, { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
interface FormData {
    description: string;
    shortForm: string;
    materialId: string;
    procurementType: string;
    status: boolean;
    bun:any
}
const page = () => {
    const openAddModal = useSelector((state: any) => state.isModalOpen)
    const { data, updateData, addData, listData, deleteItem, getItemById, getListData } = useFetchData(service?.API_URL?.preProcesses.listing);
    const confirmationModal = useSelector((state: any) => state.isConfirmation)

    const { register, handleSubmit, formState: { errors }, reset, setValue,control } = useForm<FormData>();
    const [processId, setProcessId] = useState()
    const dispatch = useDispatch()
    const columns = [
        {
            name: 'Sr. No.',
            selector: (row: any) => row.id,
            sortable: true,
            width: '7rem'
        },
        {
            name: 'Description',
            selector: (row: any) => row.description,
            sortable: true,
        },
        {
            name: 'Short Form',
            selector: (row: any) => row.shortForm,
            sortable: true,
        },
        {
            name: 'Material Code',
            selector: (row: any) => row.materialId,
            sortable: true,
        },
        {
            name: 'BUN',
            selector: (row: any) => row.bun,
            sortable: true,
        },
        {
            name: 'Procurement Type',
            selector: (row: any) => row.procurementType,
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
                return (<ActionButton edit history deleteAction 
                    onClick={() => handleEdit(row?.preProcessId)}
                    handleConfirmDelete={() => handleOpenDelete(row?.preProcessId)}
                />)
            },
            width: '7rem',
            sortable: false,

        },
    ];
    const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
        const body = {
            ...data,
            preProcessId: processId ? processId : 0,
            isDelete: false,
        }
        if (processId) {
            await updateData(body, service?.API_URL?.preProcesses.update, reset)
        } else {
            await addData(body, service?.API_URL?.preProcesses.add, reset)
        }
    }

    const handleEdit = async (id: any) => {

        try {
            setProcessId(id)
            const editMachineRes: any = await getItemById(id, service.API_URL.preProcesses.getbyid);
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
        setProcessId(id)
        dispatch(confirmationOpen())
    }
    const handleConfirmDelete = async () => {
        if (processId) {
            await deleteItem(processId)
        }
    }
    const modalListing = async () => {
        const apiUrls = {
            materials: service?.API_URL?.materialsCode?.listing,
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
                addBtnTitle="Add Pre Proccess"
                importBtnTitle="Import"
                exportBtnTitle="Export"
            />
            <Filter data={FilterArray.preProcessFilter} />


            <ReusableTable
                columns={columns}
                data={data || []}
            />
            <Modal
                mdlTitle="Add Pre Process"
                btnSubmit="Save"
                openAddModal={openAddModal}
                onSubmit={handleSubmit(onSubmit)}
                body={
                    <div className="grid grid-cols-3 gap-4">
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
                            <label htmlFor="shortForm" className="block text-gray-700">
                                Short Form <span className="text-red-500">*</span>
                            </label>
                            <input
                                {...register('shortForm', {
                                    required: 'This field is required',
                                })}
                                id="shortForm"
                                type="text"
                                className="block w-full px-3 py-2 border rounded mt-2"
                            />
                            {errors?.shortForm?.message && (
                                <span className="text-red-500">
                                    {errors?.shortForm?.message}
                                </span>
                            )}
                        </div>
                        <div>
                            <label htmlFor="materialId" className="block text-gray-700">
                                Material Code <span className="text-red-500">*</span>
                            </label>
                            <SelectBox
                                list={listData.materials}
                                keyField="materialId"
                                valueField="materialCode"
                                name="materialId"
                                control={control}
                                errors={errors}
                                className="block w-full px-3 py-2.5 border bg-white rounded mt-2"
                            />
                            {errors?.materialId?.message && (
                                <span className="text-red-500">
                                    {errors?.materialId?.message}
                                </span>
                            )}
                        </div>
                        <div>
                            <label htmlFor="materialCode" className="block text-gray-700">
                                BUN <span className="text-red-500">*</span>
                            </label>
                            <input
                                {...register('bun', {
                                    required: 'This field is required',
                                })}
                                id="bun"
                                type="text"
                                className="block w-full px-3 py-2 border rounded mt-2"
                            />
                            {errors?.bun?.message && (
                                <span className="text-red-500">
                                    {errors?.bun?.message}
                                </span>
                            )}
                        </div>
                        <div>
                            <label htmlFor="procurementType" className="block text-gray-700">
                                Procurement Type <span className="text-red-500">*</span>
                            </label>
                            <SelectBox
                                    list={[{ procurementType: 1, name: 'Inhouse' }, { procurementType: 2, name: 'Process' }, { procurementType: 3, name: 'Purchase' }]}
                                    keyField="id"
                                    valueField="name"
                                    name="procurementType"
                                    control={control}
                                    errors={errors}
                                    className="block w-full px-3 py-2.5 border bg-white rounded mt-2"
                                />
                            {errors?.procurementType?.message && (
                                <span className="text-red-500">
                                    {errors?.procurementType?.message}
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