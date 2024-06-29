'use client'
import ManageMachineShop from '@/component/TableCommanHeader/TableCommanHeader';
import ActionButton from '@/component/actionButton/ActionButton';
import Filter from '@/component/higherOrderComponent/Filter/Filter';
import Modal from '@/component/higherOrderComponent/modal/Modal';
;
import ReusableTable from '@/component/react-data-table/Table';
import { StatusColumn, formatTime } from '@/utils/functions/commonFunction';
import FilterArray from '@/utils/FilterArray';
import service from '@/utils/service/service';
import useFetchData from '@/utils/useFetchData/customFetchData';
import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
interface FormData {
    name: string;
    status:boolean;
}
interface RowData {
    id: number
    status: boolean
    [key: string]: any
  }

const page = () => {
    const [shiftMaster, setShiftMaster] = useState<RowData[]>([])

    const openAddModal = useSelector((state: any) => state.isModalOpen)
    const { data, loading, error,addData} = useFetchData(service?.API_URL?.shiftmaster?.listing);

    const { register, handleSubmit, formState: { errors },control } = useForm<FormData>();
    const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
        console.log('data', data)
    }

    const handleStatusChange = (id: number) => {
        setShiftMaster(
          shiftMaster.map((row) =>
            row.id === id ? { ...row, status: !row.status } : row,
          ),
        )
      }
    const columns = [
        {
            name: 'Sr. No.',
            selector: (row:any) => row.shiftId,
            sortable: true,
            width:'7rem'
        },
        {
            name: 'Id',
            selector: (row:any) => row.id,
            sortable: true,
            width:'7rem'
        },
        {
            name: 'Shift Name',
            selector: (row:any) => row.shiftName,
            sortable: true,
            width:'30rem'
        },
        {
            name: 'Shift Start Time',
            selector: (row:any) => formatTime(row.startTime),
            sortable: true,
             width:'20rem'
        },
        {
            name: 'End Time ',
            selector: (row:any) => formatTime(row.endTime),
            sortable: true,
             width:'20rem'
        },
        {
            name: 'Status',
            selector: (row: any) => (
                <StatusColumn row={row} onStatusChange={handleStatusChange} />
            ),
            sortable: true
        },
        {
            name: 'Action',
            selector: () => {
                return (<ActionButton edit history />)
            },
            sortable: false,
            width:'5rem'

        },
    ];
    
    return (
        <>

              <ManageMachineShop
                addBtnTitle="Add Shift "
                importBtnTitle="Import"
                exportBtnTitle="Export"
            />
            <Filter data={FilterArray.shiftmasterFilter} />
                            <ReusableTable
                                columns={columns}
                                data={data}
                            />
              
              <Modal
                mdlTitle="Add Shift"
                btnSubmit="Save"
                openAddModal={openAddModal}
                onSubmit={handleSubmit(onSubmit)}
                body={
                        <div className="grid grid-cols-3 gap-4">
                           
                            <div>
                                <label htmlFor="name" className="block text-gray-700">
                                Shift Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    {...register('name', {
                                        required: 'This field is required',
                                    })}
                                    id="name"
                                    type="text"
                                    className="block w-full px-3 py-2 border rounded mt-2"
                                />
                                {errors?.name?.message && (
                                    <span className="text-red-500">
                                        {errors?.name?.message}
                                    </span>
                                )}
                            </div>
                            <div>
                                <label htmlFor="name" className="block text-gray-700">
                                Start Time <span className="text-red-500">*</span>
                                </label>
                                <input
                                    {...register('name', {
                                        required: 'This field is required',
                                    })}
                                    id="name"
                                    type="text"
                                    className="block w-full px-3 py-2 border rounded mt-2"
                                />
                                {errors?.name?.message && (
                                    <span className="text-red-500">
                                        {errors?.name?.message}
                                    </span>
                                )}
                            </div>
                            <div>
                                <label htmlFor="name" className="block text-gray-700">
                                End Time <span className="text-red-500">*</span>
                                </label>
                                <input
                                    {...register('name', {
                                        required: 'This field is required',
                                    })}
                                    id="name"
                                    type="text"
                                    className="block w-full px-3 py-2 border rounded mt-2"
                                />
                                {errors?.name?.message && (
                                    <span className="text-red-500">
                                        {errors?.name?.message}
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
                    </div>
                    
                }
            />
        </>)
}

export default page