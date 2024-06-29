import { deleteIcon, printerIcon } from '@/utils/icons/icons';
import React from 'react'

interface ActionButtonProps {

    edit?: boolean;
    history?: boolean;
    onClick?: () => void;
    handleConfirmDelete?:()=>void
    printer?: boolean;
    deleteAction?: boolean;
}

const ActionButton: React.FC<ActionButtonProps> = ({ edit, history, onClick,handleConfirmDelete, printer, deleteAction }) => {
    return (
        <div className="flex space-x-2">
            {
                edit &&
                <button className="text-blue-500" title="Edit" onClick={onClick}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="1.3em"
                        height="1.3em"
                        fill="stone"
                        viewBox="0 0 1024 1024"
                    >
                        <path d="M832 512a32 32 0 1 1 64 0v352a32 32 0 0 1-32 32H160a32 32 0 0 1-32-32V160a32 32 0 0 1 32-32h352a32 32 0 0 1 0 64H192v640h640V512z"></path>
                        <path d="M470 554.2l52.8-7.5L847.1 222.4a32 32 0 1 0-45.2-45.2L477.4 501.4l-7.5 52.8z m422.4-422.4a96 96 0 0 1 0 135.8l-331.9 331.9a32 32 0 0 1-18.1 9.1L436.8 623.7a32 32 0 0 1-36.2-36.2l15.1-105.6a32 32 0 0 1 9-18.2l331.9-331.8a96 96 0 0 1 135.8 0z"></path>
                    </svg>
                </button>
            }
            {
                history &&
                <button className="text-blue-500" title="History">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="1.3em"
                        height="1.3em"
                        fill="black"
                        viewBox="0 0 1024 1024"
                    >
                        <path d="M968.1 783.8l48.6-42.7-42.6-73.8-61.9 20.9c-13.7-11.5-29-20.5-46.1-26.9L853.3 597.3h-85.3l-12.8 63.6c-17.1 6.4-32.4 15.4-46.1 26.9l-61.8-20.9-42.7 73.8 48.6 42.7c-3.4 21.3-3.4 32.4 0 53.7l-48.6 42.7 42.7 73.8 61.8-20.9c13.7 11.5 29 20.5 46.1 26.9L768 1024h85.3l12.8-63.6c17.1-6.4 32.4-15.4 46.1-26.9l61.9 21 42.6-73.9-48.6-42.6c3.4-21.8 3.4-32.9 0-54.2zM810.7 896c-46.9 0-85.3-38.4-85.4-85.3s38.4-85.3 85.4-85.4 85.3 38.4 85.3 85.4-38.4 85.3-85.3 85.3zM469.3 298.7v230.8l100.7 100.7 44.4-76.4-59.7-59.3V298.7h-85.4z m426.7 213.3a384 384 0 0 0-384-384C391.3 128 283.7 184.3 213.3 271.4V170.7H128v256h256V341.3H267.1A299.1 299.1 0 0 1 512 213.3c164.7 0 298.7 134 298.7 298.7h85.3z m-432.6 294.8c-127.6-20.9-228.3-123.7-246.7-252.1H130.6c21.3 192 183.9 341.3 381.4 341.3h3l-51.6-89.2z"></path>
                    </svg>
                </button>
            }
            {
                printer &&
                <button className="text-black-500" title="Edit" onClick={onClick}>
                    {printerIcon}
                </button>
            }

            <button className="text-black-500" title="Edit" onClick={handleConfirmDelete}>
                {deleteIcon}
            </button>
        </div>
    )
}

export default ActionButton