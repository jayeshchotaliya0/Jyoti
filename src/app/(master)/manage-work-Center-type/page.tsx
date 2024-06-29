'use client'
import ManageMachineShop from '@/component/TableCommanHeader/TableCommanHeader';
import ActionButton from '@/component/actionButton/ActionButton';
import Modal from '@/component/higherOrderComponent/modal/Modal';
;
import ReusableTable from '@/component/react-data-table/Table';
import { StatusColumn } from '@/utils/functions/commonFunction';

import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
interface FormData {
    name: string;

}

const page = () => {
    const openAddModal = useSelector((state: any) => state.isModalOpen)

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
    const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
        console.log('data', data)
    }
    const columns = [
        {
            name: 'Sr. No.',
            selector: (row:any) => row.id,
            sortable: true,
            width:'7rem'
        },
        {
            name: 'Work Center Type',
            selector: (row:any) => row.documentType,
            sortable: true,
            width:'75rem'
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
            selector: () => {
              return <><ActionButton edit history deleteAction/> </>
            },
            sortable: false,
            width: '10rem',
          },
    ];
    const data = [
        { 
            id: 1, 
            documentType: 'Machining', 
       },
        { 
            id: 2, 
            documentType: 'Assembly', 
        }, 
        { 
            id: 3, 
            documentType: 'Welding', 
        }, 
        { 
            id: 4, 
            documentType: 'Painting/Coating', 
       },
        { 
            id: 5, 
            documentType: 'Inspection/Quality Control', 
        }, 
        { 
            id: 6, 
            documentType: 'Packaging', 
        }, 
        { 
            id: 7, 
            documentType: 'Maintenance', 
        }, 
    ];
    return (
        <>
        
              <ManageMachineShop
                addBtnTitle="Add Work Center Type"
                importBtnTitle="Import"
                exportBtnTitle="Export"
            />
                            <ReusableTable
                                columns={columns}
                                data={data}
                            />
              
              <Modal
                mdlTitle="Add Work Center Type"
                btnSubmit="Save"
                openAddModal={openAddModal}
                onSubmit={handleSubmit(onSubmit)}
                body={
                        <div className="grid grid-cols-3 gap-4">
                            <div>
                                <label htmlFor="name" className="block text-gray-700">
                                Work Center Type <span className="text-red-500">*</span>
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
                            <label htmlFor="name" className="block text-gray-700 mt-2">
                            Status
                                </label>
                                <input type="checkbox" value="" className="sr-only peer" checked />
                <div className="relative w-11 h-6 mt-2 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
            
                            </div>
                        </div>
                }
            />
        </>)
}

export default page