"use client";
import ManageMachineShop from "@/component/TableCommanHeader/TableCommanHeader";
import Filter from "@/component/higherOrderComponent/Filter/Filter";
import ReusableTable from "@/component/react-data-table/Table";
import FilterArray from "@/utils/FilterArray";
import React, { useState } from "react";
import UpdateQty from "./updateQty/UpdateQty";
import AddPOtoQueue from "./AddPOtoQueue/AddPOtoQueue";
import AddUnplannedPO from "./AddUnplannedPO/AddPOtoQueue";
import AddBulkToQueue from "./AddBulkToQueue/AddPOtoQueue";
import AddBulkUnplannedPO from "./AddBulkUnplannedPO/AddPOtoQueue";
import DatePickerComman from "@/component/higherOrderComponent/datepicker/DatePickerComman";
import AddCellPlannedPO from "./AddCellPlannedPO/UpdateQty";
import UnplannedHistory from "./UnplannedHistory/UnplannedHistory";
import ActionButton from "@/component/actionButton/ActionButton";
import { StatusColumn } from "@/utils/functions/commonFunction";

const page = () => {

  const columns = [
    {
      name: "",
      selector: (row: any) => row.id,
      sortable: true,
      width: "7rem",
    },
    {
      name: "Priority",
      selector: (row: any) => row.priority,
      sortable: true,
    },
    {
      name: "Order No.",
      selector: (row: any) => row.orderno,
      sortable: true,
    },
    {
      name: "Plan Type",
      selector: (row: any) => row.plantype,
      sortable: true,
    },
    {
      name: "Part No./Part Name",
      selector: (row: any) => row.partnopartname,
      sortable: true,
      width: '12rem',
    },
    {
      name: "Model Sub Assm. Code",
      selector: (row: any) => row.modelsubassmcode,
      sortable: true,
      width: '15rem',
    },
    {
      name: "Planned Start Time",
      selector: (row: any) => row.plannedstarttime,
      sortable: true,
      width: '12rem',
    },
    {
      name: "Planned End Time",
      selector: (row: any) => row.plannedendtime,
      sortable: true,
      width: '12rem',
    },
    {
      name: "Actual Start Time",
      selector: (row: any) => row.actualstarttime,
      sortable: true,
      width: '12rem',
    },
    {
      name: "Actual End Time",
      selector: (row: any) => row.actualendtime,
      sortable: true,
      width: '12rem',
    },
    {
      name: "Qty.",
      selector: (row: any) => row.qty,
      sortable: true,
    },
    {
      name: "Finished Qty.",
      selector: (row: any) => row.finishedqty,
      sortable: true,
      width: '12rem',
    },
    {
      name: "WIP Qty.",
      selector: (row: any) => row.wipqty,
      sortable: true,
    },
    {
      name: "Added By",
      selector: (row: any) => row.addedby,
      sortable: true,
    },
    {
      name: "Production Confirmation",
      selector: (row: any) => <><button className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600 block m-auto mt-1">Hold</button>UR001, 2024/05/06 5:25 PM</>,
      sortable: true,
      width: '15rem',
    },
    {
      name: "Free P.O.",
      selector: (row: any) => (
        <StatusColumn row={row}/>
      ),
      sortable: true,
    },
    {
      name: "All",
      selector: (row: any) => row.all,
      sortable: true,
    },
    {
      name: 'Action',
      selector: () => {
        return <><ActionButton printer edit deleteAction/> </>
      },
      sortable: false,
      width: '10rem',
    },
  ];
  const data = [
    {
      id: "+",
      priority: "A",
      orderno: "150867",
      plantype: "Scheduled",
      partnopartname: "A01-Cartridge",
      modelsubassmcode: "",
      plannedstarttime: "2024/05/06 5:25 PM",
      plannedendtime: "2024/05/06 5:25 PM",
      actualstarttime: "",
      actualendtime: "",
      qty: "1",
      finishedqty: "0",
      wipqty: "0",
      addedby: "UR001, 2024/05/06 5:25 PM",
      productionconfirmation: "",
      freepo: "",
      all: "-",
      action: "",
    },
    {
      id: "+",
      priority: "A",
      orderno: "150863",
      plantype: "Scheduled",
      partnopartname: "A01-Cartridge",
      modelsubassmcode: "",
      plannedstarttime: "2024/05/06 5:25 PM",
      plannedendtime: "2024/05/06 5:25 PM",
      actualstarttime: "",
      actualendtime: "",
      qty: "1",
      finishedqty: "0",
      wipqty: "0",
      addedby: "UR001, 2024/05/06 5:25 PM",
      productionconfirmation: "",
      freepo: "",
      all: "-",
      action: "",
    },
  ];

  return (
    <>
      <ManageMachineShop
      addPOtoQueue='+ Add PO to Queue'
      addUnplannedPO='+ Add Unplanned PO'
      addBulkUnplannedPO='+ Add Bulk unplanned PO'
      updateQtyPriority="Update Qty./ Priority"
      addBulkToQueue="Add Bulk to Queue"
      addCellPlannedPO="Add Cell Planned PO"
      unplannedHistory="Unplanned History"
      exportBtnTitle="Format"
      />

      <Filter
        data={FilterArray.machineshopplanning}
        exportButton
        exportQty
      />
       <DatePickerComman 
          title="Deadline Date" 
          datePickerTxt="To" 
          btnText="Under Deadline"
          btnClass="font-bold p-5 flex items-center justify-center text-white bg-indigo-500 hover:bg-indigo-600 focus:ring-4 focus:ring-indigo-300 font-medium text-sm px-5 py-2 mb-2 focus:outline-none mt-8" 
      />
      <ReusableTable columns={columns} data={data} />
      <AddPOtoQueue/>
      <AddBulkToQueue/>
      <AddBulkUnplannedPO/>
      <AddUnplannedPO/>
      <UpdateQty/>
      <AddCellPlannedPO/>
      <UnplannedHistory/>

    </>
  );
};

export default page;
