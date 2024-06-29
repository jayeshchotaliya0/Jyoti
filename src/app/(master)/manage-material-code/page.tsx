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
    materialCode: string;
    status:boolean;
    materialName:string;
    materialType:string;
    uom:string;
}

const page = () => {
    const openAddModal = useSelector((state: any) => state.isModalOpen)
    const confirmationModal = useSelector((state: any) => state.isConfirmation)

    const { data, addData, updateData, deleteItem, getItemById }: any = useFetchData(service.API_URL?.materialsCode.listing)
    const [materialId, setMaterialId] = useState<any>()
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
            name: 'Material Name',
            selector: (row: any) => row.materialName,
            sortable: true,
        },
        {
            name: 'Material Type',
            selector: (row: any) => row.materialType,
            sortable: true,
        },
        {
            name: 'UOM',
            selector: (row: any) => row.uom,
            sortable: true,
        },
        {
            name: 'Material Code',
            selector: (row: any) => row.materialCode,
            sortable: true,
        },

        {
            name: 'Status',
            selector: (row: any) =>  <StatusColumn row={row}  />,

            sortable: true,
            width: '10rem'

        },
        {
            name: 'Action',
            selector: (row:any) => {
                return (<ActionButton edit history deleteAction
                    onClick={() => handleEdit(row?.materialId)}
                    handleConfirmDelete={() => handleOpenDelete(row?.materialId)}
                    />)
            },
            sortable: false,
            width: '7rem'

        },
    ];
    const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
        const body = {
            ...data,
            materialId: materialId ? materialId : 0,
            isDelete: false,
        }
        if (materialId) {
            await updateData(body, service?.API_URL?.materialsCode.update, reset)
        } else {
            await addData(body, service?.API_URL?.materialsCode.add, reset)
        }
    }

    const handleEdit = async (id: any) => {

        try {
            setMaterialId(id)
            const editMachineRes: any = await getItemById(id, service.API_URL.materialsCode.getbyid);
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
        setMaterialId(id)
        dispatch(confirmationOpen   ())
    }
    const handleConfirmDelete = async () => {
        if (materialId) {
            await deleteItem(materialId)
        }
    }

    return (
        <>
            <ManageMachineShop
                addBtnTitle="Add Material Code"
                importBtnTitle="Import"
                exportBtnTitle="Export"
            />
            <Filter data={FilterArray.materialCode} />

            <ReusableTable
                columns={columns}
                data={data}
            />
            <Modal
                mdlTitle="Add Intermediate Process"
                btnSubmit="Save"
                openAddModal={openAddModal}
                onSubmit={handleSubmit(onSubmit)}
                body={
                        <div className="grid grid-cols-3 gap-4">
                            <div>
                                <label htmlFor="materialCode" className="block text-gray-700">
                                Material Code <span className="text-red-500">*</span>
                                </label>
                                <input
                                    {...register('materialCode', {
                                        required: 'This field is required',
                                    })}
                                    id="materialCode"
                                    type="text"
                                    className="block w-full px-3 py-2 border rounded mt-2"
                                />
                                {errors?.materialCode?.message && (
                                    <span className="text-red-500">
                                        {errors?.materialCode?.message}
                                    </span>
                                )}
                            </div>
                            <div>
                                <label htmlFor="materialName" className="block text-gray-700">
                                Material Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    {...register('materialName', {
                                        required: 'This field is required',
                                    })}
                                    id="materialName"
                                    type="text"
                                    className="block w-full px-3 py-2 border rounded mt-2"
                                />
                                {errors?.materialName?.message && (
                                    <span className="text-red-500">
                                        {errors?.materialName?.message}
                                    </span>
                                )}
                            </div>
                            <div>
                                <label htmlFor="materialType" className="block text-gray-700">
                                Material Type <span className="text-red-500">*</span>
                                </label>
                                <input
                                    {...register('materialType', {
                                        required: 'This field is required',
                                    })}
                                    id="materialType"
                                    type="text"
                                    className="block w-full px-3 py-2 border rounded mt-2"
                                />
                                {errors?.materialType?.message && (
                                    <span className="text-red-500">
                                        {errors?.materialType?.message}
                                    </span>
                                )}
                            </div>
                            <div>
                                <label htmlFor="uom" className="block text-gray-700">
                                UOM <span className="text-red-500">*</span>
                                </label>
                                <input
                                    {...register('uom', {
                                        required: 'This field is required',
                                    })}
                                    id="uom"
                                    type="text"
                                    className="block w-full px-3 py-2 border rounded mt-2"
                                />
                                {errors?.uom?.message && (
                                    <span className="text-red-500">
                                        {errors?.uom?.message}
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