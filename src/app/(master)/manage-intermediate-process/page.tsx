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
    processName: string;
    processCode: string;
    materialId?: string;
    poText?: string;
    procurementType?: string;
    dispatchStartTime?: string;
    dispatchEndTime?: string;
    status: boolean
}

const page = () => {
    const openAddModal = useSelector((state: any) => state.isModalOpen)
    const confirmationModal = useSelector((state: any) => state.isConfirmation)

    const { data, addData, updateData, deleteItem, getItemById, getListData, listData } = useFetchData(service?.API_URL?.interMediateProcesses.listing);
    const { register, handleSubmit, formState: { errors }, reset, setValue, control } = useForm<FormData>();
    const [intermediateId, setIntermediateId] = useState()
    const dispatch = useDispatch()
    const columns = [
        {
            name: 'Sr. No.',
            selector: (row: any) => row.id,
            sortable: true,
            width: '7rem'
        },
        {
            name: 'Process name',
            selector: (row: any) => row.processName,
            sortable: true,
        },
        {
            name: 'Process code',
            selector: (row: any) => row.processCode,
            sortable: true,
        },
        {
            name: 'Material Code',
            selector: (row: any) => row.materialCode,
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
            selector: (row: any) => {
                return (<ActionButton edit history deleteAction
                    onClick={() => handleEdit(row?.iProcessId)}
                    handleConfirmDelete={() => handleOpenDelete(row?.iProcessId)}
                />)
            },
            sortable: false,
            width: '7rem'

        },
    ];
    const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
        const dispatchStartTimeWithSeconds = intermediateId ? data.dispatchStartTime :`${data.dispatchStartTime}:00`;
        const dispatchEndTimeWithSeconds =  intermediateId ? data.dispatchEndTime: `${data.dispatchEndTime}:00`;
    
        const body = {
            ...data,
            dispatchStartTime: dispatchStartTimeWithSeconds,
            dispatchEndTime: dispatchEndTimeWithSeconds,
            iProcessId: intermediateId ? intermediateId : 0,
            isDelete: false,
        }
        if (intermediateId) {
            await updateData(body, service?.API_URL?.interMediateProcesses.update, reset)
        } else {
            await addData(body, service?.API_URL?.interMediateProcesses.add, reset)
        }
    }

    const handleEdit = async (id: any) => {
        try {
            setIntermediateId(id)
            const editMachineRes: any = await getItemById(id, service.API_URL.interMediateProcesses.getbyid);
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
        setIntermediateId(id)
        dispatch(confirmationOpen())
    }
    const handleConfirmDelete = async () => {
        if (intermediateId) {
            await deleteItem(intermediateId)
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
                addBtnTitle="Add Intermediate Process"
                importBtnTitle="Import"
                exportBtnTitle="Export"
            />
            <Filter data={FilterArray.intermediateFilter} />

            <ReusableTable
                columns={columns}
                data={data || []}
            />

            <Modal
                mdlTitle="Add Intermediate Process"
                btnSubmit="Save"
                openAddModal={openAddModal}
                onSubmit={handleSubmit(onSubmit)}
                body={
                    <>
                        <div className="grid grid-cols-3 gap-4">
                            <div>
                                <label htmlFor="processName" className="block text-gray-700">
                                    Process Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    {...register('processName', {
                                        required: 'This field is required',
                                    })}
                                    id="processName"
                                    type="text"
                                    className="block w-full px-3 py-2 border rounded mt-2"
                                />
                                {errors?.processName?.message && (
                                    <span className="text-red-500">
                                        {errors?.processName?.message}
                                    </span>
                                )}
                            </div>
                            <div>
                                <label htmlFor="processCode" className="block text-gray-700">
                                    Process Code <span className="text-red-500">*</span>
                                </label>
                                <input
                                    {...register('processCode', {
                                        required: 'This field is required',
                                    })}
                                    id="processCode"
                                    type="text"
                                    className="block w-full px-3 py-2 border rounded mt-2"
                                />
                                {errors?.processCode?.message && (
                                    <span className="text-red-500">
                                        {errors?.processCode?.message}
                                    </span>
                                )}
                            </div>
                            <div>
                                <label htmlFor="materialId" className="block text-gray-700">
                                    Material Code<span className="text-red-500">*</span>
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
                            </div>
                            <div>
                                <label htmlFor="poText" className="block text-gray-700">
                                    Purchase Order Text<span className="text-red-500">*</span>
                                </label>
                                <input
                                    {...register('poText')}
                                    id="poText"
                                    type="text"
                                    className="block w-full px-3 py-2 border rounded mt-2"
                                />
                            </div>
                            <div>
                                <label htmlFor="procurementType" className="block text-gray-700">
                                    Procurement Type<span className="text-red-500">*</span>
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
                            </div>
                            {/* <div>
                                <label htmlFor="vendors" className="block text-gray-700">
                                    Vendors<span className="text-red-500">*</span>
                                </label>
                                <input
                                    {...register('vendors')}
                                    id="vendors"
                                    type="text"
                                    className="block w-full px-3 py-2 border rounded mt-2"
                                />
                            </div> */}
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className='col-start-1 col-end-3 mt-2'>
                                <h3>Material Dispatch Timeline</h3>
                            </div>
                            <div>
                                <label htmlFor="dispatchStartTime" className="block text-gray-700">
                                    Start Time<span className="text-red-500">*</span>
                                </label>
                                <input
                                    {...register('dispatchStartTime')}
                                    id="dispatchStartTime"
                                    type="time"
                                    className="block w-full px-3 py-2 border rounded mt-2"
                                />
                            </div>
                            <div>
                                <label htmlFor="dispatchEndTime" className="block text-gray-700">
                                    End Time<span className="text-red-500">*</span>
                                </label>
                                <input
                                    {...register('dispatchEndTime')}
                                    id="dispatchEndTime"
                                    type="time"
                                    className="block w-full px-3 py-2 border rounded mt-2"
                                />
                            </div>
                        </div>
                    </>
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