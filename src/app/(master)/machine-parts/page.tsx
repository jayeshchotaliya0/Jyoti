'use client'
import ManageMachineShop from '@/component/TableCommanHeader/TableCommanHeader'
import ActionButton from '@/component/actionButton/ActionButton'
import Filter from '@/component/higherOrderComponent/Filter/Filter'
import Modal from '@/component/higherOrderComponent/modal/Modal'
import ReusableTable from '@/component/react-data-table/Table'
import FilterArray from '@/utils/FilterArray'
import { StatusColumn } from '@/utils/functions/commonFunction'
import { add, deleteIcon, deleteIconsecond } from '@/utils/icons/icons'
import SelectBox from '@/utils/selectBox/SelectBox'
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
interface FormData {
  name: string
  status: boolean
}

const page = () => {
  const openAddModal = useSelector((state: any) => state.isModalOpen)

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<FormData>()
  const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
    console.log('data', data)
  }
  const columns = [
    {
        name: 'Part Deatils',
        selector: (row: any) => row.expandable,
        sortable: false,
        width: '10rem',
    },
    {
      name: 'Part No.',
      selector: (row: any) => row.partno,
      sortable: true,
      width: '10rem',
    },
    {
      name: 'Part Name',
      selector: (row: any) => row.partname,
      sortable: true,
      width: '10rem',
    },
    {
      name: 'Cell',
      selector: (row: any) => row.cell,
      sortable: true,
      width: '7rem',
    },
    {
      name: 'Cell Name',
      selector: (row: any) => row.cellname,
      sortable: true,
      width: '10rem',
    },
    {
      name: 'Unit Name',
      selector: (row: any) => row.unitname,
      sortable: true,
      width: '10rem',
    },
    {
      name: 'Work Center',
      selector: (row: any) => row.workcenter,
      sortable: true,
      width: '10rem',
    },
    {
      name: 'Min Order Qty.',
      selector: (row: any) => row.minorderqty,
      sortable: true,
      width: '10rem',
    },
    {
      name: 'Max Order Qty.',
      selector: (row: any) => row.maxorderqty,
      sortable: true,
      width: '10rem',
    },
    {
      name: 'Work MSQ',
      selector: (row: any) => row.msq,
      sortable: true,
      width: '8rem',
    },
    {
      name: 'Total Production Time',
      selector: (row: any) => row.totalproductiontime,
      sortable: true,
      width: '15rem',
    },
    {
      name: 'Active for Production Scheduling ',
      selector: (row: any) => (
        <label className="inline-flex items-center cursor-pointer">
          <input type="checkbox" value="" className="sr-only peer" checked />
          <div className="relative w-11 h-6 mt-2 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
        </label>
      ),
      sortable: true,
      width: '20rem',
    },
    {
      name: 'Status',
      selector: (row: any) => (
        <StatusColumn row={row}/>
      ),
      sortable: true,
    },
    {
      name: 'Last Changed',
      selector: (row: any) => row.lastchanged,
      sortable: true,
      width: '10rem',
    },
    {
      name: 'Action',
      selector: () => {
        return <><ActionButton edit history deleteAction/> </>
      },
      sortable: false,
      width: '10rem',
    },
  ]
  const data = [
    {
       expandable: true,
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
    // {
    //   partdeatils: '+',
    //   partno: 'PART-110111',
    //   partname: 'SPINDLE-187-12',
    //   cell: 'Yes',
    //   cellname: '03 SPINDLE-Cartridge',
    //   unitname: 'Unit 1',
    //   workcenter: 'GC02-OLD STUDER',
    //   minorderqty: '1',
    //   maxorderqty: '0',
    //   msq: '1',
    //   totalproductiontime: '8160 ()2 h 16 m)',
    //   lastchanged: 'USER1-PKJAIN',
    // },
    // {
    //   partdeatils: '+',
    //   partno: 'PART-110111',
    //   partname: 'SPINDLE-187-12',
    //   cell: 'Yes',
    //   cellname: '03 SPINDLE-Cartridge',
    //   unitname: 'Unit 2',
    //   workcenter: 'BR01-BORING',
    //   minorderqty: '1',
    //   maxorderqty: '0',
    //   msq: '1',
    //   totalproductiontime: '1800 (30 m )',
    //   lastchanged: 'USER1-PKJAIN',
    // },
  ]
  return (
    <>
      <ManageMachineShop
        addBtnTitle="Add Unit"
        importBtnTitle="Import"
        exportBtnTitle="Export"
      />
      <Filter data={FilterArray.machinePartsFilter} />

      <ReusableTable columns={columns} data={data} expandable />

      <Modal
        mdlTitle="Add Machine Part"
        btnSubmit="Save"
        openAddModal={openAddModal}
        onSubmit={handleSubmit(onSubmit)}
        body={
          <div className="machine_parts_add p-4 md:p-5 space-y-4 overflow-y-scroll">
            <div className="grid grid-cols-4 gap-4 shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] p-5 ">
              <div>
                <label htmlFor="name" className="block text-gray-700">
                  Part No.<span className="text-red-500">*</span>
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
                  <span className="text-red-500">{errors?.name?.message}</span>
                )}
              </div>
              <div>
                <label htmlFor="name" className="block text-gray-700">
                  Part Name <span className="text-red-500">*</span>
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
                  <span className="text-red-500">{errors?.name?.message}</span>
                )}
              </div>
              <div>
                <label htmlFor="name" className="block text-gray-700">
                  Min Order Qty. <span className="text-red-500">*</span>
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
                  <span className="text-red-500">{errors?.name?.message}</span>
                )}
              </div>
              <div>
                <label htmlFor="name" className="block text-gray-700">
                  Max Order Qty. <span className="text-red-500">*</span>
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
                  <span className="text-red-500">{errors?.name?.message}</span>
                )}
              </div>
              <div>
                <label htmlFor="name" className="block text-gray-700">
                  MSQ <span className="text-red-500">*</span>
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
                  <span className="text-red-500">{errors?.name?.message}</span>
                )}
              </div>
              <div>
                <label htmlFor="name" className="block text-gray-700">
                  Part Production Time <span className="text-red-500">*</span>
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
                  <span className="text-red-500">{errors?.name?.message}</span>
                )}
              </div>
              <div>
                <label htmlFor="name" className="block text-gray-700">
                  Cell <span className="text-red-500">*</span>
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
                  <span className="text-red-500">{errors?.name?.message}</span>
                )}
              </div>
              <div>
                <label htmlFor="name" className="block text-gray-700">
                  Machine Model <span className="text-red-500">*</span>
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
                  <span className="text-red-500">{errors?.name?.message}</span>
                )}
              </div>
              <div>
                <label htmlFor="name" className="block text-gray-700">
                  Sub Assembly Header<span className="text-red-500">*</span>
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
                  <span className="text-red-500">{errors?.name?.message}</span>
                )}
              </div>
              <div>
                <label htmlFor="name" className="block text-gray-700">
                  Category <span className="text-red-500">*</span>
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
                  <span className="text-red-500">{errors?.name?.message}</span>
                )}
              </div>
              <div>
                <label htmlFor="name" className="block text-gray-700">
                  Generic Name <span className="text-red-500">*</span>
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
                  <span className="text-red-500">{errors?.name?.message}</span>
                )}
              </div>
              <div>
                <label htmlFor="name" className="block text-gray-700">
                  Part of <span className="text-red-500">*</span>
                </label>
                <input
                  id="red-radio"
                  type="radio"
                  value=""
                  name="colored-radio"
                  className="w-4 h-4 bg-gray-100 border-gray-300 mt-5"
                />
                <label
                  htmlFor="red-radio"
                  className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300 mt-5"
                >
                  Machine Shop
                </label>
              </div>

              <div>
                <label htmlFor="inputText3" className="block text-gray-700">
                  Cell Name <span className="text-red-500">*</span>
                </label>
                <SelectBox
                  list={[{ id: 1, lins: 'Example' }]}
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
                  Unit Name <span className="text-red-500">*</span>
                </label>
                <SelectBox
                  list={[{ id: 1, lins: 'Example' }]}
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
                  Work Center <span className="text-red-500">*</span>
                </label>
                <SelectBox
                  list={[{ id: 1, lins: 'Example' }]}
                  keyField="id"
                  valueField="lins"
                  name="manageshop"
                  control={control}
                  errors={errors}
                  className="block w-full px-3 py-2.5 border bg-white rounded mt-2"
                />
              </div>
            </div>

            <div className="shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] p-5">
              <div className="grid grid-cols-2 gap-4 bg-white h-14">
                <div className="">
                  {' '}
                  <h4 className="font-bold">Operation 1</h4>
                </div>
                <div className="flex justify-end gap-1 p-3 rounded-lg ">
                  {deleteIconsecond}
                </div>
              </div>

              <div className="grid grid-cols-4 gap-4">
                <div>
                  <label htmlFor="name" className="block text-gray-700">
                    Operation Name<span className="text-red-500">*</span>
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
                  <label htmlFor="name" className="block text-gray-700">
                    Operation No <span className="text-red-500">*</span>
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
                  <label htmlFor="name" className="block text-gray-700">
                    Drawing No. <span className="text-red-500">*</span>
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
                  <label
                    className="block text-gray-700 mb-1 "
                    htmlFor="file-upload"
                  >
                    Part Drawing (PDF)
                  </label>
                  <div className="flex">
                    <input
                      type="text"
                      placeholder="example"
                      className="border h-10 mt-1 border-gray-300 rounded-l px-4 py-2 w-full focus:outline-none"
                      disabled
                    />
                    <label className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-r cursor-pointer w-60 mt-1 h-10">
                      Choose File
                      <input type="file" className="hidden" id="file-upload" />
                    </label>
                  </div>
                </div>
                <div>
                  <label htmlFor="name" className="block text-gray-700">
                    Total Operation Time <span className="text-red-500">*</span>
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
                  <label htmlFor="name" className="block text-gray-700">
                    Part Production Time <span className="text-red-500">*</span>
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
              </div>
              <div className="bg-slate-100 p-5 grid grid-cols-4 gap-4 mt-4">
                <div>
                  <label htmlFor="name" className="block text-gray-700">
                    Work Center <span className="text-red-500">*</span>
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
                  <label htmlFor="name" className="block text-gray-700">
                    Set Up Time <span className="text-red-500">*</span>
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
                  <label htmlFor="name" className="block text-gray-700">
                    Sub Set Up Time <span className="text-red-500">*</span>
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
                  <label htmlFor="name" className="block text-gray-700">
                    Cycle Time <span className="text-red-500">*</span>
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
                  <label htmlFor="name" className="block text-gray-700">
                    Loading/Unloading Time{' '}
                    <span className="text-red-500">*</span>
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
                  <label htmlFor="name" className="block text-gray-700">
                    Transit Time <span className="text-red-500">*</span>
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
                    Program Name <span className="text-red-500">*</span>
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
                <div className="mt-2 col-start-1 col-end-4">
                  <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                  >
                    + Add Alternate Work Center
                  </button>
                </div>
              </div>
              <div className="mt-4">
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                >
                  + Add More Operation
                </button>
              </div>
            </div>

            <div className="shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] p-5">
              <div className="grid grid-cols-2 gap-4 bg-white h-14">
                <div className="">
                  {' '}
                  <h4 className="font-bold">Pre-Process</h4>
                </div>
                <div className="flex justify-end gap-1 p-3 rounded-lg ">
                  {deleteIconsecond}
                </div>
              </div>

              <div className="grid grid-cols-4 gap-4">
                <div>
                  <label htmlFor="name" className="block text-gray-700">
                    Process No. <span className="text-red-500">*</span>
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
                  <label htmlFor="name" className="block text-gray-700">
                    Process <span className="text-red-500">*</span>
                  </label>
                  <SelectBox
                    list={[{ id: 1, lins: 'Example' }]}
                    keyField="id"
                    valueField="lins"
                    name="manageshop"
                    control={control}
                    errors={errors}
                    className="block w-full px-3 py-2.5 border bg-white rounded mt-2"
                  />
                </div>
                <div>
                  <label htmlFor="name" className="block text-gray-700">
                    Function <span className="text-red-500">*</span>
                  </label>
                  <SelectBox
                    list={[{ id: 1, lins: 'Example' }]}
                    keyField="id"
                    valueField="lins"
                    name="manageshop"
                    control={control}
                    errors={errors}
                    className="block w-full px-3 py-2.5 border bg-white rounded mt-2"
                  />
                </div>
                <div>
                  <label htmlFor="name" className="block text-gray-700">
                    Lead days <span className="text-red-500">*</span>
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
                  <label htmlFor="name" className="block text-gray-700">
                    Max Oty. <span className="text-red-500">*</span>
                  </label>
                  <div className="flex items-center gap-4">
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
                </div>
                <div className="flex items-center gap-4 mt-7">
                  <span className="bg-indigo-500 px-4 hover:bg-indigo-400 inline-block p-2.5 text-white mt-2">
                    {add}
                  </span>
                </div>
              </div>
            </div>

            <div className="shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] p-5">
              <div className="grid grid-cols-2 gap-4 bg-white h-14">
                <div className="">
                  {' '}
                  <h4 className="font-bold">Intermediate Process</h4>
                </div>
                <div className="flex justify-end gap-1 p-3 rounded-lg ">
                  {deleteIconsecond}
                </div>
              </div>

              <div className="grid grid-cols-4 gap-4">
                <div>
                  <label htmlFor="name" className="block text-gray-700">
                    Process <span className="text-red-500">*</span>
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
                  <label htmlFor="name" className="block text-gray-700">
                    Max Qty. <span className="text-red-500">*</span>
                  </label>
                  <div className="">
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
                </div>

                <div className="flex items-center gap-4 mt-7">
                  <span className="bg-red-600 px-4 hover:bg-red-400 inline-block p-2.5 text-white">
                    {deleteIcon}
                  </span>
                  <span className="bg-indigo-500 px-4 hover:bg-indigo-400 inline-block p-2.5 text-white">
                    {add}
                  </span>
                </div>
                <div className="col-start-1 col-end-2">
                  <label htmlFor="name" className="block text-gray-700">
                    Next Part <span className="text-red-500">*</span>
                  </label>
                  <SelectBox
                    list={[{ id: 1, lins: 'Example' }]}
                    keyField="id"
                    valueField="lins"
                    name="manageshop"
                    control={control}
                    errors={errors}
                    className="block w-full px-3 py-2.5 border bg-white rounded mt-2"
                  />
                </div>
              </div>
            </div>
          </div>
        }
      />
    </>
  )
}

export default page
