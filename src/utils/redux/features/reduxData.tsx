import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the initial state interface
interface ReduxStateData {
    reduxData: any;
    isModalOpen:boolean;
    isConfirmation:boolean;
    modals:{}
}

// Define the initial state
const initialState: ReduxStateData = {
    reduxData: {},
    isConfirmation:false,
    isModalOpen: false, // New state for modal open/close
    modals:{}

};

// Create the sign up slice
const reduxDataSlice = createSlice({
    name: "reduxData",
    initialState,
    reducers: {
        // Action to add sign up data
        reduxSliceData: (
            state,
            action: PayloadAction<{ key: string; data: any; id?: any }>,
        ) => {
            state.reduxData[action.payload.key] = action.payload.data;
        },
        logout: () => initialState,
        openModal: (state) => {
            state.isModalOpen = true;
        },
        confirmationOpen: (state) => {
            state.isConfirmation = true;
        },
        confirmationClose: (state) => {
            state.isConfirmation = false;
        },
        // Action to close the modal
        closeModal: (state) => {
            state.isModalOpen = false;
        },
        addOpenModal: (state:any, action: PayloadAction<string>) => {
            state.modals[action.payload] = true;
        },
        // Action to close a specific modal
        addCloseModal: (state:any, action: PayloadAction<string>) => {
            state.modals[action.payload] = false;
        },
    },
});

// Export actions and reducer
export const { reduxSliceData, logout,openModal,closeModal,addOpenModal,addCloseModal,confirmationOpen,confirmationClose } = reduxDataSlice.actions;
export default reduxDataSlice.reducer;
