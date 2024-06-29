import Input from '@/component/higherOrderComponent/input'
import Modal from '@/component/higherOrderComponent/modal/Modal'
import { onlyAllowNumber } from '@/utils/functions/commonFunction'
import SelectBox from '@/utils/selectBox/SelectBox'
import { register } from 'module'
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
interface FormData {
    machineShop: string,
    shift:any,
    machineShopLine:any,
    machineCategory:any,
    workCenterName:any,
    workCenterDesc:any,
    workCenterType:any,
    asstManager:any,
    supervisorGroup:any,
    cycleTimeSplitter:any,
    cycleTimeSplitterSimulator:any,
    status: any,
    
  }
const UpdatePriority = () => {
    const modals = useSelector((state: any) => state.modals);
  
    const {
      register,
      handleSubmit,
    } = useForm<FormData>()
      
  const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
  
  }

  return (
    <Modal
        mdlTitle="Add Work Center"
        btnSubmit="Save"
        openAddModal={modals.updatePriority}

        onSubmit={handleSubmit(onSubmit)}
        closeName={'updatePriority'}

        body={
            <div className="grid grid-cols-3 gap-4">
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
  )
}

export default UpdatePriority