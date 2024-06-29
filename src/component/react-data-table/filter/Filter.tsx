import { filterIcon } from '@/utils/icons/icons'
import React from 'react'

const Filter = () => {
    return (

        <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center">
        {filterIcon}
          <span className="mr-2 ml-1">Filter:</span>
          <div className="relative w-11/12">
            <input type="text" className="border h-8 pl-8 pr-2 w-full" />
          </div>
        </div>
      
        <div className="flex justify-end items-center">
          <span className="mr-2">Search:</span>
          <input type="text" className="border h-8 px-2" />
        </div>
      </div>
      



    



        // <div className="flex">
        //     {filterIcon}
        //    
        //     <input type="text" className="border h-8 px-2" />
        // </div>
        
    )
}

export default Filter