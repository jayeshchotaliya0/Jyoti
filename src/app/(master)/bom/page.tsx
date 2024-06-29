'use client'
import ManageMachineShop from '@/component/TableCommanHeader/TableCommanHeader';
import ActionButton from '@/component/actionButton/ActionButton';
import Filter from '@/component/higherOrderComponent/Filter/Filter';
import Modal from '@/component/higherOrderComponent/modal/Modal';
;
import ReusableTable from '@/component/react-data-table/Table';
import FilterArray from '@/utils/FilterArray';
import { StatusColumn } from '@/utils/functions/commonFunction';
import SelectBox from '@/utils/selectBox/SelectBox';
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
interface FormData {
    name: string;
    status:boolean;
}

const page = () => {
    const openAddModal = useSelector((state: any) => state.isModalOpen)

    const { register, handleSubmit, formState: { errors },control } = useForm<FormData>();
    const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
        console.log('data', data)
    }
    const columns = [
        {
            name: 'Part Details',
            selector: (row:any) => row.partdetails,
            sortable: true,
            width:'10rem'
        },
        {
            name: 'Part No.',
            selector: (row:any) => row.partno,
            sortable: true,
            width:'15rem'
        },
        {
            name: 'Part Name',
            selector: (row:any) => row.partname,
            sortable: true,
            width:'15rem'
        },
        {
            name: 'Min Order Qty.',
            selector: (row:any) => row.minorderqty,
            sortable: true,
             width:'10rem'
        },
        {
            name: 'Max Order Qty.',
            selector: (row:any) => row.maxorderqty,
            sortable: true,
             width:'10rem'
        },
        {
            name: 'MSQ',
            selector: (row:any) => row.msq ,
            sortable: true,
            width:'10rem'
        },
        {
            name: 'Total Production Time',
            selector: (row:any) => row.totalproductiontime,
            sortable: true,
            width:'15rem'
        },
        {
            name: 'Cell',
            selector: (row:any) => row.cell,
            sortable: true,
            width:'10rem'
        },
        {
            name: 'Last Changed',
            selector: (row:any) => row.lastchanged,
            sortable: true,
            width:'15rem'
        },
        {
            name: 'Status',
            selector: (row: any) => (
              <StatusColumn row={row}/>
            ),
            sortable: true,
          },
          {
            name: 'Action',
            selector: () => {
              return <><ActionButton edit history deleteAction/> </>
            },
            sortable: false,
            width: '10rem',
          },
    ];
    const data = [
        { 
            partdetails: '+', 
            partno: 'A10101501100',
            partname: 'ENCODER BODY',
            minorderqty: '1',
            maxorderqty: '0',
            msq: '1', 
            totalproductiontime: '8160 ()2 h 16 m)',
            cell: '',
            lastchanged: '0000-00-00 00 00 00 ',
       },
        { 
            partdetails: '+', 
            partno: 'A10101501100',
            partname: 'ENCODER BODY',
            minorderqty: '1', 
            maxorderqty: '0',
            msq: '1', 
            totalproductiontime: '8160 ()2 h 16 m)',
            cell: '',
            lastchanged: '0000-00-00 00 00 00 ',
        }, 
        { 
            partdetails: '+', 
            partno: 'A10101501100',
            partname: 'ENCODER BODY',
            minorderqty: '1', 
            maxorderqty: '0',
            msq: '1', 
            totalproductiontime: '1800 (30 m )',
            cell: '',
            lastchanged: '0000-00-00 00 00 00 ',
        }, 
       
    ];
    return (
        <>

              <ManageMachineShop
                addBtnTitle="Add Bom"
                importBtnTitle="Import"
                exportBtnTitle="Export"
            />
            
            <Filter data={FilterArray.bomFilter} />
            
            
            <ReusableTable
                                columns={columns}
                                data={data}
                            />
              
              <Modal
                mdlTitle="Add Bom"
                btnSubmit="Save"
                openAddModal={openAddModal}
                onSubmit={handleSubmit(onSubmit)}
                body={
                        <div className="grid grid-cols-3 gap-4">
                            <div>
                                <label htmlFor="name" className="block text-gray-700">
                                Part No. <span className="text-red-500">*</span>
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
                                Part Name <span className="text-red-500">*</span>
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
                                Min Order Qty. <span className="text-red-500">*</span>
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
                                Max Order Qty. <span className="text-red-500">*</span>
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
                                MSQ <span className="text-red-500">*</span>
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
                                Total Production Time <span className="text-red-500">*</span>
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
                                Cell <span className="text-red-500">*</span>
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
                                Last Changed <span className="text-red-500">*</span>
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
                    
                }
            />
        </>)
}

export default page