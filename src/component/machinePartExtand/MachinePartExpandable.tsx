'use client'
import React from 'react'
import ReusableTable from '../react-data-table/Table'

const MachinePartExpandable = () => {
    const columns = [
       
        {
            name: 'Part No.',
            selector: (row:any) => row.partno,
            sortable: true,
            width:'10rem'
        },
        {
            name: 'Part Name',
            selector: (row:any) => row.partname,
            sortable: true,
             width:'10rem'
        },
        {
            name: 'Cell',
            selector: (row:any) => row.cell,
            sortable: true,
             width:'7rem'
        },
        {
            name: 'Cell Name',
            selector: (row:any) => row.cellname,
            sortable: true,
             width:'7rem'
        },
        {
            name: 'Unit Name',
            selector: (row:any) => row.unitname,
            sortable: true,
             width:'8rem'
        },
        {
            name: 'Work Center',
            selector: (row:any) => row.workcenter,
            sortable: true,
             width:'8rem'
        },
        {
            name: 'Min Order Qty.',
            selector: (row:any) => row.minorderqty,
            sortable: true,
             width:'6rem'
        },
        {
            name: 'Max Order Qty.',
            selector: (row:any) => row.maxorderqty,
            sortable: true,
             width:'6rem'
        },
        {
            name: 'Work MSQ',
            selector: (row:any) => row.msq,
            sortable: true,
             width:'8rem'
        },
        {
            name: 'Total Production Time',
            selector: (row:any) => row.totalproductiontime,
            sortable: true,
             width:'12rem'
        },
      
      
    ];
    const data = [
        { 
            partno: 'PART-110111', 
            partname: 'SPINDLE-187-12', 
            cell: 'Yes', 
            cellname: '03 SPINDLE-Cartridge', 
            unitname: 'Unit 1', 
            workcenter: 'DP01-DRILLING', 
            minorderqty: '1', 
            maxorderqty: '0', 
            msq: '1', 
            totalproductiontime: '8160 ()2 h 16 m)', 
            lastchanged: 'USER1-PKJAIN',   
       },
       { 
        partno: 'PART-110111', 
        partname: 'SPINDLE-187-12', 
        cell: 'Yes', 
        cellname: '03 SPINDLE-Cartridge', 
        unitname: 'Unit 1', 
        workcenter: 'GC02-OLD STUDER', 
        minorderqty: '1', 
        maxorderqty: '0', 
        msq: '1', 
        totalproductiontime: '8160 ()2 h 16 m)', 
        lastchanged: 'USER1-PKJAIN',   
        },
        { 
            partdeatils: '+', 
            partno: 'PART-110111', 
            partname: 'SPINDLE-187-12', 
            cell: 'Yes', 
            cellname: '03 SPINDLE-Cartridge', 
            unitname: 'Unit 2', 
            workcenter: 'BR01-BORING', 
            minorderqty: '1', 
            maxorderqty: '0', 
            msq: '1', 
            totalproductiontime: '1800 (30 m )', 
            lastchanged: 'USER1-PKJAIN',   
            },

    ];
    return (
        <ReusableTable
            columns={columns}
            data={data}
        />
    )
}

export default MachinePartExpandable