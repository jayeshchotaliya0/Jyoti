'use client'
import ManageMachineShop from '@/component/TableCommanHeader/TableCommanHeader'
import ActionButton from '@/component/actionButton/ActionButton'
import Filter from '@/component/higherOrderComponent/Filter/Filter'
import Loader from '@/component/higherOrderComponent/loader/Loader'
import Modal from '@/component/higherOrderComponent/modal/Modal'

import ReusableTable from '@/component/react-data-table/Table'
import ConfirmPop from '@/utils/ConfirmPop/ConfirmPop'
import FilterArray from '@/utils/FilterArray'
import { StatusColumn, onlyAllowNumber } from '@/utils/functions/commonFunction'
import { confirmationClose, confirmationOpen, openModal } from '@/utils/redux/features/reduxData'
import SelectBox from '@/utils/selectBox/SelectBox'
import service from '@/utils/service/service'
import useFetchData from '@/utils/useFetchData/customFetchData'
import React, { useEffect, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
interface FormData {
  machineShopName: string
  machineShopCode: string
  machineShopOfId: string
  status: any
  unitId: any
}

interface RowData {
  id: number
  status: boolean
  [key: string]: any
}

interface Row {
  id: number
  status: boolean
}

const page = () => {
  const openAddModal = useSelector((state: any) => state.isModalOpen)
  const confirmationModal = useSelector((state: any) => state.isConfirmation)
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    control
  } = useForm<FormData>()

  const [machineShopId, setMachineShopId] = useState<any>()
  const [manageLineData, setManageLineData] = useState<RowData[]>([])


  const dispatch = useDispatch()
  const { data: machineshopData, loading, listData,addData, getListData, updateData,deleteItem, getItemById }:any = useFetchData(service?.API_URL?.machineShop?.listing)
  // const { data:machineShopOfData,} = useFetchData(service?.API_URL?.machineShopOf?.listing)
  
  const columns = React.useMemo(
    () => [
      {
        name: 'Sr. No.',
        selector: (row: any, index: number) => index + 1,
        sortable: true,
        width: '7rem',
      },
      {
        name: 'Machine Shop Name',
        selector: (row: any) => row.machineShopName,
        sortable: true,
      },
      {
        name: 'Machine Code',
        selector: (row: any) => row.machineShopCode,
        sortable: true,
      },
      {
        name: 'Unit Name',
        selector: (row: any) => row.unitName,
        sortable: true,
      },
      {
        name: 'No. of Lines',
        selector: (row: any) => row.totalLines,
        sortable: true,
      },
      {
        name: 'Machine Shop Of',
        selector: (row: any) => row.machineShopOfName,
        sortable: true,
      },
      {
        name: 'Status',
        selector: (row: Row) => (
          <StatusColumn row={row} onStatusChange={handleStatusChange} />
        ),
        sortable: true,
        width: '8rem',

      },
      {
        name: 'Action',
        selector: (row: any) => {
          return (
            <ActionButton
              edit
              history
              onClick={() => handleEdit(row?.machineShopId)}
              handleConfirmDelete={()=>handleOpenDelete(row?.machineShopId)}
            />
          )

        },
        width: '7rem',
        sortable: false,
      },
    ],
    [],
  )
  const handleStatusChange = (id: number) => {
    setManageLineData(
      manageLineData.map((row: any) =>
        row?.id === id ? { ...row, status: !row.status } : row,
      ),
    )
  }
  const handleOpenDelete=async(id:any)=>{
    setMachineShopId(id)
    dispatch(confirmationOpen())
  }
  const handleConfirmDelete=async()=>{
    if (machineShopId) {
      await deleteItem(machineShopId)
    }
  }
  const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
    const body = {
      ...data,
      machineShopId: machineShopId ? machineShopId : 0,
      isDelete: false,
    }
    if (machineShopId) {
      await updateData(body, service?.API_URL?.machineShop.update,reset)
    } else {
      await addData(body, service?.API_URL?.machineShop.add,reset)
    }
  }

  const handleEdit = async (id: any) => {
    
    try {
      setMachineShopId(id)
      const editMachineRes: any = await getItemById(id, service.API_URL.machineShop.getbyid);
      if (editMachineRes) {
        dispatch(openModal());
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
      // You can set some error state here if needed
    } finally {
    }
    // Perform your edit actions here
  }

  const modalListing = async () => {
    const apiUrls = {
      unitList: service?.API_URL?.unitList?.listing,
      machineShopOf: service?.API_URL?.machineShopOf?.listing,
    };
    await getListData(apiUrls);
  };

  useEffect(() => {
    if (openAddModal) {
      modalListing();
    }
  }, [openAddModal]);
  
    return (
    <>
      <ManageMachineShop
        addBtnTitle="Add Machine Shop"
        importBtnTitle="Import"
        exportBtnTitle="Export"
      />
      <Filter data={FilterArray.machineShop} />

      {loading ? <Loader /> : <ReusableTable columns={columns} data={machineshopData} />}
   
 
      <Modal
        mdlTitle=" Add Machine Shop"
        btnSubmit="Save"
        openAddModal={openAddModal}
        onSubmit={handleSubmit(onSubmit)}
        body={
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label htmlFor="inputText3" className="block text-gray-700">
                Machine Shop Name <span className="text-red-500">*</span>
              </label>
              <input
                {...register('machineShopName', {
                  required: 'This field is required',
                })}
                id="inputText3"
                type="text"
                className="block w-full px-3 py-2 border rounded mt-2"
              />
              {errors?.machineShopName?.message && (
                <span className="text-red-500">
                  {errors?.machineShopName?.message}
                </span>
              )}
            </div>

            <div className="">
              <label htmlFor="inputText3" className="block text-gray-700">
                Machine Code <span className="text-red-500">*</span>
              </label>
              <input
                {...register('machineShopCode', {
                  required: 'This field is required',
                })}
                id="inputText3"
                type="text"
                className="block w-full px-3 py-2 border rounded mt-2"
              />
              {errors?.machineShopCode?.message && (
                <span className="text-red-500">
                  {errors?.machineShopCode?.message}
                </span>
              )}
            </div>
            
            <div>
              <label htmlFor="inputText3" className="block text-gray-700">
                Unit<span className="text-red-500">*</span>
              </label>
              <SelectBox
                list={listData.unitList}
                keyField="unitId"
                valueField="unitName"
                name="unitId"
                control={control}
                errors={errors}
                className="block w-full px-3 py-2.5 border bg-white rounded mt-2"
              />
            </div>
            <div>
              <label htmlFor="inputText3" className="block text-gray-700">
                Machine Shop of <span className="text-red-500">*</span>
              </label>
              <SelectBox
                list={listData.machineShopOf}
                keyField="machineShopOfId"
                valueField="machineShopOfName"
                name="machineShopOfId"
                control={control}
                errors={errors}
                className="block w-full px-3 py-2.5 border bg-white rounded mt-2"
              />
              {errors.machineShopOfId && (
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
                  {...register('status', {})}
                  className="sr-only peer"
                />
                <div className="relative w-11 h-6 mt-4 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
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
          title="Are you sure want to go delete ?"
          footerButton={{closeText:"No",confirmText:'Yes'}}
      />
    </>
  )
}

export default page
