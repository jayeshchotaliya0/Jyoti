import Modal from '@/component/higherOrderComponent/modal/Modal';
import ReusableTable from '@/component/react-data-table/Table';
import SelectBox from '@/utils/selectBox/SelectBox';
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

interface FormData {
    machineShop: string;
    shift: any;
    machineShopLine: any;
    machineCategory: any;
    workCenterName: any;
    workCenterDesc: any;
    workCenterType: any;
    asstManager: any;
    supervisorGroup: any;
    cycleTimeSplitter: any;
    cycleTimeSplitterSimulator: any;
    status: any;
    shiftName: string;
  }
const UnplannedHistory = () => {
    const modals = useSelector((state: any) => state.modals);
console.log("modals",modals)
    const {
        handleSubmit,
      } = useForm<FormData>();
  const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
  }
  const columns = [
   
    {
      name: "Order No.",
      selector: (row: any) => row.orderno,
      sortable: true,
    },
    {
      name: "Part",
      selector: (row: any) => row.part,
      sortable: true,
    },
    {
        name: "Qty.",
        selector: (row: any) => row.qty,
        sortable: true,
      },
      {
        name: "Header Priority",
        selector: (row: any) => row.seaderpriority,
        sortable: true,
      },
      {
        name: "Priority",
        selector: (row: any) => row.Priority,
        sortable: true,
      },
      {
        name: "Created By",
        selector: (row: any) => row.createdby,
        sortable: true,
      },
      {
        name: "Created Date",
        selector: (row: any) => row.createddate,
        sortable: true,
      },
      {
        name: "Reason",
        selector: (row: any) => row.reason,
        sortable: true,
      },
  ];
  const data = [
    {
     orderno: "20396521",
     part: "F3G500100300 - MGZN BRKT-24TLS SERVO",
     qty: "10",
     seaderpriority: "Y",
     Priority: "9999",
     createdby: "FX - Juned M. Shaikh - 0",
     createddate: "04/06/2024 03:41:29 PM",
     Reason: "Schedual Material not Available",
    },
    {
        orderno: "20396519",
        part: "",
        qty: "2",
        seaderpriority: "Y",
        Priority: "9999",
        createdby: "FX - Juned M. Shaikh - 0",
        createddate: "04/06/2024 03:41:29 PM",
        Reason: "Schedual Material not Available",
       },
  ];
  return (
    <Modal
        mdlTitle="Unplanned History"
        btnSubmit="Save"
        openAddModal={modals.unplannedHistory}
        onSubmit={handleSubmit(onSubmit)}
        closeName={'unplannedHistory'}

        body={
            <div>
            <ReusableTable columns={columns} data={data} />
            </div>
        }
      />
  )
}

export default UnplannedHistory