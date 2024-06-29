'use client'
import ManageMachineShop from '@/component/TableCommanHeader/TableCommanHeader'
import ActionButton from '@/component/actionButton/ActionButton'
import Filter from '@/component/higherOrderComponent/Filter/Filter'
import Input from '@/component/higherOrderComponent/input'
import Loader from '@/component/higherOrderComponent/loader/Loader'
import Modal from '@/component/higherOrderComponent/modal/Modal'
import ReusableTable from '@/component/react-data-table/Table'
import ConfirmPop from '@/utils/ConfirmPop/ConfirmPop'
import FilterArray from '@/utils/FilterArray'
import { StatusColumn } from '@/utils/functions/commonFunction'
import { confirmationClose, confirmationOpen, openModal } from '@/utils/redux/features/reduxData'
import SelectBox from '@/utils/selectBox/SelectBox'
import service from '@/utils/service/service'
import useFetchData from '@/utils/useFetchData/customFetchData'

import React, { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'

interface RowData {
  id: number
  status: boolean
  [key: string]: any
}

interface Row {
  id: number
  status: boolean
}
interface FormData {
  lineName: string;
  machineShopId:any;
  status:any;
}

const page = () => {
  const confirmationModal = useSelector((state: any) => state.isConfirmation)

  const  openAddModal= useSelector((state:any)=>state.isModalOpen)
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    reset
  } = useForm<FormData>()
  
  const [manageLineData, setManageLineData] = useState<RowData[]>([])
  const[machineLineId,setMachineLineId]=useState('')
const dispatch=useDispatch()

  // const { data, loading, error,addData } = useFetchData(service?.API_URL?.line?.getList);
  const { data, loading, error, addData,getListData,listData,getItemById,updateData,deleteItem} :any= useFetchData(service?.API_URL?.line?.getList);


  const handleStatusChange = (id: number) => {
    setManageLineData(
      manageLineData.map((row) =>
        row.id === id ? { ...row, status: !row.status } : row,
      ),
    )
  }


  const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
    const body = {
      ...data,
      lineId: machineLineId ? machineLineId : 0,
      isDelete: false,
    }
    if (machineLineId) {
      await updateData(body, service?.API_URL?.line.update,reset)
    } else {
      await addData(data,service.API_URL.line.add);
    }
  };

  const columns = [
    {
      name: 'Sr. No.',
      selector: (row: any) => row.id,
      sortable: true,
      width: '7rem',
    },
    {
      name: 'Machine Shop Name',
      selector: (row: any) => row?.machineShopName,
      sortable: true,
      width: '20rem',
    },
    {
      name: 'Machine Shop Code',
      selector: (row: any) => row?.machineShopCode,
      sortable: true,
      width: '20rem',
    },
    {
      name: 'Line Name',
      selector: (row: any) => row?.lineName,
      sortable: true,
      width: '20rem',
    },
    {
      name: 'Status',
      selector: (row: Row) => (
        <StatusColumn row={row} onStatusChange={handleStatusChange} />
      ),
      sortable: true,
    },
    {
      name: 'Action',
      selector: (row:any) => {
        return  <ActionButton edit history onClick={() => handleEdit(row?.lineId)}
        handleConfirmDelete={()=>handleOpenDelete(row?.lineId)}
        />

      },
      sortable: false,
      width: '7rem',
    },
  ]
  const handleEdit = async (id: any) => {
    try {
      setMachineLineId(id)
      dispatch(openModal())
      const editMachineRes: any = await getItemById(id, service.API_URL.line.getbyid);
      if (editMachineRes) {
        Object.keys(editMachineRes).forEach((key) => {
          setValue(key as keyof FormData, editMachineRes[key]);
        });
      
      } else {
        // Handle the case where apiStatus is false
        console.error('API call was not successful:', editMachineRes)
        // You can set some error state here if needed
      }
    } catch (error) {
      // Handle the error
      console.error('An error occurred while fetching the shop list:', error)
      // You can set some error state here if needed
    } 
    // Perform your edit actions here
  }
  const modalListing = async () => {
    const apiUrls = {
      line: service?.API_URL?.machineShop?.listing,
    };
    await getListData(apiUrls);
  };
  const handleOpenDelete=async(id:any)=>{
    setMachineLineId(id)
    dispatch(confirmationOpen())
  }
  const handleConfirmDelete=async()=>{
    if (machineLineId) {
      await deleteItem(machineLineId)
    }
  }
  useEffect(() => {
    if (openAddModal) {
      modalListing();
    }
  }, [openAddModal]);

  return (
    <>
      <ManageMachineShop
        addBtnTitle={'Add line'}
        importBtnTitle="Import"
        exportBtnTitle="Export"
      />
       <Filter data={FilterArray.machineLine} />
      {loading ? (
        <Loader />
      ) : (
        <ReusableTable columns={columns} data={data} />
      )}
      <Modal
        mdlTitle={`${machineLineId ? 'Update Line' : 'Add Line'}`}
        btnSubmit="Save"
        openAddModal={openAddModal}
        onSubmit={handleSubmit(onSubmit)}
        reset={()=>reset()}
        body={
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label htmlFor="inputText3" className="block text-gray-700">
                  Machine Shop Name <span className="text-red-500">*</span>
                </label>
                <SelectBox
                  list={listData.line}
                  keyField="machineShopId"
                  valueField="machineShopName"
                  name="machineShopId"
                  control={control}
                  errors={errors}
                  className="block w-full px-3 py-2.5 border bg-white rounded mt-2"
                />
              </div>

              <div>
                <label htmlFor="inputText3" className="block text-gray-700">
                Line Name <span className="text-red-500">*</span>
                </label>
                <Input
                  type='text'
                  className="block w-full px-3 py-2 border rounded mt-2"
                  {...register('lineName', {
                    required: true,
                    }
                  )
                  }
                />
                {errors.lineName && (
                  <span className="text-red-500">This field is required</span>
                )}
              </div>
              <div>
                  <label htmlFor="inputText3" className="block text-gray-700">
                      Status
                  </label>
                  <label className="inline-flex items-center cursor-pointer">
                      <input
                      type="checkbox"
                      {...register('status')}
                      className="sr-only peer"
                      />
                      <div className="relative w-11 h-6 mt-5 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                  </label>
                  </div>
            </div>
        }
      />
       <ConfirmPop  
          isOpen={confirmationModal}
          headingText='Confirmation'
          onClose={() =>dispatch(confirmationClose())}
          onClickInChild={handleConfirmDelete}
          title="Are you sure want to go with the following implementation?"
          footerButton={{closeText:"No",confirmText:'Yes'}}
      />
    </>
  )
}

export default page