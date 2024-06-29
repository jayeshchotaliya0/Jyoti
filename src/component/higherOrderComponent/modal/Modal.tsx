'use client'
import { addCloseModal, closeModal } from '@/utils/redux/features/reduxData'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'

interface ModalProps {
  mdlTitle: string
  btnSubmit: string
  openAddModal: boolean
  onSubmit?: any
  body?: any
  closeName?: any
  reset?:any
}

const Modal: React.FC<ModalProps> = ({
  mdlTitle,
  btnSubmit,
  openAddModal,
  body,
  onSubmit,
  closeName,
  reset
}) => {
  const dispatch = useDispatch()

  if (!openAddModal) return null;
  const onModalClose = () => {
    reset && reset()
    if(closeName){
      dispatch(addCloseModal(closeName))
      reset()
    }else{
      dispatch(closeModal())
      reset()
    }
    
  }
  return (<>
    <div
      id="small-modal"
      className="fixed w-full inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div className="relative w-4/6 max-h-full ml-40">
        <form onSubmit={onSubmit}>
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                {mdlTitle}
              </h3>
              <button
                type="button"
                onClick={onModalClose}
                className="text-gray-400 bg-transparent bg-gray-100 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600  dark:hover:text-white"
                data-modal-hide="small-modal"
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
              </button>
            </div>
            <div className="p-4 md:p-5 space-y-4 auto-height overflow-y-auto" >
            {body}
            </div>

            <div className="flex items-center justify-end p-4 md:p-5 border-t space-x-3 border-gray-200 rounded-b dark:border-gray-600">
              <button
                type="button"
                onClick={onModalClose}
                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              >
                {btnSubmit}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </>
  )
}
export default Modal
