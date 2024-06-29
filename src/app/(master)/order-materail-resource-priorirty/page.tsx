'use client'
import ManageMachineShop from '@/component/TableCommanHeader/TableCommanHeader';
import ActionButton from '@/component/actionButton/ActionButton';
import Filter from '@/component/higherOrderComponent/Filter/Filter';
import Modal from '@/component/higherOrderComponent/modal/Modal';
;
import ReusableTable from '@/component/react-data-table/Table';
import FilterArray from '@/utils/FilterArray';
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
            selector: (row: any) => <label className="inline-flex items-center cursor-pointer">
            <input type="checkbox" value="" className="sr-only peer" checked />
            <div className="relative w-11 h-6 mt-5 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
          </label>,
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
                // addBtnTitle="Batch Timing"
                importBtnTitle="Import"
                exportBtnTitle="Export"
            />
            <Filter data={FilterArray.ordermaterailresourcepriorirtyFilter} />
                <div className="mt-5 mx-auto bg-white p-8 rounded shadow">
        <form>
            <div className="grid grid-cols-4 gap-x-8 gap-y-6 mb-4">
                <div>
                    <label htmlFor="customerID" className="block text-sm font-medium text-gray-700">Customer ID *</label>
                    <select id="customerID" className="mt-1 block w-full p-2 border border-gray-300 rounded">
                        <option>Select Customer Id</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="orderID" className="block text-sm font-medium text-gray-700">Order ID *</label>
                    <select id="orderID" className="mt-1 block w-full p-2 border border-gray-300 rounded">
                        <option>Select Order Id</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="orderType" className="block text-sm font-medium text-gray-700">Order Type *</label>
                    <select id="orderType" className="mt-1 block w-full p-2 border border-gray-300 rounded">
                    <option>Sales</option>
                    <option>After Sales</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="orderSubType" className="block text-sm font-medium text-gray-700">Order Sub Type *</label>
                    <select id="orderSubType" className="mt-1 block w-full p-2 border border-gray-300 rounded">
                        <option>Planned</option>
                        <option>Unplanned</option>
                    </select>
                </div>
                <div>
                <input type="radio" id="makeToOrder" name="orderOption" className="mr-2"/>
                <label htmlFor="makeToOrder" className="text-sm font-medium text-gray-700">Make to Order</label>
                </div>
                <div>
                <div>
                    <input type="radio" id="catalog" name="orderOption" className="mr-2"/>
                    <label htmlFor="catalog" className="text-sm font-medium text-gray-700">Catalog</label>
                    <select id="customerPriorityLevel" className="mt-1 block w-full p-2 border border-gray-300 rounded">
                        <option>select</option>
                    </select>
                </div>
                </div>
                <div>
                    <label htmlFor="materialAvailability" className="block text-sm font-medium text-gray-700">Material Availability *</label>
                    <select id="materialAvailability" className="mt-1 block w-full p-2 border border-gray-300 rounded">
                        <option>Available</option>
                        <option>Not Available</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="machineAvailability" className="block text-sm font-medium text-gray-700">Machine Availability *</label>
                    <select id="machineAvailability" className="mt-1 block w-full p-2 border border-gray-300 rounded">
                    <option>Available</option>
                    <option>Not Available</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="customerPriorityLevel" className="block text-sm font-medium text-gray-700">Customer Priority Level *</label>
                    <select id="customerPriorityLevel" className="mt-1 block w-full p-2 border border-gray-300 rounded">
                        <option>High</option>
                        <option>Medium</option>
                        <option>Low</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="manpowerAvailability" className="block text-sm font-medium text-gray-700">Manpower Availability *</label>
                    <select id="manpowerAvailability" className="mt-1 block w-full p-2 border border-gray-300 rounded">
                    <option>Available</option>
                    <option>Not Available</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="fixture" className="block text-sm font-medium text-gray-700">Fixture *</label>
                    <select id="fixture" className="mt-1 block w-full p-2 border border-gray-300 rounded">
                    <option>Available</option>
                    <option>Not Available</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="tool" className="block text-sm font-medium text-gray-700">Tool *</label>
                    <select id="tool" className="mt-1 block w-full p-2 border border-gray-300 rounded">
                    <option>Available</option>
                    <option>Not Available</option>
                    </select>
                </div>
            </div>
            <div className="flex items-center justify-end p-4 md:p-5 space-x-3 border-gray-200 rounded-b dark:border-gray-600 row-start-2 row-end-3 col-start-1 col-end-3">
            <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              >
                Save
              </button>
              <button
                type="button"
               
                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
              >
                Cancel
              </button>
            </div>
        </form>
    </div>  
        </>)
}

export default page