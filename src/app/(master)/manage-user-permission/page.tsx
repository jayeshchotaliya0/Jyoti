'use client'
import ManageMachineShop from '@/component/TableCommanHeader/TableCommanHeader';
import ActionButton from '@/component/actionButton/ActionButton';
;
import ReusableTable from '@/component/react-data-table/Table';

import React from 'react'

const page = () => {

    const columns = [
        {
            name: 'Sr. No.',
            selector: (row: any) => row.id,
            sortable: true,
            width: '7rem'
        },
        {
            name: 'Machine Shop Name',
            selector: (row: any) => row.title,
            sortable: true,
        },
        {
            name: 'Machine Code',
            selector: (row: any) => row.machineCode,
            sortable: true,
        },
        {
            name: 'Number of Lines',
            selector: (row: any) => row.numberofLines,
            sortable: true,
        },
        {
            name: 'Machine Shop of',
            selector: (row: any) => row.machineShopof,
            sortable: true,
        },
        {
            name: 'Status',
            selector: (row: any) => row.status,
            sortable: true,
        },
        {
            name: 'Action',
            selector: () => {
                return (<ActionButton edit history />)
            },
            sortable: false,
            width: '5rem'
        },
    ];
    const data = [
        {
            id: 1,
            title: 'The Shawshank Redemption',
            machineShopName: 'Shop 22',
            machineCode: 32,
            numberofLines: 4,
            machineShopof: "Machine Shop",
            status: "Active",
        },
        { id: 2, title: 'The Godfather', director: 'Francis Ford Coppola', year: 1972 }

    ];
    return (
        <>
            <ManageMachineShop
                title="Manage line"
                addBtnTitle="+ Add Line"
            />


            <ReusableTable
                columns={columns}
                data={data}
            />


        </>)
}

export default page