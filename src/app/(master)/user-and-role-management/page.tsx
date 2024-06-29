'use client'
import ManageMachineShop from '@/component/TableCommanHeader/TableCommanHeader'
import ActionButton from '@/component/actionButton/ActionButton'
import Modal from '@/component/higherOrderComponent/modal/Modal'

import ReusableTable from '@/component/react-data-table/Table'
import { StatusColumn } from '@/utils/functions/commonFunction'
import { addOpenModal } from '@/utils/redux/features/reduxData'
import SelectBox from '@/utils/selectBox/SelectBox'

import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
interface FormData {
  newUserName: string,
  status: any,
  
}
const page = () => {
  const dispatch = useDispatch();
  const modals = useSelector((state: any) => state.modals);
  const {
    register,
    handleSubmit,
    formState: { errors }, control

  } = useForm<FormData>()
  const columns = [
    {
      name: 'Sr. No.',
      selector: (row: any) => row.id,
      sortable: true,
      width:'7rem'
    },
    {
      name: 'User Name',
      selector: (row: any) => row.username,
      sortable: true,
      width:'10rem'
    },
    {
      name: 'Person Name',
      selector: (row: any) => row.personname,
      sortable: true,
      width:'10rem'
    },
    {
      name: 'Unit Code',
      selector: (row: any) => row.unitcode,
      sortable: true,
      width:'10rem'
    },
    {
      name: 'Department',
      selector: (row: any) => row.department,
      sortable: true,
      width:'10rem'
    },
    {
      name: 'Designation',
      selector: (row: any) => row.designation,
      sortable: true,
      width:'10rem'
    },
    {
      name: 'Role Code',
      selector: (row: any) => row.rolecode,
      sortable: true,
      width:'10rem'
    },
    {
      name: 'Status',
      selector: (row: any) => (
        <StatusColumn row={row}/>
      ),
      sortable: true,
      width: '10rem',
    },
    {
      name: 'Action',
      selector: () => {
        return <><ActionButton edit history deleteAction/> </>
      },
      sortable: false,
      width: '10rem',
    },
  ]
  const data = [
    {
      id: 1,
      username: 'USR001',
      personname: 'Person 1',
      unitcode: 'Unite 1',
      department: 'Technical Support',
      designation: 'Manager',
      rolecode: 'TSM',
    },
    {
      id: 2,
      username: 'USR002',
      personname: 'Person 2',
      unitcode: 'Unite 1',
      department: 'Production',
      designation: 'Manager',
      rolecode: 'PM',
    },
    {
      id: 3,
      username: 'USR003',
      personname: 'Person 3',
      unitcode: 'All',
      department: 'Management',
      designation: 'Team Leader',
      rolecode: 'MM',
    },
    {
      id: 4,
      username: 'USR004',
      personname: 'Person 4',
      unitcode: 'Unite 1',
      department: 'Production',
      designation: 'Engineer',
      rolecode: 'ME',
    },
  ]
  // ================================
  const columnss = [
    {
      name: 'Role Code',
      selector: (row: any) => row.rolecode,
      sortable: true,
    },
    {
      name: 'Description',
      selector: (row: any) => row.description,
      sortable: true,
    },
    {
      name: 'Status',
      selector: (row: any) => (
        <StatusColumn row={row}/>
      ),
      sortable: true,
      width: '10rem',
    },
    {
      name: 'Action',
      selector: () => {
        return <><ActionButton edit history deleteAction/> </>
      },
      sortable: false,
      width: '10rem',
    },
    
    
  ]
  const datas = [
    {
      rolecode: 'TSM',
      description: 'Technical  Support',
    },
    {
      rolecode: 'PM',
      description: 'Production Manager',
    },
    {
      rolecode: 'MM',
      description: 'Mechanical Manager',
    },
    {
      rolecode: 'PM',
      description: 'Production Manager',
    },
  ]
  const handleAddModal = (name: string) => {
    dispatch(addOpenModal(name));
  };
  return (
    <>
      <ManageMachineShop title="Manage line" addBtnTitle="" />
      <div className="grid gap-4 grid-cols-2 mt-6">
        <div className="flex justify-end mt-7">
          <button
            type="button"
            onClick={() => handleAddModal('newUser')}
            className="text-white h-10 bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 font-medium text-sm px-5 py-2.5 me-2  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            + Add New User
          </button>
        </div>

        <div className="flex justify-end mt-7">
          <button
            type="button"
            onClick={() => handleAddModal('newRole')}

            className="text-white h-10 bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 font-medium text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            + Add New Role
          </button>
        </div>
      </div>

      <div className="grid gap-4 grid-cols-2 mt-1">
        <div className="min-w-full py-2 inline-block">
            <ReusableTable columns={columns} data={data} />
          </div>

        <div className="min-w-full py-2 inline-block">
            <ReusableTable columns={columnss} data={datas} />
          </div>
      </div>
      <Modal
        mdlTitle="Add New User"
        btnSubmit="Save"
        closeName={'newUser'}

        openAddModal={modals.newUser}
        body={
          <div className="p-4 md:p-5 space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label htmlFor="inputText3" className="block text-gray-700">
                User Name <span className="text-red-500">*</span>
                </label>
                <input
                  {...register('newUserName', {
                    required: 'This field is required',
                  })}
                  id="inputText3"
                  type="text"
                  className="block w-full px-3 py-2 border rounded mt-2"
                />
               
              </div>
              <div>
                <label htmlFor="inputText3" className="block text-gray-700">
                Person Name <span className="text-red-500">*</span>
                </label>
                <input
                  {...register('newUserName', {
                    required: 'This field is required',
                  })}
                  id="inputText3"
                  type="text"
                  className="block w-full px-3 py-2 border rounded mt-2"
                />
               
              </div>
              <div>
                <label htmlFor="inputText3" className="block text-gray-700">
                Department <span className="text-red-500">*</span>
                </label>
                <input
                  {...register('newUserName', {
                    required: 'This field is required',
                  })}
                  id="inputText3"
                  type="text"
                  className="block w-full px-3 py-2 border rounded mt-2"
                />
               
              </div>
              <div>
                <label htmlFor="inputText3" className="block text-gray-700">
                Unit Name <span className="text-red-500">*</span>
                </label>
                <SelectBox
                  list={[{ id: 1, lins: 'Example' }]}
                  keyField="id"
                  valueField="lins"
                  name="unitname"
                  control={control}
                  errors={errors}
                  className="block w-full px-3 py-2.5 border bg-white rounded mt-2"
                />
              </div>
              <div>
                <label htmlFor="inputText3" className="block text-gray-700">
                Designation <span className="text-red-500">*</span>
                </label>
                <input
                  {...register('newUserName', {
                    required: 'This field is required',
                  })}
                  id="inputText3"
                  type="text"
                  className="block w-full px-3 py-2 border rounded mt-2"
                />
               
              </div>
              <div>
                <label htmlFor="inputText3" className="block text-gray-700">
                Role Code <span className="text-red-500">*</span>
                </label>
                <SelectBox
                  list={[{ id: 1, lins: 'Example' }]}
                  keyField="id"
                  valueField="lins"
                  name="rolecode"
                  control={control}
                  errors={errors}
                  className="block w-full px-3 py-2.5 border bg-white rounded mt-2"
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
          </div>
        }
      />



<Modal
        mdlTitle=" Add Machine Shop"
        btnSubmit="Save"
        openAddModal={modals.newRole}
        closeName={'newRole'}

        body={
          <div className="p-4 md:p-5 space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label htmlFor="inputText3" className="block text-gray-700">
                Role Code <span className="text-red-500">*</span>
                </label>
                <input
                  {...register('newUserName', {
                    required: 'This field is required',
                  })}
                  id="inputText3"
                  type="text"
                  className="block w-full px-3 py-2 border rounded mt-2"
                />
               
              </div>
              <div>
                <label htmlFor="inputText3" className="block text-gray-700">
                Description <span className="text-red-500">*</span>
                </label>
                <input
                  {...register('newUserName', {
                    required: 'This field is required',
                  })}
                  id="inputText3"
                  type="text"
                  className="block w-full px-3 py-2 border rounded mt-2"
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
          </div>
        }
      />
    </>
    
  )
}

export default page
