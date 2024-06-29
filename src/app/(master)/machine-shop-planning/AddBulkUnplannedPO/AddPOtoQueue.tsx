import Modal from '@/component/higherOrderComponent/modal/Modal';
import SelectBox from '@/utils/selectBox/SelectBox';
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

interface FormData {
  shiftName: string;
  }
const AddBulkUnplannedPO = () => {
    const modals = useSelector((state: any) => state.modals);
console.log("modals",modals)
    const {
        register,
        handleSubmit,
    
      } = useForm<FormData>();
  const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
  }
  return (
    <Modal
        mdlTitle="Add Bulk Unplanned PO"
        btnSubmit="Save"
        openAddModal={modals.addBulkUnplannedPO}
        onSubmit={handleSubmit(onSubmit)}
        closeName={'addBulkUnplannedPO'}
        body={
            <div className="grid grid-cols-2 gap-4">
            <div>
                    <label htmlFor="breakName" className="block text-gray-700">
                    Order No. <span className="text-red-500">*</span>
                    </label>
                    <input
                        {...register('shiftName', {
                            required: 'This field is required',
                        })}
                        id="shiftName"
                        type="text"
                        className="block w-full px-3 py-2 border rounded mt-2"
                    />
                </div>
                <div>
                <label htmlFor="inputText3" className="block text-gray-700">
                Reason <span className="text-red-500">*</span>
                </label>
                <input
                        {...register('shiftName', {
                            required: 'This field is required',
                        })}
                        id="shiftName"
                        type="text"
                        className="block w-full px-3 py-2 border rounded mt-2"
                    />
              </div>
              <div>
                <label htmlFor="inputText3" className="block text-gray-700">
                Part <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center space-x-2">
            <input
              type="file"
              className="border rounded block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-l file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
            />
            <button className="px-4 py-1.5 text-white bg-blue-500 rounded hover:bg-blue-600 flex items-center">
              Import
            </button>
            <button className="px-4 py-1.5 text-white bg-green-500 rounded hover:bg-green-600 flex items-center">
              Format
            </button>
          </div>
              </div>
              <div>
                    <label htmlFor="breakName" className="block text-gray-700">
                    Qty. <span className="text-red-500">*</span>
                    </label>
                    <input
                        {...register('shiftName', {
                            required: 'This field is required',
                        })}
                        id="shiftName"
                        type="text"
                        className="block w-full px-3 py-2 border rounded mt-2"
                    />
                </div>
                <div>
                    <label htmlFor="breakName" className="block text-gray-700">
                    Header Priority <span className="text-red-500">*</span>
                    </label>
                    <input
                        {...register('shiftName', {
                            required: 'This field is required',
                        })}
                        id="shiftName"
                        type="text"
                        className="block w-full px-3 py-2 border rounded mt-2"
                    />
                </div>
                <div>
                    <label htmlFor="breakName" className="block text-gray-700">
                    Priority <span className="text-red-500">*</span>
                    </label>
                    <input
                        {...register('shiftName', {
                            required: 'This field is required',
                        })}
                        id="shiftName"
                        type="text"
                        className="block w-full px-3 py-2 border rounded mt-2"
                    />
                </div>
            <button
          className="font-bold p-5 flex items-center justify-center text-white bg-indigo-500 hover:bg-indigo-600 focus:ring-4 focus:ring-indigo-300 font-medium text-sm px-5 py-2 mb-2 focus:outline-none mt-8"
          style={{ minWidth: "120px", height: "32px" }}
        >
          Submit
        </button>
            <div>

                </div>
          </div>
        }
      />
  )
}

export default AddBulkUnplannedPO