'use client'
import ManageMachineShop from '@/component/TableCommanHeader/TableCommanHeader'
import ActionButton from '@/component/actionButton/ActionButton'
import Filter from '@/component/higherOrderComponent/Filter/Filter'
import Modal from '@/component/higherOrderComponent/modal/Modal'
import ReusableTable from '@/component/react-data-table/Table'
import { StatusColumn, showFormattedDate } from '@/utils/functions/commonFunction'
import FilterArray from '@/utils/FilterArray'
import service from '@/utils/service/service'
import useFetchData from '@/utils/useFetchData/customFetchData'
import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import SelectBox from '@/utils/selectBox/SelectBox'
import { confirmationClose, confirmationOpen, openModal } from '@/utils/redux/features/reduxData'
import ConfirmPop from '@/utils/ConfirmPop/ConfirmPop'
interface FormData {
  controllerName: string
  startDate: Date
  endDate: Date
  remarks: string
  status: boolean
}

const page = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    reset,
  } = useForm<FormData>()

  const dispatch = useDispatch()
  const [loader, setLoader] = useState(false)
  const [controllerMasterId, setControllerMasterId] = useState('')
  const [deleteId, setDeleteId] = useState('')
  const openAddModal = useSelector((state: any) => state.isModalOpen)
  const { data, loading, error, addData, updateData,getItemById,deleteItem} = useFetchData(
    service?.API_URL?.controllerMaster.listing,
  )
  const confirmationModal = useSelector((state: any) => state.isConfirmation)

  const columns = [
    {
      name: 'Sr. No.',
      selector: (row: any, index: number) => index + 1,
      sortable: true,
      width: '7rem',
    },
    {
      name: 'Name',
      selector: (row: any) => row.controllerName,
      sortable: true,
      width: '25rem',
    },
    {
      name: 'Warranty Status',
      selector: (row: any) => (row.warrantyStatus ? 'Yes' : 'No'),

      sortable: true,
      width: '10rem',
    },
    {
      name: 'Start Date',
      selector: (row: any) => showFormattedDate(row.startDate),
      sortable: true,
      width: '12rem',
    },
    {
      name: 'End Date',
      selector: (row: any) => showFormattedDate(row.endDate),
      sortable: true,
      width: '12rem',
    },
    {
      name: 'Remarks',
      selector: (row: any) => row.remarks,
      sortable: true,
      width: '12rem',
    },
    {
      name: 'Status',
      selector: (row: any) => <StatusColumn row={row} />,
      sortable: true,
      width: '10rem',
    },
    {
      name: 'Action',
      selector: (row: any) => {
        return (
          <ActionButton
            edit
            history
            deleteAction
            onClick={() => handleEdit(row?.controllerId)}
            handleConfirmDelete={() =>
              handleOpenDelete(row?.controllerId)
            }
          />
        )
      },
      sortable: false,
      width: '10rem',
    },
  ]

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (`0${date.getMonth() + 1}`).slice(-2); // Add leading zero
    const day = (`0${date.getDate()}`).slice(-2); // Add leading zero
    return `${year}-${month}-${day}`;
  };

  const handleEdit = async (id: any) => {
    try {
      setControllerMasterId(id);
      const controllerMasterRes: any = await getItemById(id, service.API_URL.controllerMaster.getbyid);

      if (controllerMasterRes) {
        dispatch(openModal());
        Object.keys(controllerMasterRes).forEach((key) => {
          // Format date values properly
          const value = key === 'startDate' || key === 'endDate' ? formatDate(controllerMasterRes[key]) : controllerMasterRes[key];
          setValue(key as keyof FormData, value);
        });
      } else {
        // Handle the case where apiStatus is false
        console.error('API call was not successful:', controllerMasterRes);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {

    console.log("datadatadatadata",data);

    const body = {
      controllerId: controllerMasterId ? controllerMasterId : 0,
      ...data,
      warrantyStatus: data.warrantyStatus === 'true' ? true : false,
    }

    if (controllerMasterId) {
      await updateData(body, service?.API_URL?.controllerMaster?.update, reset)
    } else {
      await addData(body, service?.API_URL?.controllerMaster?.add, reset)
    }
  }

  const handleOpenDelete = async (id: any) => {
    setDeleteId(id)
    dispatch(confirmationOpen())
  }
  const handleConfirmDelete =async () => {
    if (deleteId) {
      await deleteItem(deleteId)
    }

  }

  return (
    <>
      <ManageMachineShop
        addBtnTitle="Add Controller"
        importBtnTitle="Import"
        exportBtnTitle="Export"
      />
      <Filter data={FilterArray.controllermasterFilter} />

      <ReusableTable columns={columns} data={data} />

      <Modal
        mdlTitle="Add Controller"
        btnSubmit="Save"
        openAddModal={openAddModal}
        onSubmit={handleSubmit(onSubmit)}
        body={
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label htmlFor="controllerName" className="block text-gray-700">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                {...register('controllerName', {
                  required: 'This field is required',
                })}
                id="controllerName"
                type="text"
                className="block w-full px-3 py-2 border rounded mt-2"
              />
              {errors?.controllerName?.message && (
                <span className="text-red-500">{errors?.controllerName?.message}</span>
              )}
            </div>
            <div>
              <label htmlFor="inputText3" className="block text-gray-700">
                Warranty Status <span className="text-red-500">*</span>
              </label>
              <SelectBox
                list={[
                  { id: true, lins: 'Yes' },
                  { id: false, lins: 'No' },
                ]}
                keyField="id"
                valueField="lins"
                name="warrantyStatus"
                control={control}
                errors={errors}
                className="block w-full px-3 py-2.5 border bg-white rounded mt-2"
              />
            </div>
            <div>
              <label htmlFor="startDate" className="block text-gray-700">
                Start Date <span className="text-red-500">*</span>
              </label>
              <input
                {...register('startDate', {
                  required: 'This field is required',
                })}
                id="startDate"
                type="date"
                className="block w-full px-3 py-2 border rounded mt-2"
              />
              {errors?.startDate?.message && (
                <span className="text-red-500">
                  {errors?.startDate?.message}
                </span>
              )}
            </div>
            <div>
              <label htmlFor="endDate" className="block text-gray-700">
                End Date <span className="text-red-500">*</span>
              </label>
              <input
                {...register('endDate', {
                  required: 'This field is required',
                })}
                id="endDate"
                type="date"
                className="block w-full px-3 py-2 border rounded mt-2"
              />
              {errors?.endDate?.message && (
                <span className="text-red-500">{errors?.endDate?.message}</span>
              )}
            </div>
            <div>
              <label htmlFor="remarks" className="block text-gray-700">
                Remarks
              </label>
              <input
                {...register('remarks', {
                  required: 'This field is required',
                })}
                id="remarks"
                type="text"
                className="block w-full px-3 py-2 border rounded mt-2"
              />
              {errors?.remarks?.message && (
                <span className="text-red-500">{errors?.remarks?.message}</span>
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
                <div className="relative w-11 h-6 mt-5 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
              </label>
            </div>
          </div>
        }
      />
      <ConfirmPop
        isOpen={confirmationModal}
        headingText="Confirmation"
        onClose={() => dispatch(confirmationClose())}
        onClickInChild={handleConfirmDelete}
        title="Are you sure want to go with the following implementation?"
        footerButton={{ closeText: 'No', confirmText: 'Yes' }}
      />
    </>
  )
}

export default page
