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
const AddPlannedProduction = () => {
    const modals = useSelector((state: any) => state.modals);
    console.log("🚀 ~ page ~ modals:", modals)
  
    const {
      register,
      handleSubmit,
      formState: { errors },
      setValue,
  
      control,
    } = useForm<FormData>()
      
  const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
  
  }

  return (
    <Modal
        mdlTitle="Add Work Center"
        btnSubmit="Save"
        openAddModal={modals.plannedProduction}

        onSubmit={handleSubmit(onSubmit)}
        closeName={'plannedProduction'}
        body={
            <>
            </>
        }
      />
  )
}

export default AddPlannedProduction