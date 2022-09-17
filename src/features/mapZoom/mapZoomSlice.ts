import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./../../app/store";

interface mapZoomState {
    value: number;
}

export const initialState: mapZoomState = {
    value: 2.0,
}

export const mapZoomSlice = createSlice({
    name: "mapZoom",
    initialState,
    reducers: {
        set: (state, action: PayloadAction<number>) => {
            state.value = action.payload
        },
        increment: (state) => {
            state.value += 1.0
        },
        decrement: (state) => {
            state.value -= 1.0
        },
        incrementByAmount: (state, action: PayloadAction<number>) => {
            state.value += action.payload
        },
    },
});

export const { set, increment, decrement, incrementByAmount } = mapZoomSlice.actions;

export const selectMapZoom = (state: RootState) => state.mapZoom.value;

export default mapZoomSlice.reducer;
