'use client'
import ManageMachineShop from '@/component/TableCommanHeader/TableCommanHeader';
import ActionButton from '@/component/actionButton/ActionButton';
import Filter from '@/component/higherOrderComponent/Filter/Filter';
import DatePickerComman from '@/component/higherOrderComponent/datepicker/DatePickerComman';
import Modal from '@/component/higherOrderComponent/modal/Modal';
;
import ReusableTable from '@/component/react-data-table/Table';
import FilterArray from '@/utils/FilterArray';
import { StatusColumn } from '@/utils/functions/commonFunction';
import SelectBox from '@/utils/selectBox/SelectBox';
import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
interface FormData {
    name: string;
    status:boolean;
}

const page = () => {
  const columns = [

    {
        name: 'Priority',
        selector: (row: any) => row.priority,
        sortable: true,
        width: '10rem'
    },
    {
        name: 'Order No',
        selector: (row: any) => row.orderno,
        sortable: true,
        width: '10rem'
    },
    {
      name: 'Part No/Name',
      selector: (row: any) => row.partnoname,
      sortable: true,
      width: '15rem'
  },
  {
    name: 'Op. NO',
    selector: (row: any) => row.opno,
    sortable: true,
    width: '10rem'
},
{
  name: 'Qty',
  selector: (row: any) => row.qty,
  sortable: true,
  width: '10rem'
},
{
  name: 'Setup Time',
  selector: (row: any) => row.setuptime,
  sortable: true,
  width: '10rem'
},
{
  name: 'Cycle Time',
  selector: (row: any) => row.cycletime,
  sortable: true,
  width: '10rem'
},
{
  name: 'Start Date',
  selector: (row: any) => row.startdate,
  sortable: true,
  width: '10rem'
},
{
  name: 'End Date',
  selector: (row: any) => row.enddate,
  sortable: true,
  width: '10rem'
},

    
]; 
const data=[
  {
    priority: 'A-57',
    orderno: '203811',
    partnoname: 'K511020 SPINDLE',
    opno: '40',
    qty: '2',
    setuptime: '50 m',
    cycletime: '2 h. 40 m',
    startdate: '04/06/2024 07:30:00 AM',
    enddate: '04/06/2024 07:30:00 AM',
 },
]
   
    return (
        <>

              <ManageMachineShop
            />
            <DatePickerComman 
          title="Deadline Date" 
          datePickerTxt="To" 
          btnText="Force Move to Alt W/C"
          btnClass="font-bold p-5 flex items-center justify-center text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-indigo-300 font-medium text-sm px-5 py-2 mb-2 focus:outline-none mt-8" 
      />
      <div className="grid grid-cols-2 gap-2 mb-4 mt-4 gap-x-16 relative">
        <div className="bg-white p-4">
          <div>
          <div className='flex items-center gap-2 flex-wrap'>
          <button className="bg-blue-500 text-white px-2 py-1 rounded-[30px] w-max text-sm">BR01</button>
          <button className="bg-blue-500 text-white px-2 py-1 rounded-[30px] w-max text-sm">GC 01</button>
          <button className="bg-blue-500 text-white px-2 py-1 rounded-[30px] w-max text-sm">GC 03</button>
          <button className="bg-blue-500 text-white px-2 py-1 rounded-[30px] w-max text-sm">GC 09</button>
          <button className="bg-blue-500 text-white px-2 py-1 rounded-[30px] w-max text-sm">GC 14</button>
          <button className="bg-blue-500 text-white px-2 py-1 rounded-[30px] w-max text-sm">GS 02</button>
          <button className="bg-blue-500 text-white px-2 py-1 rounded-[30px] w-max text-sm">UM 07</button>
          <button className="bg-blue-500 text-white px-2 py-1 rounded-[30px] w-max text-sm">UM 17</button>
          <button className="bg-blue-500 text-white px-2 py-1 rounded-[30px] w-max text-sm">UM 05</button>
          <button className="bg-blue-500 text-white px-2 py-1 rounded-[30px] w-max text-sm">UM 06</button>
          <button className="bg-blue-500 text-white px-2 py-1 rounded-[30px] w-max text-sm">UM 08</button>
          <button className="bg-blue-500 text-white px-2 py-1 rounded-[30px] w-max text-sm">UM 09</button>
          <button className="bg-blue-500 text-white px-2 py-1 rounded-[30px] w-max text-sm">UM 12</button>
          <button className="bg-blue-500 text-white px-2 py-1 rounded-[30px] w-max text-sm">UM 14</button>
          <button className="bg-blue-500 text-white px-2 py-1 rounded-[30px] w-max text-sm">VM 11</button>
          </div>
          <div className='mt-5 mb-4 max-w-64'>
            <label className="w-full block mb-2">
            From Workcenter
            </label>
          <select className="w-full border border-gray-300 px-4 py-2">
            <option>Select Workcenter</option>
          </select>
          </div>
          <ReusableTable
                      columns={columns}
                      data={data}
                      selectableRows
                  />
        </div>
        </div>
        <div className="flex items-center space-x-2 mb-4 absolute justify-center inset-x-0 w-max m-auto">
          <button className="bg-green-500 w-max text-white px-4 py-2 rounded">Apply</button>
        </div>
        <div className="bg-white p-4">
          <div>
        <div className='flex items-center gap-2 flex-wrap'>
          <button className="bg-blue-500 text-white px-2 py-1 rounded-[30px] w-max text-sm">BR01</button>
          <button className="bg-blue-500 text-white px-2 py-1 rounded-[30px] w-max text-sm">GC 01</button>
          <button className="bg-blue-500 text-white px-2 py-1 rounded-[30px] w-max text-sm">GC 03</button>
          <button className="bg-blue-500 text-white px-2 py-1 rounded-[30px] w-max text-sm">GC 09</button>
          <button className="bg-blue-500 text-white px-2 py-1 rounded-[30px] w-max text-sm">GC 14</button>
          <button className="bg-blue-500 text-white px-2 py-1 rounded-[30px] w-max text-sm">GS 02</button>
          <button className="bg-blue-500 text-white px-2 py-1 rounded-[30px] w-max text-sm">UM 07</button>
          <button className="bg-blue-500 text-white px-2 py-1 rounded-[30px] w-max text-sm">UM 17</button>
          <button className="bg-blue-500 text-white px-2 py-1 rounded-[30px] w-max text-sm">UM 05</button>
          <button className="bg-blue-500 text-white px-2 py-1 rounded-[30px] w-max text-sm">UM 06</button>
          <button className="bg-blue-500 text-white px-2 py-1 rounded-[30px] w-max text-sm">UM 08</button>
          <button className="bg-blue-500 text-white px-2 py-1 rounded-[30px] w-max text-sm">UM 09</button>
          <button className="bg-blue-500 text-white px-2 py-1 rounded-[30px] w-max text-sm">UM 12</button>
          <button className="bg-blue-500 text-white px-2 py-1 rounded-[30px] w-max text-sm">UM 14</button>
          <button className="bg-blue-500 text-white px-2 py-1 rounded-[30px] w-max text-sm">VM 11</button>
          <button className="bg-blue-500 text-white px-2 py-1 rounded-[30px] w-max text-sm">GC 14</button>
          <button className="bg-blue-500 text-white px-2 py-1 rounded-[30px] w-max text-sm">GS 02</button>
          <button className="bg-blue-500 text-white px-2 py-1 rounded-[30px] w-max text-sm">UM 07</button>
          <button className="bg-blue-500 text-white px-2 py-1 rounded-[30px] w-max text-sm">UM 17</button>
          <button className="bg-blue-500 text-white px-2 py-1 rounded-[30px] w-max text-sm">UM 05</button>
          <button className="bg-blue-500 text-white px-2 py-1 rounded-[30px] w-max text-sm">UM 06</button>
          <button className="bg-blue-500 text-white px-2 py-1 rounded-[30px] w-max text-sm">UM 08</button>
          <button className="bg-blue-500 text-white px-2 py-1 rounded-[30px] w-max text-sm">UM 09</button>
          <button className="bg-blue-500 text-white px-2 py-1 rounded-[30px] w-max text-sm">UM 12</button>
          <button className="bg-blue-500 text-white px-2 py-1 rounded-[30px] w-max text-sm">UM 14</button>
          <button className="bg-blue-500 text-white px-2 py-1 rounded-[30px] w-max text-sm">VM 11</button>
          <button className="bg-blue-500 text-white px-2 py-1 rounded-[30px] w-max text-sm">GC 14</button>
          <button className="bg-blue-500 text-white px-2 py-1 rounded-[30px] w-max text-sm">GS 02</button>
          <button className="bg-blue-500 text-white px-2 py-1 rounded-[30px] w-max text-sm">UM 07</button>
          <button className="bg-blue-500 text-white px-2 py-1 rounded-[30px] w-max text-sm">UM 17</button>
          <button className="bg-blue-500 text-white px-2 py-1 rounded-[30px] w-max text-sm">UM 05</button>
          <button className="bg-blue-500 text-white px-2 py-1 rounded-[30px] w-max text-sm">UM 06</button>
          <button className="bg-blue-500 text-white px-2 py-1 rounded-[30px] w-max text-sm">UM 08</button>
          <button className="bg-blue-500 text-white px-2 py-1 rounded-[30px] w-max text-sm">UM 09</button>
          <button className="bg-blue-500 text-white px-2 py-1 rounded-[30px] w-max text-sm">UM 12</button>
          <button className="bg-blue-500 text-white px-2 py-1 rounded-[30px] w-max text-sm">UM 14</button>
          <button className="bg-blue-500 text-white px-2 py-1 rounded-[30px] w-max text-sm">VM 11</button>
          </div>
        </div>
        </div>
      </div>


            
        </>)
}

export default page