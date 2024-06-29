import React, { useState } from 'react'
import Input from '../input'
import { filterIcon } from '@/utils/icons/icons'
import SelectBox from '@/utils/selectBox/SelectBox'
import { useForm } from 'react-hook-form'

interface FilterProps {
  data: any,
  exportButton?:any,
  exportQty?:any
}

const Filter: React.FC<FilterProps> = ({ data,exportButton,exportQty }) => {
  const [openFilter, setOpenFilter] = useState(false)
  const {
    formState: { errors },
    control,
  } = useForm()
  return (
    <div className="grid grid-cols-1 gap-2 bg-white mt-2">
      <div className="grid grid-cols-2 gap-2">
        <div onClick={() => setOpenFilter(!openFilter)} className="mt-3.5 ml-2">
         <div className='flex gap-x-2'>{filterIcon} <span>Filter</span></div> 
        </div>
        <div className="flex justify-end mt-2.5 mr-2">
          {!openFilter ? (
            <svg
              onClick={() => setOpenFilter(!openFilter)}
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="25"
              height="25"
              viewBox="0 0 50 50"
            >
              <path d="M 25 2 C 12.309295 2 2 12.309295 2 25 C 2 37.690705 12.309295 48 25 48 C 37.690705 48 48 37.690705 48 25 C 48 12.309295 37.690705 2 25 2 z M 25 4 C 36.609824 4 46 13.390176 46 25 C 46 36.609824 36.609824 46 25 46 C 13.390176 46 4 36.609824 4 25 C 4 13.390176 13.390176 4 25 4 z M 24 13 L 24 24 L 13 24 L 13 26 L 24 26 L 24 37 L 26 37 L 26 26 L 37 26 L 37 24 L 26 24 L 26 13 L 24 13 z"></path>
            </svg>
          ) : (
            <svg
              onClick={() => setOpenFilter(!openFilter)}
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="25"
              height="25"
              viewBox="0 0 50 50"
            >
              <path d="M 25 2 C 12.309295 2 2 12.309295 2 25 C 2 37.690705 12.309295 48 25 48 C 37.690705 48 48 37.690705 48 25 C 48 12.309295 37.690705 2 25 2 z M 25 4 C 36.609824 4 46 13.390176 46 25 C 46 36.609824 36.609824 46 25 46 C 13.390176 46 4 36.609824 4 25 C 4 13.390176 13.390176 4 25 4 z M 13 24 L 13 26 L 37 26 L 37 24 L 13 24 z"></path>
            </svg>
          )}
        </div>
      </div>
      <div>
        <div
          id="accordion-collapse-body-1"
          className={`${openFilter ? 'md:p-2 sm:p-2' : 'hidden'}`}
          aria-labelledby="accordion-collapse-heading-1"
        >
          <div className="grid grid-cols-4 gap-2 md:grid-cols-2 lg:grid-cols-2 sm:grid-cols-2 xl:grid-cols-4">
            {data.map((item:any, index:any) => (
              <div className="ml-2 md:ml-0 sm:ml-0" key={index}>
                <label htmlFor={item.name} className="block text-gray-700">
                  {item.name}
                </label>
                {item.type === 'text' || item.type === 'date' ? (
                  <Input
                    type={item.type}
                    name={item.name}
                    placeholder={item.placeholder}
                    className="block w-full px-3 py-2 border rounded mt-2"
                  />
                ) : item.type === 'selectbox' ? (
                  <select
                    name={item.name}
                    className="block w-full px-3 py-2 border rounded mt-2 bg-white"
                  >
                    <option value="" disabled>
                      {item.placeholder}
                    </option>
                    {item.options?.map((option:any, i:any) => (
                      <option key={i} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                ) : null}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-2 mt-4 justify-between">
            <div className="flex items-center justify-start space-x-2">
              
                  <button
                  type="button"
                  className="ml-2 font-bold p-5 flex items-center justify-center text-white bg-indigo-500 hover:bg-indigo-600 focus:ring-4 focus:ring-indigo-300 font-medium text-sm px-5 py-2.5 mb-2 focus:outline-none"
                  style={{ minWidth: '120px', height: '32px' }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    fill="currentcolor"
                    viewBox="0 0 26.1 26.1"
                  >
                    <path d="M10.4,3.2c4,0,7.2,3.2,7.2,7.2c0,4-3.2,7.2-7.2,7.2c-4,0-7.2-3.2-7.2-7.2C3.2,6.4,6.4,3.2,10.4,3.2 M10.4,0 C4.7,0,0,4.7,0,10.4c0,5.7,4.7,10.4,10.4,10.4c5.7,0,10.4-4.7,10.4-10.4C20.8,4.7,16.2,0,10.4,0z"></path>
                    <path d="M15.7,18.7l6.8,6.8c0.8,0.8,2.2,0.8,3,0s0.8-2.2,0-3l-6.8-6.8c-0.8-0.8-2.2-0.8-3,0 C14.9,16.5,14.9,17.8,15.7,18.7"></path>
                  </svg>
                  &nbsp;&nbsp; Search
                </button>
              
              
          
            <button
                type="button"
                className="font-bold flex items-center justify-center text-white bg-teal-500 hover:bg-teal-600 focus:ring-4 focus:ring-teal-300 font-medium text-sm px-5 py-2.5 mb-2 focus:outline-none"
                style={{ minWidth: '120px', height: '32px' }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1.5em"
                  height="1.5em"
                  fill="currentcolor"
                  viewBox="0 0 1024 1024"
                >
                  <path d="M511.8 170.7C334.3 170.4 186.3 306.2 171.2 483 156.1 659.8 279 818.6 453.9 848.5 628.9 878.3 797.5 769.1 841.8 597.3H753C709.6 720.1 581 790.7 454.1 761.5 327.2 732.2 242.6 612.3 257.3 483 272.1 353.6 381.6 255.9 511.8 256 579.6 256.1 644.5 283.5 692 331.9L554.7 469.3H853.3V170.7L753 270.9C689.2 206.7 602.3 170.6 511.8 170.7Z"></path>
                </svg>
                &nbsp;&nbsp; Refresh
              </button>
              

                 {
                exportButton && (
              <button
                type="button"
                className="ml-2 font-bold p-5 flex items-center justify-center text-white bg-yellow-600  focus:ring-4 focus:ring-indigo-300 font-medium text-sm px-5 py-2.5 mb-2 focus:outline-none"
                style={{ minWidth: '120px', height: '32px' }}
               >
                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentcolor" viewBox="0 0 1024 1024"> 
                <path d="M768 938.7a85.3 85.3 0 0 0 85.3-85.4v-213.3l-213.3 170.7v-128H341.3v-85.4h298.7v-128l213.3 170.7V341.3l-256-256H256a85.3 85.3 0 0 0-85.3 85.4v682.6a85.3 85.3 0 0 0 85.3 85.4h512zM554.7 170.7l213.3 213.3h-213.3V170.7z"> 
                </path> 
                </svg> 
                  &nbsp;&nbsp; Export
                </button>
                )
              }

                {
                exportQty && (
                <button
                type="button"
                className="ml-2 font-bold p-5 flex items-center justify-center text-white bg-purple-500 focus:ring-4 focus:ring-indigo-300 font-medium text-sm px-5 py-2.5 mb-2 focus:outline-none"
                style={{ minWidth: '120px', height: '32px' }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentcolor" viewBox="0 0 1024 1024"> 
                <path d="M768 938.7a85.3 85.3 0 0 0 85.3-85.4v-213.3l-213.3 170.7v-128H341.3v-85.4h298.7v-128l213.3 170.7V341.3l-256-256H256a85.3 85.3 0 0 0-85.3 85.4v682.6a85.3 85.3 0 0 0 85.3 85.4h512zM554.7 170.7l213.3 213.3h-213.3V170.7z"> 
                </path> 
                </svg> 
                  &nbsp;&nbsp; Export Qty.
                </button>
                )
              }


            </div>
            <div className='flex gap-2 justify-end items-center'>
            <div className='w-max'>
                <SelectBox
                  list={[
                    { id: 1, lins: 'PPC' },
                    { id: 2, lins: 'PPC2' },
                  ]}
                  keyField="id"
                  valueField="lins"
                  name="machineshop"
                  control={control}
                  errors={errors}
                  className="block w-full px-3 py-2.5 border bg-white rounded"
                />
              </div>
              <div className=''>
               <button
                type="button"
                className="font-bold flex items-center justify-center text-white bg-teal-500 hover:bg-teal-600 focus:ring-4 focus:ring-teal-300 font-medium text-sm px-5 py-2.5 mb-1 focus:outline-none"
                style={{ minWidth: '120px', height: '32px' }}
              >
                &nbsp;&nbsp; Submit
              </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Filter
