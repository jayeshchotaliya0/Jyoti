'use client'
import ManageMachineShop from '@/component/TableCommanHeader/TableCommanHeader'
import ActionButton from '@/component/actionButton/ActionButton'
import Filter from '@/component/higherOrderComponent/Filter/Filter'
import Loader from '@/component/higherOrderComponent/loader/Loader'
import Modal from '@/component/higherOrderComponent/modal/Modal'
import ReusableTable from '@/component/react-data-table/Table'
import ConfirmPop from '@/utils/ConfirmPop/ConfirmPop'
import FilterArray from '@/utils/FilterArray'
import {
  confirmationClose,
  confirmationOpen,
  openModal,
} from '@/utils/redux/features/reduxData'
import SelectBox from '@/utils/selectBox/SelectBox'
import service from '@/utils/service/service'
import useFetchData from '@/utils/useFetchData/customFetchData'
import Select, { StylesConfig, components } from 'react-select'

import React, { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import MultiSelect from '@/utils/selectBox/MultiSelect'
import Draggable from 'react-draggable'

interface FormData {
  cellName: string
  status: any
  cellOwner: any
  workCenter: any
  cellPlanner: any
}
const page = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    setError,
    control,
  } = useForm<FormData>()
  const dispatch = useDispatch()
  const openAddModal = useSelector((state: any) => state.isModalOpen)
  const [comman, setCommanData] = useState({
    Unit: [],
    CellOwnerPlanner: [],
    WorkCenter: [],
  })

  const confirmationModal = useSelector((state: any) => state.isConfirmation)

  const [cellId, setCellId] = useState('')
  const [unitIdArray, setUnitIdArray] = useState('')
  const [loader, setLoader] = useState(false)
  const { data, loading, error, addData, updateData, commonAPI } = useFetchData(
    service?.API_URL?.cell.listing,
  )

  const modalListing = async () => {
    try {
      const body = ['Unit', 'CellOwnerPlanner', 'WorkCenter']
      setCommanData(await commonAPI(body, service?.API_URL?.common?.listing))
    } catch (error) {
      console.error('Error fetching common data:', error)
    }
  }

  useEffect(() => {
    if (openAddModal) {
      modalListing()
    }
  }, [openAddModal])

  const columns = [
    {
      name: 'Sr. No.',
      selector: (row: any, index: number) => index + 1,
      sortable: true,
      width: '7rem',
    },
    {
      name: 'Cell Name',
      selector: (row: any) => row.cellName,
      sortable: true,
    },
    {
      name: 'Unit Name',
      selector: (row: any) => row.unitname,
      sortable: true,
    },
    {
      name: 'Cell Owner',
      selector: (row: any) => row.cell_Owner,
      sortable: true,
    },
    {
      name: 'Cell Planner',
      selector: (row: any) => row.cell_planner,
      sortable: true,
    },
    {
      name: 'Work Center',
      selector: (row: any) => row.work_center,
      sortable: true,
    },

    {
      name: 'Action',
      selector: (row: any) => {
        return (
          <ActionButton
            edit
            history
            deleteAction
            onClick={() => handleEdit(row?.id)}
            handleConfirmDelete={() => handleOpenDelete(row?.id)}
          />
        )
      },
      sortable: false,
      width: '7rem',
    },
  ]

  const handleEdit = async (id: any) => {
    try {
      dispatch(openModal())
      setCellId(id)

      const editMachineRes: any = await service.makeAPICall({
        methodName: service.Methods.GET,
        apiUrl: service.API_URL.breakWithShiftManagement.getbyid,
        query: { id: id },
      })
      setLoader(true)

      if (editMachineRes?.apiStatus) {
        setLoader(false) // Ensure the loader is turned off
        setValue('subCategory', editMachineRes?.apiData?.subCategory)
        // setValue('machineMainCategoryId', editMachineRes?.apiData?.machineMainCategoryId)
        setValue('status', editMachineRes?.apiData?.status)
      } else {
        console.error('API call was not successful:', editMachineRes)
      }
    } catch (error) {
      // Handle the error
      console.error('An error occurred while fetching the shop list:', error)
      // You can set some error state here if needed
    } finally {
      setLoader(false) // Ensure the loader is turned off
    }
  }

  const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
    const body = {
      cellId: cellId ? cellId : 0,
      ...data,
    }

    if (cellId) {
      await updateData(body, service?.API_URL?.cell?.update, reset)
    } else {
      await addData(body, service?.API_URL?.cell?.add, reset)
    }
  }

  const handleOpenDelete = async (id: any) => {
    dispatch(confirmationOpen())
  }
  const handleConfirmDelete = () => {}

  const options = [
    { value: '1', label: 'RGH-5200' },
    { value: '2', label: 'RTH-5200' },
    { value: '3', label: 'RGHT-5200' },
  ]
  const UnitName = [
    { value: '1', label: 'FGFG-50' },
    { value: '2', label: 'FGFG-52' },
    { value: '3', label: 'FGFGF-520' },
    { value: '4', label: 'FGFGF-58' },
    { value: '5', label: 'FGFGF-20' },
    { value: '6', label: 'FGFGF-20-53' },
  ]
  const workCenter = [
    { value: '1', UnitId: '1', label: 'Test' },
    { value: '2', UnitId: '1', label: 'Test data' },
    { value: '3', UnitId: '1', label: 'Data-3' },
    { value: '4', UnitId: '2', label: 'Data-4' },
    { value: '5', UnitId: '2', label: 'Data-5' },
    { value: '6', UnitId: '2', label: 'Data-6' },
    { value: '7', UnitId: '2', label: 'Data-7' },
  ]

  const customStyles: StylesConfig = {
    control: (provided: any) => ({
      ...provided,
      marginTop: '0.50rem', // Equivalent to mt-5 in Tailwind CSS
    }),
  }

  const handleMultiSelectChange = (selectedValues: any, action: any) => {
    setUnitIdArray(selectedValues)
  }

  const filteredWorkCenter = workCenter.filter((item) =>
    unitIdArray.includes(item.UnitId),
  )

  const handleStart = (e:any, data:any) => {
    console.log('Start:', e, data);
  };
  
  const handleDrag = (e:any, data:any) => {
    console.log('Drag:', e, data);
  };
  
  const handleStop = (e:any, data:any) => {
    console.log('Stop:', e, data);
  };
  

  return (
    <>
      <ManageMachineShop
        addBtnTitle="Add Manage Cell"
        importBtnTitle="Import"
        exportBtnTitle="Export"
      />
      <Filter data={FilterArray.manageCell} />
      <ReusableTable columns={columns} data={data} />
      {/* {
        loader ? <Loader /> : <ReusableTable columns={columns} data={data} />
      } */}

      <Modal
        mdlTitle="Add Manage Cell"
        btnSubmit="Save"
        openAddModal={openAddModal}
        onSubmit={handleSubmit(onSubmit)}
        body={
          <>
            <div className="grid grid-cols-4 gap-4">
              <div>
                <label htmlFor="inputText3" className="block text-gray-700">
                  Cell Name <span className="text-red-500">*</span>
                </label>
                <input
                  {...register('cellName', {
                    required: 'This field is required',
                  })}
                  id="inputText3"
                  type="text"
                  className="block w-full px-3 py-2 border rounded mt-2"
                />
                {errors?.cellName?.message && (
                  <span className="text-red-500">
                    {errors?.cellName?.message}
                  </span>
                )}
              </div>

              <div>
                <label htmlFor="inputText3" className="block text-gray-700">
                  Cell Owner <span className="text-red-500">*</span>
                </label>
                <MultiSelect
                  name="cellOwner"
                  isMulti={false}
                  customStyles={customStyles}
                  control={control}
                  data={data}
                  keys="cellId"
                  value="cellName"
                  // errors={errors}
                />
              </div>

              <div>
                <label htmlFor="inputText3" className="block text-gray-700">
                  Cell Planner <span className="text-red-500">*</span>
                </label>
                <MultiSelect
                  name="CellOwner"
                  options={options}
                  isMulti={false}
                  customStyles={customStyles}
                  control={control}
                  data={[]}
                  key="cellId"
                  value="cellName"
                  // errors={errors}
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
            <hr></hr>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="inputText3" className="block text-gray-700">
                  Unit Name <span className="text-red-500">*</span>
                </label>

                <MultiSelect
                  name="unitName"
                  isMulti={true}
                  customStyles={customStyles}
                  control={control}
                  errors={errors}
                  data={UnitName}
                  keys="value"
                  value="label"
                  onChange={handleMultiSelectChange}
                />

{filteredWorkCenter.map((item) => (
        <Draggable
          key={item.value}
          axis="x"
          handle=".handle"
          defaultPosition={{ x: 0, y: 0 }}
          grid={[25, 25]}
          scale={1}
          onStart={handleStart}
          onDrag={handleDrag}
          onStop={handleStop}
        >
          <div className="handle bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mb-2">
            {item.label}
          </div>
        </Draggable>
      ))}
              </div>
              <div>flmlkfklhklghkg</div>
            </div>
          </>
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
