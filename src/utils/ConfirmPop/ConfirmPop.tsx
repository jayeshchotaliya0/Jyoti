import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onClickInChild?: () => void;
  headingText:string;
  // btnClose: string;
  // btnSubmit: string;
  // mdlDesc?: string;
  footerButton:any;
  title: any;
}

const ConfirmPop: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  onClickInChild,
  headingText,
  // btnClose,
  // btnSubmit,
  // mdlDesc,
  footerButton
}) => {
  if (!isOpen) return null;
  return (
    <div className="relative flex justify-end">
   
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
          <div className="space-y-4">
          
            <div className="flex justify-between">
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">{headingText}</h3>
            <svg
            onClick={onClose}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            className="cursor-pointer"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
           </svg>
            </div>
            <p className="text-gray-500 dark:text-gray-400">
              {title}
            </p>
            <div className="flex justify-end gap-2">
              <button onClick={onClose} className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700">
               {footerButton.closeText}
              </button>
              <button onClick={onClickInChild} className="inline-flex items-center rounded-md bg-red-500 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
              {footerButton.confirmText}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ConfirmPop;