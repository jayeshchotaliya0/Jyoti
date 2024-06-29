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
    driverName:any
    maincompany: string
    status: any;
    empId:any;
    driverNumber:any
}
const page = () => {
    const openAddModal = useSelector((state: any) => state.isModalOpen)
    const confirmationModal = useSelector((state: any) => state.isConfirmation)

    const { data, getListData, listData, updateData, addData, getItemById, deleteItem } = useFetchData(service?.API_URL?.drivers.listing);
    const [driverId, setDriverId] = useState<any>()
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
        control
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
            name: 'Payroll',
            selector: (row: any) => row.driverEmpId ? 'Yes':'No' ,
            sortable: true,
            width: '15rem'
        },
        {
            name: 'Emp Code',
            selector: (row: any) => row.empCode,
            sortable: true,
            width: '15rem'
        },
        {
            name: 'Driver Number',
            selector: (row: any) => row.driverNumber,
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
                    onClick={() => handleEdit(row?.driverId)}
                    handleConfirmDelete={() => handleOpenDelete(row?.driverId)}
                />)
            },
            sortable: false,
            width: '7rem'

        },
    ];
    const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
        const body = {
            ...data,
            driverId: driverId ? driverId : 0,
            isDelete: false,
        }
        if (driverId) {
            await updateData(body, service?.API_URL?.drivers.update, reset)
        } else {
            await addData(body, service?.API_URL?.drivers.add, reset)
        }
    }

    const handleEdit = async (id: any) => {

        try {
            setDriverId(id)
            const editMachineRes: any = await getItemById(id, service.API_URL.drivers.getbyid);
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
        setDriverId(id)
        dispatch(confirmationOpen())
    }
    const handleConfirmDelete = async () => {
        if (driverId) {
            await deleteItem(driverId)
        }
    }
    const modalListing = async () => {
        const apiUrls = {
            employees: service?.API_URL?.employees?.listing,
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
                addBtnTitle="Add Driver"
                importBtnTitle="Import"
                exportBtnTitle="Export"
            />
            <Filter data={FilterArray.manageDriver} />
            <ReusableTable
                columns={columns}
                data={data}
            />
            <Modal
                mdlTitle="Add Driver"
                btnSubmit="Save"
                openAddModal={openAddModal}
                onSubmit={handleSubmit(onSubmit)}
                body={
                    <div className="grid grid-cols-3 gap-4">

                        <div>
                            <label htmlFor="inputText3" className="block text-gray-700">
                                Driver Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                {...register('driverName', {
                                    required: 'This field is required',
                                })}
                                id="inputText3"
                                type="text"
                                className="block w-full px-3 py-2 border rounded mt-2"
                            />
                            {errors?.driverName?.message && (
                                <span className="text-red-500">
                                    {errors?.driverName?.message}
                                </span>
                            )}
                        </div>

                        <div>
                            <label htmlFor="inputText3" className="block text-gray-700">
                                EMP Code <span className="text-red-500">*</span>
                            </label>
                            <SelectBox
                                list={listData.employees}
                                keyField="empId"
                                valueField="empCode"
                                name="driverEmpId"
                                control={control}
                                errors={errors}
                                className="block w-full px-3 py-2.5 border bg-white rounded mt-2"
                            />
                            {errors?.maincompany?.message && (
                                <span className="text-red-500">
                                    {errors?.maincompany?.message}
                                </span>
                            )}
                        </div>

                        <div>
                            <label htmlFor="inputText3" className="block text-gray-700">
                                Driver Number <span className="text-red-500">*</span>
                            </label>
                            <input
                                {...register('driverNumber', {
                                    required: 'This field is required',
                                })}
                                id="inputText3"
                                type="text"
                                className="block w-full px-3 py-2 border rounded mt-2"
                            />
                            {errors?.driverNumber?.message && (
                                <span className="text-red-500">
                                    {errors?.driverNumber?.message}
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