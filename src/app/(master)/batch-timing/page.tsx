"use client";
import ManageMachineShop from "@/component/TableCommanHeader/TableCommanHeader";
import ActionButton from "@/component/actionButton/ActionButton";
import Modal from "@/component/higherOrderComponent/modal/Modal";
import ReusableTable from "@/component/react-data-table/Table";
import { add, deleteIcon } from "@/utils/icons/icons";
import SelectBox from "@/utils/selectBox/SelectBox";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
interface FormData {
  name: string;
  status: boolean;
}

const page = () => {
  const openAddModal = useSelector((state: any) => state.isModalOpen);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<FormData>();
  const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
    console.log("data", data);
  };
  const columns = [
    {
      name: "Sr. No.",
      selector: (row: any) => row.id,
      sortable: true,
      width: "7rem",
    },
    {
      name: "Asst. Manager Name",
      selector: (row: any) => row.asstmanagername,
      sortable: true,
      width: "50rem",
    },
    {
      name: "Shift",
      selector: (row: any) => row.shift,
      sortable: true,
      width: "23rem",
    },
    {
      name: "Status",
      selector: (row: any) => (
        <label className="inline-flex items-center cursor-pointer">
          <input type="checkbox" value="" className="sr-only peer" checked />
          <div className="relative w-11 h-6 mt-5 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
        </label>
      ),
      sortable: true,
    },
    {
      name: "Action",
      selector: () => {
        return <ActionButton edit history />;
      },
      sortable: false,
      width: "5rem",
    },
  ];
  const data = [
    {
      id: 1,
      asstmanagername: "Ayushi",
      shift: "First",
    },
    {
      id: 2,
      asstmanagername: "Ajay",
      shift: "Second",
    },
    {
      id: 3,
      asstmanagername: "Mohit",
      shift: "First",
    },
    {
      id: 4,
      asstmanagername: "Mansi",
      shift: "First",
    },
    {
      id: 5,
      asstmanagername: "Jayesh",
      shift: "Second",
    },
    {
      id: 6,
      asstmanagername: "MJ",
      shift: "First",
    },
    {
      id: 7,
      asstmanagername: "AP",
      shift: "First",
    },
  ];
  return (
    <>
      <ManageMachineShop
      />
      <div className="grid items-center grid-cols-[1fr_2fr] gap-[70px] bg-white p-5 mt-3">
        <div className="box_left">
          <div className="">
            <div className='mb-16 p-1 flex items-center'>
                <input id="red-radio" type="radio" value="" name="colored-radio" className="w-4 h-4 bg-gray-100 border-gray-300 " />
                <label htmlFor="red-radio" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Active This Function</label>
            </div>
          </div>
          <div className="flex items-center gap-[20px]">
            <div className="w-full">
              <label htmlFor="name" className="block text-gray-700">
                Time <span className="text-red-500">*</span>
              </label>
              <input
                {...register("name", {
                  required: "This field is required",
                })}
                id="name"
                type="text"
                className="block w-full px-3 py-2 border rounded mt-2"
              />
            </div>
            <div className="mt-6 w-max">
              <select className="block px-3 py-2 border rounded mt-2">
                <option>AM</option>
                <option>PM</option>
              </select>
            </div>
            <div className="mt-6 w-max">
              <span className="bg-red-600 px-4 hover:bg-red-400 inline-block p-2.5 text-white mt-4 rounded">
                {deleteIcon}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-[20px]">
            <div className="w-full">
              <label htmlFor="name" className="block text-gray-700">
                Time <span className="text-red-500">*</span>
              </label>
              <input
                {...register("name", {
                  required: "This field is required",
                })}
                id="name"
                type="text"
                className="block w-full px-3 py-2 border rounded mt-2"
              />
            </div>
            <div className="mt-6 w-max">
              <select className="block px-3 py-2 border rounded mt-2">
                <option>AM</option>
                <option>PM</option>
              </select>
            </div>
            <div className="mt-6 w-max">
              <span className="bg-red-600 px-4 hover:bg-red-400 inline-block p-2.5 text-white mt-4 rounded">
                {deleteIcon}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-[20px]">
            <div className="w-full">
              <label htmlFor="name" className="block text-gray-700">
                Time <span className="text-red-500">*</span>
              </label>
              <input
                {...register("name", {
                  required: "This field is required",
                })}
                id="name"
                type="text"
                className="block w-full px-3 py-2 border rounded mt-2"
              />
            </div>
            <div className="mt-6 w-max">
              <select className="block px-3 py-2 border rounded mt-2">
                <option>AM</option>
                <option>PM</option>
              </select>
            </div>
            <div className="mt-6 w-max">
              <span className="bg-indigo-500 px-4 hover:bg-indigo-400 inline-block p-2.5 text-white mt-4 rounded">
                {add}
              </span>
            </div>
          </div>
        </div>

        <div className="flex gap-[70px] items-center">
          <div className="flex flex-col items-center">
            <div className="w-px h-40 bg-black"></div>
            <div className="text-xl font-bold">OR</div>
            <div className="w-px h-40 bg-black"></div>
          </div>
          <div className="w-full">
          <div className="">
            <div className='mb-16 p-1 flex items-center'>
                <input id="red-radio" type="radio" value="" name="colored-radio" className="w-4 h-4 bg-gray-100 border-gray-300 " />
                <label htmlFor="red-radio" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Active This Function</label>
            </div>
          </div>
            <div className="flex items-center space-y-2 justify-between	gap-8">
              <div className="w-full">
                <label htmlFor="name" className="block text-gray-700">
                  Hours <span className="text-red-500">*</span>
                </label>
                <input
                  {...register("name", {
                    required: "This field is required",
                  })}
                  id="name"
                  type="text"
                  className="block w-full px-3 py-2 border rounded mt-2"
                />
              </div>
              <div className="">
                <span className="block mt-6">Before</span>
              </div>
              <div className="w-full">
                <label htmlFor="name" className="block text-gray-700">
                  Shift <span className="text-red-500">*</span>
                </label>
                <input
                  {...register("name", {
                    required: "This field is required",
                  })}
                  id="name"
                  type="text"
                  className="block w-full px-3 py-2 border rounded mt-2"
                />
              </div>
              <div className="my-10 w-max">
                <span className="bg-red-600 px-4 hover:bg-red-400 inline-block p-2.5 text-white rounded mt-8">
                  {deleteIcon}
                </span>
              </div>
            </div>
            <div className="flex items-center space-y-2 justify-between	gap-8">
              <div className="w-full">
                <label htmlFor="name" className="block text-gray-700">
                  Hours <span className="text-red-500">*</span>
                </label>
                <input
                  {...register("name", {
                    required: "This field is required",
                  })}
                  id="name"
                  type="text"
                  className="block w-full px-3 py-2 border rounded mt-2"
                />
              </div>
              <div className="">
                <span className="block mt-6">Before</span>
              </div>
              <div className="w-full">
                <label htmlFor="name" className="block text-gray-700">
                  Shift <span className="text-red-500">*</span>
                </label>
                <input
                  {...register("name", {
                    required: "This field is required",
                  })}
                  id="name"
                  type="text"
                  className="block w-full px-3 py-2 border rounded mt-2"
                />
              </div>
              <div className="my-10 w-max">
              <span className="bg-red-600 px-4 hover:bg-red-400 inline-block p-2.5 text-white rounded mt-8">
                {deleteIcon}
              </span>
              </div>
            </div>
            <div className="flex items-center space-y-2 justify-between gap-8">
              <div className="w-full">
                <label htmlFor="name" className="block text-gray-700">
                  Hours <span className="text-red-500">*</span>
                </label>
                <input
                  {...register("name", {
                    required: "This field is required",
                  })}
                  id="name"
                  type="text"
                  className="block w-full px-3 py-2 border rounded mt-2"
                />
              </div>
              <div className="">
                <span className="block mt-6">Before</span>
              </div>
              <div className="w-full">
                <label htmlFor="name" className="block text-gray-700">
                  Shift <span className="text-red-500">*</span>
                </label>
                <input
                  {...register("name", {
                    required: "This field is required",
                  })}
                  id="name"
                  type="text"
                  className="block w-full px-3 py-2 border rounded mt-2"
                />
              </div>
              <div className="my-10 w-max">
              <span className="bg-indigo-500 px-4 hover:bg-indigo-400 inline-block p-2.5 text-white rounded mt-10">
                {add}
              </span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-end p-4 md:p-5 border-t space-x-3 border-gray-200 rounded-b dark:border-gray-600 row-start-2 row-end-3 col-start-1 col-end-3">
          <button
            type="button"
            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Save
          </button>
        </div>
      </div>
    </>
  );
};

export default page;
