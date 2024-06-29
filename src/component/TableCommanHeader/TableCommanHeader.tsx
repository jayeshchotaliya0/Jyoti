"use client";
import React from "react";
import { usePathname } from "next/navigation";
import { formatPathname } from "@/utils/functions/commonFunction";
import { SearchIcon, add, exportIcon, filterIcon, importIcon, refreshIcon } from "@/utils/icons/icons";
import { useDispatch } from "react-redux";
import { addOpenModal, openModal } from "@/utils/redux/features/reduxData";
import SelectBox from "@/utils/selectBox/SelectBox";
import { useForm } from "react-hook-form";

interface MachineShopTableProps {
  title?: string;
  addBtnTitle?: string;
  importBtnTitle?: string;
  exportBtnTitle?: string;
  selectboxShow?: any;
  setOpenAddModal?: any;
  plannedProduction?: any;
  updatePriority?: any;
  cellPlanned?: any;
  addPOtoQueue?: any;
  addUnplannedPO?: any;
  addBulkUnplannedPO?: any;
  updateQtyPriority?: any;
  addBulkToQueue?: any;
  addCellPlannedPO?: any;
  unplannedHistory?: any;
}

const ManageMachineShop: React.FC<MachineShopTableProps> = ({
  addBtnTitle,
  importBtnTitle,
  exportBtnTitle,
  plannedProduction,
  updatePriority,
  cellPlanned,
  addPOtoQueue,
  addBulkToQueue,
  addUnplannedPO,
  addBulkUnplannedPO,
  updateQtyPriority,
  addCellPlannedPO,
  unplannedHistory,
}) => {
  const {
    formState: { errors },
    control,
  } = useForm();

  const pathname = usePathname();
  const dispatch = useDispatch();

  const handleAddModal = (name: string) => {
    dispatch(addOpenModal(name));
  };

  const handleDropDownModal = (name: any) => {
    dispatch(addOpenModal(name));
  };

  const buttonsConfig = [
    { condition: plannedProduction, label: plannedProduction, modalName: "plannedProduction" },
    { condition: updatePriority, label: updatePriority, modalName: "updatePriority" },
    { condition: cellPlanned, label: cellPlanned, modalName: cellPlanned },
    { condition: updateQtyPriority, label: updateQtyPriority, modalName: "updateQtyPriority" },
    { condition: addCellPlannedPO, label: addCellPlannedPO, modalName: "addCellPlannedPO" },
    { condition: unplannedHistory, label: unplannedHistory, modalName: "unplannedHistory" },
    { condition: addBtnTitle, label: addBtnTitle, modalName: "addBtnTitle", handler: () => dispatch(openModal()) },
    { condition: importBtnTitle, label: importBtnTitle, icon: importBtnTitle === "Refresh" ? refreshIcon : importIcon, handler: () => console.log('Import Clicked'), className: "bg-teal-500 hover:bg-teal-600 focus:ring-4 focus:ring-teal-300" },
    { condition: exportBtnTitle, label: exportBtnTitle, icon: exportIcon, handler: () => console.log('Export Clicked'), className: "bg-amber-500 hover:bg-amber-600 focus:ring-4 focus:ring-amber-300" }
  ];

  return (
    <>
      <div className="grid grid-flow-col gap-4 bg-white p-3.5 xl:flex xl:flex-wrap xl:justify-between xl:gap-2 md:flex md:flex-wrap md:justify-between md:gap-2 sm:flex sm:flex-wrap sm:justify-between sm:gap-2">
        <div className="text-left">
          <h2 className="text-xl subpixel-antialiased font-medium">
            {formatPathname(pathname)}
          </h2>
        </div>
        <div className="flex justify-end gap-1 rounded-lg md:flex-wrap md:justify-start sm:flex-wrap sm:justify-start">
          {pathname === '/machine-shop-planning' && (
            <>
              <SelectBox
                list={[
                  { id: 1, lins: addPOtoQueue, value: 'addPOtoQueue' },
                  { id: 2, lins: addBulkToQueue, value: 'addBulkToQueue' },
                ]}
                keyField="value"
                valueField="lins"
                name="manageshop"
                control={control}
                errors={errors}
                onChange={handleDropDownModal}
                className="block w-full px-2 py-1 h-8 border bg-white rounded w-max text-sm mt-1"
              />
              <SelectBox
                list={[
                  { id: 1, lins: addUnplannedPO, value: 'addUnplannedPO' },
                  { id: 2, lins: addBulkUnplannedPO, value: 'addBulkUnplannedPO' },
                ]}
                keyField="value"
                valueField="lins"
                name="manageshop"
                control={control}
                errors={errors}
                onChange={handleDropDownModal}
                className="block w-full px-2 py-1 h-8 border bg-white rounded w-max text-sm mt-1"
              />
            </>
          )}

          {buttonsConfig.map((btn, index) => (
            btn.condition && (
              <button
                key={index}
                onClick={btn.handler || (() => handleAddModal(btn.modalName))}
                type="button"
                className={`flex items-center justify-center text-white bg-indigo-500 hover:bg-indigo-600 focus:ring-4 focus:ring-indigo-300 font-medium text-sm px-5 py-2.5 mt-1 focus:outline-none ${btn.className || ""}`}
                style={{ minWidth: "120px", height: "32px" }}
              >
                {btn.icon || add}
                &nbsp;&nbsp;
                {btn.label}
              </button>
            )
          ))}

          {pathname === "/priority-and-weightage" && (
            <>
              <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 h-[32px] leading-none">
                Save
              </button>
              <button className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 h-[32px] leading-none">
                Cancel
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ManageMachineShop;
