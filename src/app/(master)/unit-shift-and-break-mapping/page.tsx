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
            name: 'Sr. No.',
            selector: (row:any) => row.id,
            sortable: true,
            width:'7rem'
        },
        {
            name: 'Unit Name',
            selector: (row:any) => row.unitname,
            sortable: true,
             width:'20rem'
        },
        {
            name: 'Shift Name',
            selector: (row:any) => row.shiftname,
            sortable: true,
            width:'20rem'
        },
        {
            name: 'Break Name',
            selector: (row:any) => row.breakname,
            sortable: true,
             width:'20rem'
        },
        {
            name: 'Break Duration',
            selector: (row:any) => row.duration,
            sortable: true,
             width:'20rem'
        },
        // {
        //     name: 'Status',
        //     selector: (row: any) => (
        //       <StatusColumn row={row} />
        //     ),
        //     sortable: true,
        //   },
          {
            name: 'Action',
            selector: () => {
              return <><ActionButton edit history deleteAction/> </>
            },
            sortable: false,
            width: '7rem',
          },
    ];
    const data = [
        { 
            id: 1, 
            unitname: 'Unit -1', 
            shiftname: 'First Shift',
            breakname: 'Tea-1', 
            duration: '10 Minutes',
       },
        { 
            id: 2, 
            unitname: 'Unit -2', 
            shiftname: 'Second Shit', 
            breakname: 'Lunch', 
            duration: '40 Minutes',
        }, 
        { 
            id: 3, 
            unitname: 'Unit -3', 
            shiftname: 'Third Shift', 
            breakname: 'Tea-2', 
            duration: '10 Minutes',
        }, 
       
    ];
    return (
        <>

              <ManageMachineShop
                addBtnTitle="Add Unit, Shift & Break Mapping"
                importBtnTitle="Import"
                exportBtnTitle="Export"
            />
            <Filter data={FilterArray.unitshiftandbreakmappingFilter} />
                            <ReusableTable
                                columns={columns}
                                data={data}
                            />
              
              <Modal
                mdlTitle="Add Unit, Shift & Break Mapping"
                btnSubmit="Save"
                openAddModal={openAddModal}
                onSubmit={handleSubmit(onSubmit)}
                body={
                        <div className="grid grid-cols-3 gap-4">
                           
                        <div>
                            <label htmlFor="inputText3" className="block text-gray-700">
                            Unit Name <span className="text-red-500">*</span>
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
                            Shift Name <span className="text-red-500">*</span>
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
                            Break Name <span className="text-red-500">*</span>
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
                            {/* <div>
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
                            </div> */}
                        </div>
                }
            />
        </>)
}

export default page