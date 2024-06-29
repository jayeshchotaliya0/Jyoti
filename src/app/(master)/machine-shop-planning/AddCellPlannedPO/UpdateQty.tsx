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
    shiftName: string;
  }
const AddCellPlannedPO = () => {
    const modals = useSelector((state: any) => state.modals);
console.log("modals",modals)
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        reset,
        setError,
        control,
      } = useForm<FormData>();
  const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
  }
  return (
    <Modal
        mdlTitle="Add Cell Planned P.O."
        btnSubmit="Save"
        openAddModal={modals.addCellPlannedPO}
        onSubmit={handleSubmit(onSubmit)}
        closeName={'addCellPlannedPO'}

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
                Priority <span className="text-red-500">*</span>
                </label>
                <select className='block w-full px-3 py-2 border rounded mt-2'>
                  <option>Search Plan</option>
                </select>
              </div>
              <div>
                    <label htmlFor="breakName" className="block text-gray-700">
                    Plan Type. <span className="text-red-500">*</span>
                    </label>
                    <select className='block w-full px-3 py-2 border rounded mt-2'>
                  <option>Search Plan</option>
                </select>
                </div>
                <div>
                    <label htmlFor="breakName" className="block text-gray-700">
                    Cell Name <span className="text-red-500">*</span>
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
                    Part No <span className="text-red-500">*</span>
                    </label>
                    <select className='block w-full px-3 py-2 border rounded mt-2'>
                  <option>Search Plan</option>
                </select>
                </div>

                <div>
                    <label htmlFor="breakName" className="block text-gray-700">
                    Planned End Date Time <span className="text-red-500">*</span>
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
                    Planned Start Date Time <span className="text-red-500">*</span>
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
                    Actual End Date Time <span className="text-red-500">*</span>
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
                    Actual Start Date Time <span className="text-red-500">*</span>
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
                    Finished Qty. <span className="text-red-500">*</span>
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
                    WIP Qty. <span className="text-red-500">*</span>
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

export default AddCellPlannedPO