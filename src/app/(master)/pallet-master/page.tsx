'use client'
import ManageMachineShop from '@/component/TableCommanHeader/TableCommanHeader';
import ActionButton from '@/component/actionButton/ActionButton';
import Filter from '@/component/higherOrderComponent/Filter/Filter';
import Modal from '@/component/higherOrderComponent/modal/Modal';
;
import ReusableTable from '@/component/react-data-table/Table';
import { StatusColumn } from '@/utils/functions/commonFunction';
import FilterArray from '@/utils/FilterArray';
import SelectBox from '@/utils/selectBox/SelectBox';
import service from '@/utils/service/service';
import useFetchData from '@/utils/useFetchData/customFetchData';
import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { confirmationClose, confirmationOpen, openModal } from '@/utils/redux/features/reduxData';
import ConfirmPop from '@/utils/ConfirmPop/ConfirmPop';
interface FormData {
    palletName: string;
    status: boolean;
    palletCount: any
}

const page = () => {
    const openAddModal = useSelector((state: any) => state.isModalOpen)
    const confirmationModal = useSelector((state: any) => state.isConfirmation)

    const { data, addData, updateData, deleteItem, getItemById }: any = useFetchData(service?.API_URL?.palletMaster.listing)
    const [palletId, setPalletId] = useState<any>()
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
            name: 'Pallet Name',
            selector: (row: any) => row.palletName,
            sortable: true,
            width: '40rem'
        },
        {
            name: 'Pallet Count ',
            selector: (row: any) => row.palletCount,
            sortable: true,
            width: '30rem'
        },
        {
            name: 'Status',
            selector: (row: any) => <StatusColumn row={row} />,
            sortable: true

        },
        {
            name: 'Action',
            selector: (row: any) => {
                return <><ActionButton edit history deleteAction
                    onClick={() => handleEdit(row?.palletId)}
                    handleConfirmDelete={() => handleOpenDelete(row?.palletId)}
                /> </>
            },
            sortable: false,
            width: '10rem',
        },
    ];
    const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
        const body = {
            ...data,
            palletId: palletId ? palletId : 0,
            isDelete: false,
        }
        if (palletId) {
            await updateData(body, service?.API_URL?.palletMaster.update, reset)
        } else {
            await addData(body, service?.API_URL?.palletMaster.add, reset)
        }
    }

    const handleEdit = async (id: any) => {

        try {
            setPalletId(id)
            const editMachineRes: any = await getItemById(id, service.API_URL.palletMaster.getbyid);
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
        setPalletId(id)
        dispatch(confirmationOpen())
    }
    const handleConfirmDelete = async () => {
        if (palletId) {
            await deleteItem(palletId)
        }
    }
    return (
        <>

            <ManageMachineShop
                addBtnTitle="Add Pallet "
                importBtnTitle="Import"
                exportBtnTitle="Export"
            />
            <Filter data={FilterArray.palletmasterFilter} />
            <ReusableTable
                columns={columns}
                data={data}
            />

            <Modal
                mdlTitle="Add Pallet"
                btnSubmit="Save"
                openAddModal={openAddModal}
                onSubmit={handleSubmit(onSubmit)}
                body={
                    <div className="grid grid-cols-3 gap-4">
                        <div>
                            <label htmlFor="palletName" className="block text-gray-700">
                                Pallet Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                {...register('palletName', {
                                    required: 'This field is required',
                                })}
                                id="palletName"
                                type="text"
                                className="block w-full px-3 py-2 border rounded mt-2"
                            />
                            {errors?.palletName?.message && (
                                <span className="text-red-500">
                                    {errors?.palletName?.message}
                                </span>
                            )}
                        </div>
                        <div>
                            <label htmlFor="palletCount" className="block text-gray-700">
                                Pallet Count <span className="text-red-500">*</span>
                            </label>
                            <SelectBox
                                list={[{ id: 1, counts: 1 }, { id: 2, counts: 2 }, { id: 3, counts: 4 }, { id: 4, counts: 6 }]}
                                keyField="id"
                                valueField="counts"
                                name="palletCount"
                                control={control}
                                errors={errors}
                                className="block w-full px-3 py-2.5 border bg-white rounded mt-2"
                            />
                        </div>
                        <div>
                            <label htmlFor="palletCount" className="block text-gray-700">
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