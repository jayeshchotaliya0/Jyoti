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
            name: 'Cell Name',
            selector: (row:any) => row.cellname,
            sortable: true,
            width:'40rem'
        },
        {
            name: 'Work Center',
            selector: (row:any) => row.workcenter,
            sortable: true,
             width:'30rem'
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
            cellname: 'TURRET - BODY - 1 (JST80 & JST63)',
            workcenter: 'MC-05 - HM06, MC-05 - TC13', 
       },
        { 
            id: 2, 
            cellname: 'TURRET - TOOL DISC', 
            workcenter: 'MC-05 - VM29, MC-05 - GS12', 
        }, 
        { 
            id: 3, 
            cellname: 'HEIGHT PIECE', 
            workcenter: 'MC-04 - UM06', 
        }, 
       
    ];
    return (
        <>

              <ManageMachineShop
                addBtnTitle="Add Work Center and Cell Mapping"
                importBtnTitle="Import"
                exportBtnTitle="Export"
            />
            <Filter data={FilterArray.workcenterandcellmappingFilter} />
                            <ReusableTable
                                columns={columns}
                                data={data}
                            />
              
              <Modal
                mdlTitle="Add Work Center and Cell Mapping"
                btnSubmit="Save"
                openAddModal={openAddModal}
                onSubmit={handleSubmit(onSubmit)}
                body={
                        <div className="grid grid-cols-3 gap-4">
                           
                            <div>
                                <label htmlFor="name" className="block text-gray-700">
                                Cell Name <span className="text-red-500">*</span>
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
                            Work Center <span className="text-red-500">*</span>
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
                        </div>
                }
            />
        </>)
}

export default page