import Modal from '@/component/higherOrderComponent/modal/Modal';
import SelectBox from '@/utils/selectBox/SelectBox';
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

interface FormData {
    status: any;
  }
const AddBulkToQueue = () => {
    const modals = useSelector((state: any) => state.modals);
console.log("modals",modals)
    const {
        register,
        handleSubmit,
        list,
        keyField,
        valueField,
        name,
        className,
        control,
        errors
      } = useForm<FormData>();
  const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
    
  }
  return (
    <Modal
        mdlTitle="New Production Order"
        btnSubmit="Save"
        openAddModal={modals.addBulkToQueue}
        onSubmit={handleSubmit(onSubmit)}
        closeName={'addBulkToQueue'}
        body={
            <div className="grid grid-cols-2 gap-4">
            <div>
                    <label htmlFor="breakName" className="block text-gray-700">
                    Production Number <span className="text-red-500">*</span>
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
                  <label htmlFor="breakName" className="block text-gray-700 mb-1 ">
                  Planning of <span className="text-red-500">*</span>
                  </label>
                  <div className="flex items-center space-x-4 mt-4">
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
              </div>
              <div>
                    <label htmlFor="breakName" className="block text-gray-700">
                    Part  <span className="text-red-500">*</span>
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
                    Qty <span className="text-red-500">*</span>
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
                    Priority  <span className="text-red-500">*</span>
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
                        type="date"
                        className="block w-full px-3 py-2 border rounded mt-2"
                    />
                </div>
                <div>
                    <label htmlFor="breakName" className="block text-gray-700">
                    Header Priority <span className="text-red-500">*</span>
                    </label>
                    <SelectBox
                  list={[
                    { id: 1, lins: 'Select Reason' },
                    { id: 2, lins: 'Machine Shop Fixture Part' },
                    { id: 3, lins: 'Maintenance Part' },
                    { id: 4, lins: 'Pair part not available' },
                    { id: 5, lins: 'R&D Fixture Part' },
                    { id: 6, lins: 'Rework Material' },
                  ]}
                  keyField="id"
                  valueField="lins"
                  name="cellOwner"
                  control={control}
                  errors={errors}
                  className="block w-full px-3 py-2.5 border bg-white rounded mt-2"
                />
                </div>
                <div><button className='font-bold flex items-center justify-center text-white bg-teal-500 hover:bg-teal-600 focus:ring-4 focus:ring-teal-300 font-medium text-sm px-5 py-2.5 mb-2 focus:outline-none'>Submit</button></div>
            </div>
        }
      />
  )
}

export default AddBulkToQueue