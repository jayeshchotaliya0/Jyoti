'use client'
import ManageMachineShop from '@/component/TableCommanHeader/TableCommanHeader';
import ActionButton from '@/component/actionButton/ActionButton';
import Filter from '@/component/higherOrderComponent/Filter/Filter';
import Modal from '@/component/higherOrderComponent/modal/Modal';
;
import ReusableTable from '@/component/react-data-table/Table';
import ConfirmPop from '@/utils/ConfirmPop/ConfirmPop';
import FilterArray from '@/utils/FilterArray';
import { StatusColumn } from '@/utils/functions/commonFunction';
import { confirmationClose, confirmationOpen, openModal } from '@/utils/redux/features/reduxData';
import MultiSelect from '@/utils/selectBox/MultiSelect';
import SelectBox from '@/utils/selectBox/SelectBox';
import service from '@/utils/service/service';
import useFetchData from '@/utils/useFetchData/customFetchData';
import React, { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
interface FormData {
    firstName: string;
    status: boolean;
}

const page = () => {
    const openAddModal = useSelector((state: any) => state.isModalOpen)
    const confirmationModal = useSelector((state: any) => state.isConfirmation)

    const { getQueryFetch, listData, getListData,updateData,addData,deleteItem,getItemById } = useFetchData();
    const [asstManagementData, setAsstManagementData] = useState([])
    const { register, handleSubmit, formState: { errors }, control, reset,setValue } = useForm<FormData>();
    const [asstId, setAsstId] = useState<any>()
    const dispatch = useDispatch()
    const columns = [
        {
            name: 'Sr. No.',
            selector: (row: any) => row.id,
            sortable: true,
            width: '7rem'
        },
        {
            name: 'Asst. Manager Name',
            selector: (row: any) => row?.firstName + ' ' + row?.lastName,
            sortable: true,
            width: '50rem'
        },

        {
            name: 'Status',
            selector: (row: any) => <StatusColumn row={row} />,
            sortable: true

        },
        {
            name: 'Action',
            selector: (row:any) => {
                return <><ActionButton edit history deleteAction 
                onClick={() => handleEdit(row?.empId)}
                handleConfirmDelete={() => handleOpenDelete(row?.empId)}
                /> </>
            },
            sortable: false,
            width: '10rem',
        },
    ];
    const getFilterAssData = async () => {
        const queryParams = { assistantManager: true };
        const apiUrl = service.API_URL.asstManagerMaster.listing;

        const data = await getQueryFetch(queryParams, apiUrl);
        if (data) {
            setAsstManagementData(data)
        }
    }
    const modalListing = async () => {
        try {
            const apiUrls = {
                shiftsData: service?.API_URL?.shiftManagement?.listing,
            };
            await getListData(apiUrls);
        } catch (error) {
            console.error("Error fetching common data:", error);
        }
    };

    useEffect(() => {
        if (openAddModal) {
            modalListing();
        }
    }, [openAddModal]);

    useEffect(() => {
        getFilterAssData()
    }, [])
    const options = listData?.shiftsData?.map(v => ({
        value: v.shiftId,
        label: v?.shiftName
        
    }));
    const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
        const body = {
            ...data,
            empId: asstId ? asstId : 0,
            assistantManager:true,
            supervisor:false,
            isDelete: false,
        }
        if (asstId) {
            await updateData(body, service?.API_URL?.asstManagerMaster.update, reset)
        } else {
            await addData(body, service?.API_URL?.asstManagerMaster.add, reset)
        }
    }

    const handleEdit = async (id: any) => {

        try {
            setAsstId(id)
            const editMachineRes: any = await getItemById(id, service.API_URL.asstManagerMaster.getbyid);
            if (editMachineRes) {
                dispatch(openModal());
                Object.keys(editMachineRes).forEach((key) => {
                    setValue(key as keyof FormData, editMachineRes[key]);
                });

            } else {
                // Handle the case where apiStatus is false
                console.error('API call was not successful:', editMachineRes)
                // You can set some error state here if needed
            }
        } catch (error) {
            // Handle the error
            // You can set some error state here if needed
        } finally {
        }
        // Perform your edit actions here
    }
    const handleOpenDelete = async (id: any) => {
        setAsstId(id)
        dispatch(confirmationOpen())
    }
    const handleConfirmDelete = async () => {
        if (asstId) {
            await deleteItem(asstId,service?.API_URL?.asstManagerMaster.add)
        }
    }
    return (
        <>

            <ManageMachineShop
                addBtnTitle="Add Asst. Manger"
                importBtnTitle="Import"
                exportBtnTitle="Export"
            />
            <Filter data={FilterArray.asstManagermaster} />

            <ReusableTable
                columns={columns}
                data={asstManagementData || []}
            />

            <Modal
                mdlTitle="Add Asst. Manager"
                btnSubmit="Save"
                openAddModal={openAddModal}
                onSubmit={handleSubmit(onSubmit)}
                reset={() => reset()}
                body={
                    <div className="grid grid-cols-3 gap-4">
                        <div>
                            <label htmlFor="name" className="block text-gray-700">
                                Asst. Manager Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                {...register('firstName', {
                                    required: 'This field is required',
                                })}
                                id="firstName"
                                type="text"
                                className="block w-full px-3 py-2 border rounded mt-2"
                            />
                            {errors?.firstName?.message && (
                                <span className="text-red-500">
                                    {errors?.firstName?.message}
                                </span>
                            )}
                        </div>
                        {/* <div>
                            <label htmlFor="inputText3" className="block text-gray-700">
                                Shift <span className="text-red-500">*</span>
                            </label>
                            <MultiSelect
                                name="shiftId"
                                options={options}
                                isMulti={true}
                                control={control}
                                required
                            />
                        </div> */}
                        <div>
                            <label htmlFor="inputText3" className="block text-gray-700">
                                Status
                            </label>
                            <label className="inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    {...register('status', {})}
                                    className="sr-only peer"
                                />
                                <div className="relative w-11 h-6 mt-5 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                            </label>
                        </div>
                    </div>

                }
            />
            <ConfirmPop
                isOpen={confirmationModal}
                headingText='Confirmation'
                onClose={() => dispatch(confirmationClose())}
                onClickInChild={handleConfirmDelete}
                title="Are you sure want delete ?"
                footerButton={{ closeText: "No", confirmText: 'Yes' }}
            />
        </>)
}

export default page