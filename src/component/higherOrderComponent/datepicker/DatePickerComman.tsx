import React, { useState } from 'react'
import DatePicker from "react-datepicker";

interface DatePickerCommanProps {
  title?: string;
  datePickerTxt?:string;
  btnText?:string;
  btnClass?:string;
}


const  DatePickerComman:React.FC<DatePickerCommanProps>=({title,datePickerTxt,btnText,btnClass})=> 
{
    const [startDate, setStartDate] = useState<any>(null);
    const [endDate, setEndDate] = useState<any>(null);

  return (
    <div className="my-2.5 flex items-center gap-2">
    <div className="">
      {
        title &&(
        <label htmlFor="inputText3" className="block text-gray-700 w-max">
          {title}
        </label>
        )
      }
      <div className="flex items-center">
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          placeholderText="Start Date"
          className="block w-full px-3 py-2 border rounded h-9 sm:w-32 md:w-40 xl:w-full"
        />
        {
          datePickerTxt &&(
            <h2
            className="rounded-full bg-gray-400 text-white py-2 items-center justify-center flex"
            style={{ width: "35px", height: "35px" }}
          >
            {datePickerTxt}
          </h2>
          )
        }
        
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          placeholderText="End Date"
          className="block w-full px-3 py-2 border rounded h-9 sm:w-32 md:w-40 xl:w-full"
        />
      </div>
    </div>
    {
      btnText &&(
        <button
        className={btnClass}
        style={{ minWidth: "120px", height: "32px" }}
      >
        {btnText}
      </button>
      )
    }
  
  </div>
  )
}

export default DatePickerComman;

