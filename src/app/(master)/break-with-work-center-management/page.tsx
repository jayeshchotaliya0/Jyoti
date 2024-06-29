'use client'
import ManageMachineShop from '@/component/TableCommanHeader/TableCommanHeader';
import ActionButton from '@/component/actionButton/ActionButton';
import Modal from '@/component/higherOrderComponent/modal/Modal';
;
import ReusableTable from '@/component/react-data-table/Table';
import { StatusColumn } from '@/utils/functions/commonFunction';
import SelectBox from '@/utils/selectBox/SelectBox';
import service from '@/utils/service/service';
import useFetchData from '@/utils/useFetchData/customFetchData';
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
interface FormData {
    breakName: string;
    workCenter: string;
    startTime:string;
    endTime:string;
    duration:string;
    status:boolean;
}

const page = () => {
    const openAddModal = useSelector((state: any) => state.isModalOpen)
    const { data, loading, error, addData, updateData } = useFetchData(service?.API_URL?.breakWithWorkCenterManagement.listing)

    const { register, handleSubmit, formState: { errors }, control } = useForm<FormData>();

    const columns = [
        {
            name: 'Sr. No.',
            selector: (row: any, index: number) => index + 1,
            sortable: true,
            width: '7rem'
        },
        {
            name: 'Break Name',
            selector: (row: any) => row.breakName,
            sortable: true,
             width: '15rem'
        },
        {
            name: 'Shift',
            selector: (row: any) => row.shift,
            sortable: true,
             width: '15rem'
        },
        {
            name: 'Start Time',
            selector: (row: any) => row.startTime,
            sortable: true,
            width: '10rem'
        },
        {
            name: 'End Time',
            selector: (row: any) => row.endTime,
            sortable: true,
            width: '10rem'
        },
        {
            name: 'Duration',
            selector: (row: any) => row.duration,
            sortable: true,
            width: '40rem'

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
            selector: () => {
                return (<ActionButton edit history deleteAction />)
            },
            sortable: false,
            width: '10rem',
          },
    ];

    const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
        console.log('data', data)
    }
    const handleStatusChange = (id: number) => {
       
    }
    
    return (
        <>

            <ManageMachineShop
                addBtnTitle="Break with Shift Management"
                importBtnTitle="Import"
                exportBtnTitle="Export"
            />
            <ReusableTable
                columns={columns}
                data={data || []}
            />

            <Modal
                mdlTitle="Add Break with Shift Management"
                btnSubmit="Save"
                openAddModal={openAddModal}
                onSubmit={handleSubmit(onSubmit)}
                body={
                        <div className="grid grid-cols-3 gap-4">
                            <div>
                                <label htmlFor="inputText3" className="block text-gray-700">
                                Break Name <span className="text-red-500">*</span>
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
                                <label htmlFor="breakName" className="block text-gray-700">
                                Work Center <span className="text-red-500">*</span>
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
                                Start Time <span className="text-red-500">*</span>
                                </label>
                                <input
                                    {...register('workCenter', {
                                        required: 'This field is required',
                                    })}
                                    id="workCenter"
                                    type="time"
                                    className="block w-full px-3 py-2 border rounded mt-2"
                                />
                                {errors?.workCenter?.message && (
                                    <span className="text-red-500">
                                        {errors?.workCenter?.message}
                                    </span>
                                )}
                            </div>
                            <div>
                                <label htmlFor="workCenter" className="block text-gray-700">
                                End Time <span className="text-red-500">*</span>
                                </label>
                                <input
                                    {...register('workCenter', {
                                        required: 'This field is required',
                                    })}
                                    id="workCenter"
                                    type="time"
                                    className="block w-full px-3 py-2 border rounded mt-2"
                                />
                                {errors?.workCenter?.message && (
                                    <span className="text-red-500">
                                        {errors?.workCenter?.message}
                                    </span>
                                )}
                            </div>
                            
                    </div>

                }
            />
        </>)
}

export default page