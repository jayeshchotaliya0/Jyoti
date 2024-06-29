'use client'
import ManageMachineShop from '@/component/TableCommanHeader/TableCommanHeader';
import ActionButton from '@/component/actionButton/ActionButton';
import Modal from '@/component/higherOrderComponent/modal/Modal';
;
import ReusableTable from '@/component/react-data-table/Table';
import { StatusColumn } from '@/utils/functions/commonFunction';
import { add, deleteIcon, deleteIconsecond } from '@/utils/icons/icons';
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
            name: 'Asst. Manager Name',
            selector: (row:any) => row.asstmanagername,
            sortable: true,
            width:'50rem'
        },
        {
            name: 'Shift',
            selector: (row:any) => row.shift,
            sortable: true,
             width:'23rem'
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
                return (<ActionButton edit history />)
            },
            sortable: false,
            width:'5rem'

        },
    ];
    const data = [
        { 
            id: 1, 
            asstmanagername: 'Ayushi',
            shift: 'First', 
       },
        { 
            id: 2, 
            asstmanagername: 'Ajay', 
            shift: 'Second', 
        }, 
        { 
            id: 3, 
            asstmanagername: 'Mohit', 
            shift: 'First', 
        }, 
        { 
            id: 4, 
            asstmanagername: 'Mansi', 
            shift: 'First', 
       },
        { 
            id: 5, 
            asstmanagername: 'Jayesh', 
            shift: 'Second', 
        }, 
        { 
            id: 6, 
            asstmanagername: 'MJ',
            shift: 'First',  
        }, 
        { 
            id: 7, 
            asstmanagername: 'AP', 
            shift: 'First',  
        }, 
    ];
    return (
        <>

              <ManageMachineShop
                // addBtnTitle="Save"
                // importBtnTitle="Cancel"
                // exportBtnTitle="Export"
                
            />
                <div className='items-center bg-white p-5 mt-3 grid-cols-1 flex-col	'>
                <div className='grid grid-cols-2 gap-4 bg-white h-14'>
                    <div className=''> <h4 className='font-bold'>Priority 1</h4></div>
                    <div className='flex justify-end gap-1 p-3 rounded-lg '>{deleteIconsecond}</div>
                </div>

                       <div className="box_left">
                       <div className="flex items-center gap-[20px] max-w-[850px]">
                          <div className='w-full'>
                          <label htmlFor="name" className="block text-gray-700">
                          Priority Name<span className="text-red-500">*</span>
                                </label>
                                <input
                                    {...register('name', {
                                        required: 'This field is required',
                                    })}
                                    id="name"
                                    type="text"
                                    className="block w-full px-3 py-2 border rounded mt-2"
                                />
                          </div>
                          <div className='w-full'>
                          <label htmlFor="name" className="block text-gray-700">
                          Overall Weightage % <span className="text-red-500">*</span>
                                </label>
                                <input
                                    {...register('name', {
                                        required: 'This field is required',
                                    })}
                                    id="name"
                                    type="text"
                                    className="block w-full px-3 py-2 border rounded mt-2"
                                />
                                
                          </div>
                          </div>
                          <div className="flex items-center gap-[20px] mt-6 max-w-[850px]">
                          <div className='w-full'>
                          <label htmlFor="name" className="block text-gray-700">
                          Priority Options <span className="text-red-500">*</span>
                                </label>
                                <input
                                    {...register('name', {
                                        required: 'This field is required',
                                    })}
                                    id="name"
                                    type="text"
                                    className="block w-full px-3 py-2 border rounded mt-2"
                                />
                               
                          </div>
                          <div className='w-full'>
                          <label htmlFor="name" className="block text-gray-700">
                          Weightage % <span className="text-red-500">*</span>
                                </label>
                                <div className='flex items-center gap-[20px]'>
                                <input
                                    {...register('name', {
                                        required: 'This field is required',
                                    })}
                                    id="name"
                                    type="text"
                                    className="block w-full px-3 py-2 border rounded mt-2"
                                />
                                 <span className='bg-red-600 mt-2.5 px-4 hover:bg-red-400 inline-block p-2.5 text-white'>{deleteIcon}</span>
                                 </div>
                          </div>
                          </div>
                          <div className="flex items-center gap-[20px] max-w-[850px]">
                          <div className='w-full'>
                                <input
                                    {...register('name', {
                                        required: 'This field is required',
                                    })}
                                    id="name"
                                    type="text"
                                    className="block w-full px-3 py-2 border rounded mt-2"
                                />
                          </div>
                          <div className='w-full'>
                          <div className='flex items-center gap-[20px]'>
                                <input
                                    {...register('name', {
                                        required: 'This field is required',
                                    })}
                                    id="name"
                                    type="text"
                                    className="block w-full px-3 py-2 border rounded mt-2"
                                />
                                <span className='bg-indigo-500 mt-2.5 px-4 hover:bg-indigo-400 inline-block p-2.5 text-white'>{add}</span>
                                </div>
                          </div>
                          </div>

                      </div>
                      
                      
                     
                </div> 
                <div className='items-center bg-white p-5 mt-3 grid-cols-1 flex-col	'>
                <div className='grid grid-cols-2 gap-4 bg-white h-14'>
                    <div className=''> <h4 className='font-bold'>Priority 2</h4></div>
                    <div className='flex justify-end gap-1 p-3 rounded-lg '>{deleteIconsecond}</div>
                </div>

                       <div className="box_left">
                       <div className="flex items-center gap-[20px] max-w-[850px]">
                          <div className='w-full'>
                          <label htmlFor="name" className="block text-gray-700">
                          Priority Name<span className="text-red-500">*</span>
                                </label>
                                <input
                                    {...register('name', {
                                        required: 'This field is required',
                                    })}
                                    id="name"
                                    type="text"
                                    className="block w-full px-3 py-2 border rounded mt-2"
                                />
                          </div>
                          <div className='w-full'>
                          <label htmlFor="name" className="block text-gray-700">
                          Overall Weightage % <span className="text-red-500">*</span>
                                </label>
                                <input
                                    {...register('name', {
                                        required: 'This field is required',
                                    })}
                                    id="name"
                                    type="text"
                                    className="block w-full px-3 py-2 border rounded mt-2"
                                />
                                
                          </div>
                          </div>
                          <div className="flex items-center gap-[20px] mt-6 max-w-[850px]">
                          <div className='w-full'>
                          <label htmlFor="name" className="block text-gray-700">
                          Priority Options <span className="text-red-500">*</span>
                                </label>
                                <input
                                    {...register('name', {
                                        required: 'This field is required',
                                    })}
                                    id="name"
                                    type="text"
                                    className="block w-full px-3 py-2 border rounded mt-2"
                                />
                               
                          </div>
                          <div className='w-full'>
                          <label htmlFor="name" className="block text-gray-700">
                          Weightage % <span className="text-red-500">*</span>
                                </label>
                                <div className='flex items-center gap-[20px]'>
                                <input
                                    {...register('name', {
                                        required: 'This field is required',
                                    })}
                                    id="name"
                                    type="text"
                                    className="block w-full px-3 py-2 border rounded mt-2"
                                />
                                 <span className='bg-red-600 mt-2.5 px-4 hover:bg-red-400 inline-block p-2.5 text-white'>{deleteIcon}</span>
                                 </div>
                          </div>
                          </div>
                          <div className="flex items-center gap-[20px] max-w-[850px]">
                          <div className='w-full'>
                                <input
                                    {...register('name', {
                                        required: 'This field is required',
                                    })}
                                    id="name"
                                    type="text"
                                    className="block w-full px-3 py-2 border rounded mt-2"
                                />
                          </div>
                          <div className='w-full'>
                          <div className='flex items-center gap-[20px]'>
                                <input
                                    {...register('name', {
                                        required: 'This field is required',
                                    })}
                                    id="name"
                                    type="text"
                                    className="block w-full px-3 py-2 border rounded mt-2"
                                />
                                <span className='bg-indigo-500 mt-2.5 px-4 hover:bg-indigo-400 inline-block p-2.5 text-white'>{add}</span>
                                </div>
                          </div>
                          </div>

                      </div>
                      
                      
                     
                </div> 
                <div className="mt-9 flex items-center  rounded-b  row-start-2 row-end-3 col-start-1 col-end-3">
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              >
                + Add Priority
              </button>
            </div>  
        </>)
}

export default page