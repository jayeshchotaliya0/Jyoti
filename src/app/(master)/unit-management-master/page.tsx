'use client'
import ManageMachineShop from '@/component/TableCommanHeader/TableCommanHeader';
import ActionButton from '@/component/actionButton/ActionButton';
import Modal from '@/component/higherOrderComponent/modal/Modal';
;
import ReusableTable from '@/component/react-data-table/Table';
import ConfirmPop from '@/utils/ConfirmPop/ConfirmPop';
import { StatusColumn } from '@/utils/functions/commonFunction';
import { confirmationClose, confirmationOpen, openModal } from '@/utils/redux/features/reduxData';
import SelectBox from '@/utils/selectBox/SelectBox';
import service from '@/utils/service/service';
import useFetchData from '@/utils/useFetchData/customFetchData';
import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
interface FormData {
    unitId: string;
    unitName: string;
    country: string;
    state: string
    status: boolean;
    city: string
}

const page = () => {
    const openAddModal = useSelector((state: any) => state.isModalOpen)
    const { data, loading, error, addData, updateData, getItemById, deleteItem } = useFetchData(service?.API_URL?.unitList?.listing);
    const [machineShopId, setMachineShopId] = useState<any>()
  const confirmationModal = useSelector((state: any) => state.isConfirmation)
    
    const dispatch = useDispatch()
    const { register, handleSubmit, setValue, formState: { errors }, control, reset } = useForm<FormData>({
        defaultValues: { status: true }
    });
    const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
        const body = {
            ...data,
            unitId: machineShopId ? machineShopId : 0,
            isDelete: false,
        }
        if (machineShopId) {
            await updateData(body, service?.API_URL?.unitList.update, reset)
        } else {
            await addData(body, service?.API_URL?.unitList.add, reset)
        }
    }
    const columns = [
        {
            name: 'Sr. No.',
            selector: (row: any, index: number) => index + 1,
            sortable: true,
            width: '10rem'
        },
        {
            name: 'ID',
            selector: (row: any) => row.unitId,
            sortable: true,
            width: '10rem'
        },
        {
            name: 'Unit Name',
            selector: (row: any) => row.unitName,
            sortable: true,
            width: '15rem'
        },
        {
            name: 'City',
            selector: (row: any) => row.city,
            sortable: true,
            width: '15rem'
        },
        {
            name: 'State',
            selector: (row: any) => row.state,
            sortable: true,
            width: '15rem'
        },
        {
            name: 'Country',
            selector: (row: any) => row.country,
            sortable: true,
            width: '20rem'
        },
        {
            name: 'Status',
            selector: (row: any) => (
                <StatusColumn row={row} />
            ),
            sortable: true,
        },
        {
            name: 'Action',
            selector: (row:any) => {
                return <><ActionButton edit history deleteAction
                    onClick={() => handleEdit(row?.unitId)}
                    handleConfirmDelete={() => handleOpenDelete(row?.unitId)}
                /> </>
            },
            sortable: false,
            width: '10rem',
        },
    ];
    const handleEdit = async (id: any) => {

        try {
            setMachineShopId(id)
            const editMachineRes: any = await getItemById(id, service.API_URL.unitList.getbyid);
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
        setMachineShopId(id)
        dispatch(confirmationOpen())
    }
    const handleConfirmDelete = async () => {
        if (machineShopId) {
            await deleteItem(machineShopId)
        }
    }
    return (
        <>

            <ManageMachineShop
                addBtnTitle="Add Unit"
                importBtnTitle="Import"
                exportBtnTitle="Export"
            />
            <ReusableTable
                columns={columns}
                data={data}
            />

            <Modal
                mdlTitle="Add Unit"
                btnSubmit="Save"
                openAddModal={openAddModal}
                onSubmit={handleSubmit(onSubmit)}
                body={
                    <div className="grid grid-cols-3 gap-4">
                        <div>
                            <label htmlFor="unitId" className="block text-gray-700">
                                ID
                            </label>
                            <input
                                {...register('unitId', {
                                    required: 'This field is required',
                                })}
                                id="unitId"
                                type="text"
                                className="block w-full px-3 py-2 border rounded mt-2"
                            />
                            {errors?.unitId?.message && (
                                <span className="text-red-500">
                                    {errors?.unitId?.message}
                                </span>
                            )}
                        </div>
                        <div>
                            <label htmlFor="unitName" className="block text-gray-700">
                                Unit Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                {...register('unitName', {
                                    required: 'This field is required',
                                })}
                                id="unitName"
                                type="text"
                                className="block w-full px-3 py-2 border rounded mt-2"
                            />
                            {errors?.unitName?.message && (
                                <span className="text-red-500">
                                    {errors?.unitName?.message}
                                </span>
                            )}
                        </div>
                        <div>
                            <label htmlFor="inputText3" className="block text-gray-700">
                                Country <span className="text-red-500">*</span>
                            </label>
                            <SelectBox
                                list={[{ id: 1, lins: 'india' }]}
                                keyField="id"
                                valueField="lins"
                                name="country"
                                control={control}
                                errors={errors}
                                className="block w-full px-3 py-2.5 border bg-white rounded mt-2"
                            />
                        </div>
                        <div>
                            <label htmlFor="inputText3" className="block text-gray-700">
                                State <span className="text-red-500">*</span>
                            </label>
                            <SelectBox
                                list={[{ id: 1, lins: 'Gujarat' }]}
                                keyField="id"
                                valueField="lins"
                                name="state"
                                control={control}
                                errors={errors}
                                className="block w-full px-3 py-2.5 border bg-white rounded mt-2"
                            />
                        </div>
                        <div>
                            <label htmlFor="inputText3" className="block text-gray-700">
                                City <span className="text-red-500">*</span>
                            </label>
                            <input
                                {...register('city', {
                                    required: 'This field is required',
                                })}
                                id="unitName"
                                type="text"
                                className="block w-full px-3 py-2 border rounded mt-2"
                            />
                            {errors?.unitName?.message && (
                                <span className="text-red-500">
                                    {errors?.unitName?.message}
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
                                    {...register('status')}
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
                title="Are you sure delete ?"
                footerButton={{ closeText: "No", confirmText: 'Yes' }}
            />
        </>)
}

export default page