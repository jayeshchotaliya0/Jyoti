'use client'
import ManageMachineShop from '@/component/TableCommanHeader/TableCommanHeader';
;
import ReusableTable from '@/component/react-data-table/Table';

import React from 'react'

const page = () => {

    const columns = [
        {
            name: 'Sr. No.',
            selector: (row: any) => row.id,
            sortable: true,

        },
        {
            name: 'Form Visible',
            selector: (row: any) => <>
                <input type="checkbox"/>
            </>,
            sortable: true,
        },
        {
            name: 'Form Name',
            selector: (row: any) => row.machineShopName,
            sortable: true,
        },
        {
            name: 'Parent Menu Name',
            selector: (row: any) => row.machineCode,
            sortable: true,
        },

    ];
    const data = [
        {
            id: 1,
            title: 'The Shawshank Redemption',
            machineShopName: 'Machine Shop',
            machineCode: 'Parent Menu Name',

        },
        {
            id: 2,
            title: 'The Shawshank Redemption',
            machineShopName: 'Line',
            machineCode: 'Parent Menu Name',

        },
        {
            id: 3,
            title: 'The Shawshank Redemption',
            machineShopName: 'Machine Main Category',
            machineCode: 'Parent Menu Name',

        },
        {
            id: 4,
            title: 'The Shawshank Redemption',
            machineShopName: 'Machine Sub Category',
            machineCode: 'Parent Menu Name',

        },


    ];
    // ================================
    const columnss = [
        {
            name: 'Sr. No.',
            selector: (row: any) => row.id,
            sortable: true,
          

        },
        {
            name: 'Field Name',
            selector: (row: any) => row.fieldname,
            sortable: true,
        },
        {
            name: 'View',
            selector: (row: any) => <>
                <input type="checkbox"/>
            </>,
            sortable: true,
        },
        {
            name: 'Edit',
            selector: (row: any) => <>
                <input type="checkbox"/>
            </>,
            sortable: true,
        },



    ];
    const datas = [
        {
            id: 1,
            title: 'The Shawshank Redemption',
            fieldname: 'Machine Shop',
            machineCode: 'Parent Menu Name',

        },
        {
            id: 2,
            title: 'The Shawshank Redemption',
            fieldname: 'Line',
            machineCode: 'Parent Menu Name',

        },
        {
            id: 3,
            title: 'The Shawshank Redemption',
            fieldname: 'Machine Main Category',
            machineCode: 'Parent Menu Name',

        },
        {
            id: 4,
            title: 'The Shawshank Redemption',
            fieldname: 'Machine Sub Category',
            machineCode: 'Parent Menu Name',

        },


    ];
    return (
        <>
            <ManageMachineShop
                title="Manage line"
                addBtnTitle=""
            />
            <div className="grid gap-4 grid-cols-2 mt-6">
                <div className="grid gap-6 grid-cols-2">
                    <div>
                        <span className="">Role Code</span>
                        <select className="block  w-full h-12 px-4 bg-white text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option>10 Records</option>
                            <option>20 Records</option>
                        </select>
                    </div>

                    <div>
                        <span className="">Module name</span>
                        <select className="block   w-full h-12 px-4 bg-white text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option>10 Records</option>
                            <option>20 Records</option>
                        </select>
                    </div>
                </div>
                <div className="flex justify-end mt-7">
                    <button type="button" className="text-white h-10 bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 font-medium text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Update</button>
                </div>
            </div>
            <div className="grid gap-4 grid-cols-2 mt-1">
                <div className="min-w-full py-2 inline-block">
                    <ReusableTable
                        columns={columns}
                        data={data}
                    />
                </div>
                <div className="min-w-full py-2 inline-block">
                <ReusableTable
                    columns={columnss}
                    data={datas}
                />
            </div>
            
            </div>

           
        </>)
}

export default page