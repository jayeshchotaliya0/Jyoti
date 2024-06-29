'use client'
import ManageMachineShop from '@/component/TableCommanHeader/TableCommanHeader'
import ActionButton from '@/component/actionButton/ActionButton'
import Filter from '@/component/higherOrderComponent/Filter/Filter'
import Input from '@/component/higherOrderComponent/input'
import Modal from '@/component/higherOrderComponent/modal/Modal'

import ReusableTable from '@/component/react-data-table/Table'
import ConfirmPop from '@/utils/ConfirmPop/ConfirmPop'
import FilterArray from '@/utils/FilterArray'
import { StatusColumn, onlyAllowNumber } from '@/utils/functions/commonFunction'
import { confirmationClose, confirmationOpen, openModal } from '@/utils/redux/features/reduxData'
import MultiSelect from '@/utils/selectBox/MultiSelect'
import SelectBox from '@/utils/selectBox/SelectBox'
import service from '@/utils/service/service'
import useFetchData from '@/utils/useFetchData/customFetchData'

import React, { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'

interface FormData {
  workCenterName: any,
  description: any,
  asstManagerId: any
  supervisorGroupId: any;
  machineMainCategoryId: any
  cellEligible: any;
  palletId: any;
  machineShop: any,
  lineId: any,
  shiftIds: any
  considerOperationReview: any;
  qualityChecker: any;
  workCenterTypeId: any;
  customerIds: any;
  downTimeReasonIds: any;
  status: any,
  caution: any,
  cycleTimeSplitterSimulator: any

}

const page = () => {
  const openAddModal = useSelector((state: any) => state.isModalOpen);
  const { data, loading, listData, addData, getListData, updateData, deleteItem, getItemById, commonAPI }: any = useFetchData(service?.API_URL?.manageworkcenter?.listing)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    setError,
    control,
  } = useForm<FormData>()

  const dispatch = useDispatch();
  const confirmationModal = useSelector((state: any) => state.isConfirmation)
  const [loader, setLoader] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [workCenterId, setWorkCenterId] = useState('')
  const [commanData, setCommanData] = useState(
    {
      SupervisorGroup: [],
      MachineShop: [],
      MachineShopLine: [],
      WorkCenterType: [],
      DowntimeReason: [],
      AsstManager: [],
      MachineMainCategory: []
    });


  const columns = [
    {
      name: 'Sr. No.',
      selector: (row: any, index: number) => index + 1,
      sortable: true,
      width: '7rem',
    },
    {
      name: 'Work Center Name',
      selector: (row: any) => row.workCenterName,
      sortable: true,
      width: '15rem',
    },
    {
      name: 'Workshop Description',
      selector: (row: any) => row.description,
      sortable: true,
      width: '15rem',
    },
    {
      name: 'Work Center Type',
      selector: (row: any) => row.workCenterTypeName,
      sortable: true,
      width: '15rem',
    },
    {
      name: 'Asst. Manager',
      selector: (row: any) => row?.asstManagerFirstName + ' ' + row?.asstManagerLastName,
      sortable: true,
      width: '15rem',
    },
    {
      name: 'Supervisor Group',
      selector: (row: any) => row.supervisorGroupName,
      sortable: true,
      width: '15rem',
    },
    {
      name: 'Machine Category',
      selector: (row: any) => row.mainCategory,
      sortable: true,
      width: '15rem',
    },
    {
      name: 'Cell Eligible',
      selector: (row: any) => row.cellEligible ? 'Yes' : 'No',
      sortable: true,
      width: '15rem',
    },
    {
      name: 'Pallet Name',
      selector: (row: any) => row.palletName,
      sortable: true,
      width: '15rem',
    },
    {
      name: 'Machine Shop',
      selector: (row: any) => row.machineShop,
      sortable: true,
      width: '15rem',
    },
    {
      name: 'Line',
      selector: (row: any) => row.lineName,
      sortable: true,
      width: '15rem',
    },
    {
      name: 'Shift',
      selector: (row: any) => <>
        {
          row?.shifts?.map((item: any) => {
            return (
              <>
                <span className="bg-yellow-500 text-black-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300">{item.toUpperCase()}</span><br></br>
              </>
            )
          })
        }
      </>,
      sortable: true,
      width: "20rem"
    },
    {
      name: 'Condition For Operational Review',
      selector: (row: any) => row.considerOperationReview ? 'Yes' : 'No',
      sortable: true,
      width: '20rem',
    },
    {
      name: 'customers',
      selector: (row: any) => <>
        {
          row?.customers?.map((item: any) => {
            return (
              <>
                <span className="bg-gray-300 text-white text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300">{item.toUpperCase()}</span><br></br>
              </>
            )
          })
        }
      </>,
      sortable: true,
      width: '15rem',
    },
    {
      name: 'Downtime Reason',
      selector: (row: any) => <>
        {
          row?.downTimeReasons?.map((item: any) => {
            return (
              <>
                <span className="bg-yellow-500 text-black-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300">{item.toUpperCase()}</span><br></br>
              </>
            )
          })
        }
      </>,
      sortable: true,
      width: '15rem',
    },
    {
      name: 'Status',
      selector: (row: any) => (
        <StatusColumn row={row} />
      ),
      sortable: true,
    },
    {
      name: 'Action',
      selector: (row: any) => {
        return <><ActionButton edit history deleteAction onClick={() => handleEdit(row?.workCenterId)}
          handleConfirmDelete={() => handleOpenDelete(row?.workCenterId)} /> </>
      },
      sortable: false,
      width: '10rem',
    },
  ]


  const modalListing = async () => {
    try {
      const body = ["MachineMainCategory", "SupervisorGroup", "MachineShop", "MachineShopLine", "WorkCenterType", "DowntimeReason", "AsstManager"];
      setCommanData(await commonAPI(body, service?.API_URL?.common?.listing));
      const apiUrls = {
        shiftsData: service?.API_URL?.shiftManagement?.listing,
        palletd: service?.API_URL?.palletMaster.listing
      };
      await getListData(apiUrls);
    } catch (error) {
      console.error("Error fetching common data:", error);
    }
  };

  useEffect(() => {
    if (openAddModal) {
      modalListing();
    }
  }, [openAddModal]);

  const handleOpenDelete = async (id: any) => {
    setWorkCenterId(id)
    dispatch(confirmationOpen())
  }

  const handleConfirmDelete = async () => {
    if (workCenterId) {
      await deleteItem(workCenterId)
    }
  }

  const options = listData?.shiftsData?.map(v => ({
    value: v.shiftId,
    label: v?.shiftName
  }));
  const downtimeReasonoptions = listData?.DowntimeReason?.map(v => ({
    value: v?.value,
    label: v?.text
  }));
  const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
    delete data.machineShop
    delete data.caution
    delete data.cycleTimeSplitterSimulator

    const body = {
      ...data,
      workCenterId: workCenterId ? workCenterId : 0,
      isDelete: false,
      cellEligible: data.cellEligible === "yes" ? true : false,
      considerOperationReview: data.considerOperationReview === "yes" ? true : false,
      qualityChecker: data.qualityChecker === "yes" ? true : false,
      downTimeReasonIds: data.downTimeReasonIds.length > 0 ? data.downTimeReasonIds : [],
      customerIds: data.customerIds.length > 0 ? data.customerIds : [],
    }
    if (workCenterId) {
      await updateData(body, service?.API_URL?.manageworkcenter.update, reset)
    } else {
      await addData(body, service?.API_URL?.manageworkcenter.add, reset)
    }
  }

  const handleEdit = async (id: any) => {

    try {
      setWorkCenterId(id)
      const editMachineRes: any = await getItemById(id, service.API_URL.manageworkcenter.getbyid);
      if (editMachineRes) {
        dispatch(openModal());
        Object.keys(editMachineRes).forEach((key) => {
          setValue(key as keyof FormData, editMachineRes[key]);
        });

          //  setValue('shiftIds','');
        
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
  return (
    <>
      <ManageMachineShop
        addBtnTitle="Add Work Center"
        importBtnTitle="Import"
        exportBtnTitle="Format"
      />

      <Filter data={FilterArray.workCenter} />
      <ReusableTable columns={columns} data={data} />

      <Modal
        mdlTitle="Add Work Center"
        btnSubmit="Save"
        openAddModal={openAddModal}
        onSubmit={handleSubmit(onSubmit)}
        body={
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label htmlFor="inputText3" className="block text-gray-700">
                Work Center Name <span className="text-red-500">*</span>
              </label>
              <Input
                type='text'
                className="block w-full px-3 py-2 border rounded mt-2"
                {...register('workCenterName', {
                  required: true,
                }
                )
                }
              />
              {errors?.workCenterName && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>
            <div>
              <label htmlFor="description" className="block text-gray-700">
                Work Center Description <span className="text-red-500">*</span>
              </label>
              <Input
                type='text'
                className="block w-full px-3 py-2 border rounded mt-2"
                {...register('description', {
                  required: true,
                }
                )
                }
              />
              {errors?.description && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>
            <div>
              <label htmlFor="asstManagerId" className="block text-gray-700">
                Asst Manager <span className="text-red-500">*</span>
              </label>
              <SelectBox
                list={commanData.AsstManager}
                keyField="value"
                valueField="text"
                name="asstManagerId"
                control={control}
                errors={errors}
                className="block w-full px-3 py-2.5 border bg-white rounded mt-2"
              />
            </div>
            <div>
              <label htmlFor="supervisorGroupId" className="block text-gray-700">
                Supervisor Group <span className="text-red-500">*</span>
              </label>
              <SelectBox
                list={commanData?.SupervisorGroup}
                keyField="value"
                valueField="text"
                name="supervisorGroupId"
                control={control}
                errors={errors}
                className="block w-full px-3 py-2.5 border bg-white rounded mt-2"
              />
            </div>
            <div>
              <label htmlFor="machineMainCategoryId" className="block text-gray-700">
                Machine Main Category <span className="text-red-500">*</span>
              </label>
              <SelectBox
                list={commanData?.MachineMainCategory}
                keyField="value"
                valueField="text"
                name="machineMainCategoryId"
                control={control}
                errors={errors}
                className="block w-full px-3 py-2.5 border bg-white rounded mt-2"
              />
            </div>
            <div>
              <div className="">
                <label htmlFor="cellEligible" className="block text-gray-700">Cell Eligible</label>
                <div className='mt-4 p-1'>
                  <input
                    id="cellEligible"
                    type="radio"
                    value="yes"
                    {...register('cellEligible', { required: 'This field is required' })}
                    className="w-4 h-4 bg-gray-100 border-gray-300"
                  />
                  <label htmlFor="cellEligible" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Yes</label>

                  <input
                    id="cellEligible"
                    type="radio"
                    value="no"
                    {...register('cellEligible', { required: 'This field is required' })}
                    className="w-4 h-4 ml-5 bg-gray-100 border-gray-300"
                  />
                  <label htmlFor="cellEligible" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">No</label>
                </div>
                {errors.cellEligible && <p className="text-red-500 text-xs mt-1">{errors.cellEligible.message}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="inputText3" className="block text-gray-700">
                Pallet Name <span className="text-red-500">*</span>
              </label>
              <SelectBox
                list={listData.palletd}
                keyField="palletId"
                valueField="palletName"
                name="palletId"
                control={control}
                className="block w-full px-3 py-2.5 border bg-white rounded mt-2"
              />
            </div>
            <div>
              <label htmlFor="inputText3" className="block text-gray-700">
                Machine Shop <span className="text-red-500">*</span>
              </label>
              <SelectBox
                list={commanData?.MachineShop}
                keyField="value"
                valueField="text"
                name="machineShop"
                control={control}
                errors={errors}
                className="block w-full px-3 py-2.5 border bg-white rounded mt-2"
              />
            </div>
            <div>
              <label htmlFor="inputText3" className="block text-gray-700">
                Machine Shop Line <span className="text-red-500">*</span>
              </label>
              <SelectBox
                list={commanData.MachineShopLine}
                keyField="value"
                valueField="text"
                name="lineId"
                control={control}
                errors={errors}
                className="block w-full px-3 py-2.5 border bg-white rounded mt-2"
              />
            </div>
            <div>
              <label htmlFor="inputText3" className="block text-gray-700">
                Shift <span className="text-red-500">*</span>
              </label>
              <MultiSelect
                name="shiftIds"
                options={options}
                isMulti={true}
                control={control}
                required
              />
              {errors?.shiftIds && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>

            <div>
              <div className="">
                <label htmlFor="considerOperationReview" className="block text-gray-700">Consider Operation Review</label>
                <div className='mt-4 p-1'>
                  <input
                    id="considerOperationReview"
                    type="radio"
                    value="yes"
                    {...register('considerOperationReview', { required: 'This field is required' })}
                    className="w-4 h-4 bg-gray-100 border-gray-300"
                  />
                  <label htmlFor="considerOperationReview" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Yes</label>

                  <input
                    id="considerOperationReview"
                    type="radio"
                    value="no"
                    {...register('considerOperationReview', { required: 'This field is required' })}
                    className="w-4 h-4 ml-5 bg-gray-100 border-gray-300"
                  />
                  <label htmlFor="considerOperationReview" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">No</label>
                </div>
                {errors.considerOperationReview && <p className="text-red-500 text-xs mt-1">{errors.considerOperationReview.message}</p>}
              </div>
            </div>
            <div>
              <div className="">
                <label htmlFor="qualityChecker" className="block text-gray-700">Quality Checker</label>
                <div className='mt-4 p-1'>
                  <input
                    id="qualityChecker"
                    type="radio"
                    value="yes"
                    {...register('qualityChecker', { required: 'This field is required' })}
                    className="w-4 h-4 bg-gray-100 border-gray-300"
                  />
                  <label htmlFor="qualityChecker" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Yes</label>

                  <input
                    id="qualityChecker"
                    type="radio"
                    value="no"
                    {...register('qualityChecker', { required: 'This field is required' })}
                    className="w-4 h-4 ml-5 bg-gray-100 border-gray-300"
                  />
                  <label htmlFor="qualityChecker" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">No</label>
                </div>
                {errors.qualityChecker && <p className="text-red-500 text-xs mt-1">{errors.qualityChecker.message}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="inputText3" className="block text-gray-700 mt-6">
                Work Center Type <span className="text-red-500">*</span>
              </label>
              <SelectBox
                list={commanData.WorkCenterType}
                keyField="value"
                valueField="text"
                name="workCenterTypeId"
                control={control}
                errors={errors}
                className="block w-full px-3 py-2.5 border bg-white rounded mt-2"
              />
            </div>
            <div>
              <label htmlFor="inputText3" className="block text-gray-700 mt-6">
                Customer
              </label>

              <MultiSelect
                name="customerIds"
                options={[]}
                isMulti={true}
                control={control}
                required
              />
            </div>

            <div>
              <label htmlFor="inputText3" className="block text-gray-700">
                Cycle Time Splitter % (Machine shop + Future Planning) CAUTION
              </label>
              <Input
                type='text'
                className="block w-full px-3 py-2 border rounded mt-2"
                {...register('caution', {
                  required: false,
                  onChange: ((e: any) => {
                    setValue('caution', onlyAllowNumber(e.target.value))
                  })
                }
                )
                }
              />

            </div>

            <div>
              <label htmlFor="inputText3" className="block text-gray-700">
                Cycle Time Splitter % (Future Planning Simulator) CAUTION
              </label>
              <Input
                type='text'
                className="block w-full px-3 py-2 border rounded mt-2"
                {...register('cycleTimeSplitterSimulator', {
                  required: false,
                  onChange: ((e: any) => {
                    setValue('cycleTimeSplitterSimulator', onlyAllowNumber(e.target.value))
                  })
                }
                )
                }
              />
            </div>
            <div>
              <label htmlFor="inputText3" className="block text-gray-700 mt-6"> Downtime Reason </label>
              <MultiSelect
                name="downTimeReasonIds"
                options={downtimeReasonoptions}
                isMulti={true}
                required 
                control={control}
              />
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
        onClose={() => dispatch(confirmationClose())}
        onClickInChild={handleConfirmDelete}
        title="Are you sure want to go with the following implementation?"
        footerButton={{ closeText: "No", confirmText: 'Yes' }}
      />
    </>
  )
}

export default page
