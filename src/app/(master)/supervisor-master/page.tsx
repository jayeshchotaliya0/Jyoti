'use client'
import ManageMachineShop from '@/component/TableCommanHeader/TableCommanHeader';
import ActionButton from '@/component/actionButton/ActionButton';
import Modal from '@/component/higherOrderComponent/modal/Modal';
;
import ReusableTable from '@/component/react-data-table/Table';
import { StatusColumn } from '@/utils/functions/commonFunction';
import SelectBox from '@/utils/selectBox/SelectBox';
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
interface FormData {
    name: string;

}

const page = () => {
    const openAddModal = useSelector((state: any) => state.isModalOpen)

    const { register, handleSubmit, formState: { errors },control } = useForm<FormData>();
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
            name: 'Supervisor Name',
            selector: (row:any) => row.supervisorname,
            sortable: true,
            width:'50rem'
        },
        {
            name: 'Shift',
            selector: (row:any) => row.shift,
            sortable: true,
            width:'30rem'
            
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
            supervisorname: 'Ayushi',
            shift: 'First', 
       },
        { 
            id: 2, 
            supervisorname: 'Ajay', 
            shift: 'Second', 
        }, 
        { 
            id: 3, 
            supervisorname: 'Mohit', 
            shift: 'First', 
        }, 
        { 
            id: 4, 
            supervisorname: 'Mansi', 
            shift: 'First', 
       },
        { 
            id: 5, 
            supervisorname: 'Jayesh', 
            shift: 'Second', 
        }, 
        { 
            id: 6, 
            supervisorname: 'MJ',
            shift: 'First',  
        }, 
        { 
            id: 7, 
            supervisorname: 'AP', 
            shift: 'First',  
        }, 
    ];
    return (
        <>

              <ManageMachineShop
                addBtnTitle="Add Supervisor"
                importBtnTitle="Import"
                exportBtnTitle="Export"
            />
                            <ReusableTable
                                columns={columns}
                                data={data}
                            />
              
              <Modal
                mdlTitle="Add Supervisor"
                btnSubmit="Save"
                openAddModal={openAddModal}
                onSubmit={handleSubmit(onSubmit)}
                body={
                        <div className="grid grid-cols-3 gap-4">
                            <div>
                                <label htmlFor="name" className="block text-gray-700">
                                Supervisor Name <span className="text-red-500">*</span>
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
                                Shift <span className="text-red-500">*</span>
                            </label>
                            <SelectBox
                            list={[{ id: 1, lins: 'PPC' },{ id: 2, lins: 'PPC2' }]}
                            keyField="id"
                            valueField="lins"
                            name="manageshop"
                            control={control}
                            errors={errors}
                            className="block w-full px-3 py-2.5 border bg-white rounded mt-2"
                            />
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