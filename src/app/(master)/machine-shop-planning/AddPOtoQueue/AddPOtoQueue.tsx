import Modal from '@/component/higherOrderComponent/modal/Modal';
import SelectBox from '@/utils/selectBox/SelectBox';
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

interface FormData {
  machineShop: string;
  shift: any;
  machineShopLine: any;
  machineCategory: any;
  workCenterName: any;
  workCenterDesc: any;
  workCenterType: any;
  asstManager: any;
  supervisorGroup: any;
  cycleTimeSplitter: any;
  cycleTimeSplitterSimulator: any;
  status: any;
}
const AddPOtoQueue = () => {
  const modals = useSelector((state: any) => state.modals);
  console.log("modals", modals)
  const {
    register,
    handleSubmit,

  } = useForm<FormData>();
  const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
  }
  return (
    <Modal
      mdlTitle="Import Machine Shop Planning to queue"
      btnSubmit="Save"
      openAddModal={modals.addPOtoQueue}
      onSubmit={handleSubmit(onSubmit)}
      closeName={'addPOtoQueue'}
      body={
        <div>
          <label htmlFor="breakName" className="block text-gray-700 mb-1">
            Planning of <span className="text-red-500">*</span>
          </label>
          <div className="flex items-center space-x-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="updateType"
                value="priority"
                className="form-radio text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2">Machine Shop</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="updateType"
                value="quantity"
                className="form-radio text-gray-600 focus:ring-gray-500"
              />
              <span className="ml-2">R & D Total Room</span>
            </label>
          </div>
          <div>
            <label htmlFor="inputText3" className="block text-gray-700 mb-1">
              Planning File  <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="file"
                className="border rounded block text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-l file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
              />
              <button className="px-4 py-1.5 text-white bg-blue-500 rounded hover:bg-blue-600 flex items-center">
                Import
              </button>
              <button className="px-4 py-1.5 text-white bg-green-500 rounded hover:bg-green-600 flex items-center">
                Format
              </button>
            </div>
          </div>
        </div >
      }
    />
  )
}

export default AddPOtoQueue