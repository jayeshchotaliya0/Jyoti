'use client'
import ManageMachineShop from '@/component/TableCommanHeader/TableCommanHeader';
import ActionButton from '@/component/actionButton/ActionButton';
import Filter from '@/component/higherOrderComponent/Filter/Filter';
import Input from '@/component/higherOrderComponent/input';
import Modal from '@/component/higherOrderComponent/modal/Modal';
;
import ReusableTable from '@/component/react-data-table/Table';
import FilterArray from '@/utils/FilterArray';
import { StatusColumn } from '@/utils/functions/commonFunction';
import SelectBox from '@/utils/selectBox/SelectBox';
import service from '@/utils/service/service';
import useFetchData from '@/utils/useFetchData/customFetchData';

import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
interface FormData {
  machineMainCategory: string;
  machineSubCategory: string;
  machineMake: string;
  model: string;
  workCenter: string;
  installationDate: string;
  warrantyEndDate: string;
  machineSrNo: string;
  controllerSoftwareVersion: string;
  billDate?: string;
  controllerBrand: string;
  hourlyCost: string;
  amc?: string;
  insured: string;
  machineCode: string;
  unit: string;
  pallet: string;
  status: any;


}
const page = () => {
  const openAddModal = useSelector((state: any) => state.isModalOpen)
  const { data, loading, error, addData } = useFetchData(service?.API_URL?.manageMachine.listing);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<FormData>()

  const columns = [
    {
      name: 'Sr. No.',
      selector: (row: any) => row.id,
      sortable: true,
      width: '7rem'
    },
    {
      name: 'Machine Shop',
      selector: (row: any) => row.machineShop,
      sortable: true,
      width: '15rem'
    },
    {
      name: 'Unit Name',
      selector: (row: any) => row.unitname,
      sortable: true,
      width: '10rem'

    },
    {
      name: 'Line',
      selector: (row: any) => row.line,
      sortable: true,
    },
    {
      name: 'Work Center',
      selector: (row: any) => row.workCenter,
      sortable: true,
      width: '15rem'
    },
    {
      name: 'Machine Modal',
      selector: (row: any) => row.machineModal,
      sortable: true,
      width: '15rem'
    },
    {
      name: 'Machine Make',
      selector: (row: any) => row.machinemake,
      sortable: true,
      width: '15rem'
    },
    {
      name: 'Machine Code',
      selector: (row: any) => row.machinecode,
      sortable: true,
      width: '15rem'
    },
    {
      name: 'Pallet Count',
      selector: (row: any) => row.palletcount,
      sortable: true,
      width: '15rem'
    },
    {
      name: 'Machine Sr. No.',
      selector: (row: any) => row.machineSrNo,
      sortable: true,
      width: '15rem'
    },
    {
      name: 'Installation Date',
      selector: (row: any) => row.installationDate,
      sortable: true,
      width: '15rem'
    },
    {
      name: 'Controller-Software Ver.',
      selector: (row: any) => row.controllerSoftwareVersion,
      sortable: true,
      width: '15rem'
    },

    {
      name: 'Warranty Status',
      selector: (row: any) => row.warrantyStatus,
      sortable: true,
      width: '15rem'
    },
    {
      name: 'Start Date',
      selector: (row: any) => row.startdate,
      sortable: true,
      width: '15rem'
    },
    {
      name: 'End Date',
      selector: (row: any) => row.enddate,
      sortable: true,
      width: '15rem'
    },
    {
      name: 'Remarks',
      selector: (row: any) => row.remarks,
      sortable: true,
      width: '15rem'
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
        return <><ActionButton edit history deleteAction /> </>
      },
      sortable: false,
      width: '10rem',
    },
  ]


  const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
    console.log('data', data)


  }


  return (

    <>
      <ManageMachineShop
        addBtnTitle="Add Machine"
        importBtnTitle="Import"
        exportBtnTitle="Export"
      />
      <Filter data={FilterArray.manageMachine} />
      <ReusableTable columns={columns} data={data || []} />

      <Modal
        mdlTitle="Add Machine"
        btnSubmit="Save"
        openAddModal={openAddModal}
        onSubmit={handleSubmit(onSubmit)}
        body={
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label htmlFor="inputText3" className="block text-gray-700">
                Machine Shop <span className="text-red-500">*</span>
              </label>
              <SelectBox
                list={
                  [{ id: 1, lins: 'example 1' }]}
                keyField="idslfjdkh"
                valueField="lins"
                name="machineshop"
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
                list={
                  [{ id: 1, lins: 'example 1' }]}
                keyField="idslfjdkh"
                valueField="lins"
                name="unitname"
                control={control}
                errors={errors}
                className="block w-full px-3 py-2.5 border bg-white rounded mt-2"
              />
            </div>
            <div>
              <label htmlFor="inputText3" className="block text-gray-700">
                Line <span className="text-red-500">*</span>
              </label>
              <SelectBox
                list={
                  [{ id: 1, lins: 'example 1' }]}
                keyField="idslfjdkh"
                valueField="lins"
                name="line"
                control={control}
                errors={errors}
                className="block w-full px-3 py-2.5 border bg-white rounded mt-2"
              />
            </div>
            <div>
              <label htmlFor="inputText3" className="block text-gray-700">
                Machine Main Category <span className="text-red-500">*</span>
              </label>
              <SelectBox
                list={
                  [{ id: 1, lins: 'example 1' }]}
                keyField="idslfjdkh"
                valueField="lins"
                name="machinemaincategory"
                control={control}
                errors={errors}
                className="block w-full px-3 py-2.5 border bg-white rounded mt-2"
              />
            </div>
            <div>
              <label htmlFor="inputText3" className="block text-gray-700">
                Machine Sub Category <span className="text-red-500">*</span>
              </label>
              <SelectBox
                list={
                  [{ id: 1, lins: 'example 1' }]}
                keyField="idslfjdkh"
                valueField="lins"
                name="machinesubcategory"
                control={control}
                errors={errors}
                className="block w-full px-3 py-2.5 border bg-white rounded mt-2"
              />
            </div>
            <div>
              <label htmlFor="inputText3" className="block text-gray-700">
                Machine Make <span className="text-red-500">*</span>
              </label>
              <SelectBox
                list={
                  [{ id: 1, lins: 'example 1' }]}
                keyField="idslfjdkh"
                valueField="lins"
                name="machinemake"
                control={control}
                errors={errors}
                className="block w-full px-3 py-2.5 border bg-white rounded mt-2"
              />
            </div>
            <div>
              <label htmlFor="inputText3" className="block text-gray-700">
                Machine Modal <span className="text-red-500">*</span>
              </label>
              <SelectBox
                list={
                  [{ id: 1, lins: 'example 1' }]}
                keyField="idslfjdkh"
                valueField="lins"
                name="machinemodal"
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
                list={
                  [{ id: 1, lins: 'example 1' }]}
                keyField="idslfjdkh"
                valueField="lins"
                name="workcenter"
                control={control}
                errors={errors}
                className="block w-full px-3 py-2.5 border bg-white rounded mt-2"
              />
            </div>
            <div>
              <label htmlFor="name" className="block text-gray-700">
                Installation Date <span className="text-red-500">*</span>
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
                Warranty End Date <span className="text-red-500">*</span>
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
                Warranty Status <span className="text-red-500">*</span>
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
                Controller Software Version <span className="text-red-500">*</span>
              </label>
              <SelectBox
                list={
                  [{ id: 1, lins: 'example 1' }]}
                keyField="idslfjdkh"
                valueField="lins"
                name="controllersoftwareversion"
                control={control}
                errors={errors}
                className="block w-full px-3 py-2.5 border bg-white rounded mt-2"
              />
            </div>
            <div>
              <label htmlFor="name" className="block text-gray-700">
                Bill Date <span className="text-red-500">*</span>
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
                Controller Brand <span className="text-red-500">*</span>
              </label>
              <SelectBox
                list={
                  [{ id: 1, lins: 'example 1' }]}
                keyField="idslfjdkh"
                valueField="lins"
                name="controllerbrand"
                control={control}
                errors={errors}
                className="block w-full px-3 py-2.5 border bg-white rounded mt-2"
              />
            </div>
            <div>
              <label htmlFor="name" className="block text-gray-700">
                Hourly Cost <span className="text-red-500">*</span>
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
                AMC (only after U/W) <span className="text-red-500">*</span>
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
                Insured <span className="text-red-500">*</span>
              </label>
              <SelectBox
                list={
                  [{ id: 1, lins: 'example 1' }]}
                keyField="idslfjdkh"
                valueField="lins"
                name="insured"
                control={control}
                errors={errors}
                className="block w-full px-3 py-2.5 border bg-white rounded mt-2"
              />
            </div>
            <div>
              <label htmlFor="name" className="block text-gray-700">
                Machine Code <span className="text-red-500">*</span>
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
                Machine Sr. No. <span className="text-red-500">*</span>
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
                Pallet Count <span className="text-red-500">*</span>
              </label>
              <SelectBox
                list={
                  [{ id: 1, lins: 'example 1' }]}
                keyField="idslfjdkh"
                valueField="lins"
                name="palletcount"
                control={control}
                errors={errors}
                className="block w-full px-3 py-2.5 border bg-white rounded mt-2"
              />
            </div>
            <div>
              <label htmlFor="name" className="block text-gray-700">
                Start Date <span className="text-red-500">*</span>
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
                End date. <span className="text-red-500">*</span>
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
                Remark <span className="text-red-500">*</span>
              </label>
              <SelectBox
                list={
                  [{ id: 1, lins: 'example 1' }]}
                keyField="idslfjdkh"
                valueField="lins"
                name="remark"
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

    </>
  )
}

export default page
