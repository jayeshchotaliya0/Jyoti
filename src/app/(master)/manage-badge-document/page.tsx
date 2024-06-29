'use client'
import ManageMachineShop from '@/component/TableCommanHeader/TableCommanHeader'
import ActionButton from '@/component/actionButton/ActionButton'
import Filter from '@/component/higherOrderComponent/Filter/Filter'
import Modal from '@/component/higherOrderComponent/modal/Modal'
import ReusableTable from '@/component/react-data-table/Table'
import FilterArray from '@/utils/FilterArray'
import { StatusColumn } from '@/utils/functions/commonFunction'
import React from 'react'
import DataTable from 'react-data-table-component'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
interface FormData {
  badge: string
  document: FileList
  nameOfDocument: string
  status:any;
}
const page = () => {
  const openAddModal = useSelector((state: any) => state.isModalOpen)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>()
  const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
    console.log('data', data)
  }
  const columns = React.useMemo(
    () => [
      {
        name: 'Sr.No',
        selector: (row: any) => row.id,
        sortable: true,
        width: '7rem',
      },
      {
        name: 'Badge Name',
        selector: (row: any) => row.BadgeName,
        sortable: true,
        width: '25rem',
      },
      {
        name: 'Document Name',
        selector: (row: any) => row.DocumentName,
        sortable: true,
        width: '25rem',
      },
      {
        name: 'File',
        selector: (row: any) => (
          <svg
            width="1.3em"
            height="1.3em"
            fill="currentcolor"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M14.853 9.647c-0.195-0.195-0.512-0.195-0.707 0l-4.146 4.146v-11.293c0-0.276-0.224-0.5-0.5-0.5s-0.5 0.224-0.5 0.5v11.293l-4.146-4.146c-0.195-0.195-0.512-0.195-0.707 0s-0.195 0.512 0 0.707l5 5c0.098 0.098 0.226 0.146 0.354 0.146s0.256-0.049 0.354-0.147l5-5c0.195-0.195 0.195-0.512-0-0.707z"></path>
            <path d="M17.5 19h-16c-0.827 0-1.5-0.673-1.5-1.5v-2c0-0.276 0.224-0.5 0.5-0.5s0.5 0.224 0.5 0.5v2c0 0.276 0.224 0.5 0.5 0.5h16c0.276 0 0.5-0.224 0.5-0.5v-2c0-0.276 0.224-0.5 0.5-0.5s0.5 0.224 0.5 0.5v2c0 0.827-0.673 1.5-1.5 1.5z"></path>
          </svg>
        ),
        sortable: true,
        width: '25rem',
      },
      {
        name: 'Status',
        selector: (row: any) => (
          <StatusColumn row={row}/>
        ),
        sortable: true,
      },
      {
        name: 'Action',
        selector: () => {
          return <><ActionButton edit history deleteAction/> </>
        },
        sortable: false,
        width: '10rem',
      },
    ],
    [],
  )

  const data = React.useMemo(
    () => [
      {
        id: 1,
        BadgeName: 'Knowledge Commer',
        DocumentName: 'Testing Sample',
        file: '-',
        status: 'Active',
      },
      {
        id: 2,
        BadgeName: 'Knowledge Commer',
        DocumentName: 'Testing Sample',
        file: '-',
        status: 'Inactive',
      },
    ],
    [],
  )

  return (
    <>
      <ManageMachineShop
        addBtnTitle="Add Badge Document"
        importBtnTitle="Import"
        exportBtnTitle="Export"
      />
      <Filter data={FilterArray.badgeDocumentFilter} />

      <ReusableTable columns={columns} data={data} />
      <Modal
        mdlTitle="Add Badge Document"
        btnSubmit="Save"
        openAddModal={openAddModal}
        onSubmit={handleSubmit(onSubmit)}
        body={
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label htmlFor="badge" className="block text-gray-700">
                  Badge <span className="text-red-500">*</span>
                </label>
                <input
                  {...register('badge', {
                    required: 'This field is required',
                  })}
                  id="badge"
                  type="text"
                  className="block w-full px-3 py-2 border rounded mt-2"
                />
                {errors?.badge?.message && (
                  <span className="text-red-500">{errors?.badge?.message}</span>
                )}
              </div>
              <div>
                <label htmlFor="document" className="block text-gray-700">
                  Document (.PDF) <span className="text-red-500">*</span>
                </label>
                <input
                  {...register('document', {
                    required: 'This field is required',
                    validate: {
                      isPDF: (files) =>
                        (files.length > 0 &&
                          files[0].type === 'application/pdf') ||
                        'Only PDF files are allowed',
                    },
                  })}
                  id="document"
                  type="file"
                  accept="application/pdf"
                  className="block w-full px-3 py-2 border rounded mt-2"
                />
                {errors?.document?.message && (
                  <span className="text-red-500">
                    {errors?.document?.message}
                  </span>
                )}
              </div>
              <div>
                <label htmlFor="nameOfDocument" className="block text-gray-700">
                  Name of Document <span className="text-red-500">*</span>
                </label>
                <input
                  {...register('nameOfDocument', {
                    required: 'This field is required',
                  })}
                  id="nameOfDocument"
                  type="text"
                  className="block w-full px-3 py-2 border rounded mt-2"
                />
                {errors?.nameOfDocument?.message && (
                  <span className="text-red-500">
                    {errors?.nameOfDocument?.message}
                  </span>
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
    </>
  )
}

export default page
