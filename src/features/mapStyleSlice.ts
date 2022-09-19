import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import { MapStyle, OptionMapStyles } from '../interface/map';

interface mapStyleState {
    mapStyle: MapStyle;
}

export const initialState: mapStyleState = {
    mapStyle: { style: OptionMapStyles.DARK }
}

export const mapStyleSlice = createSlice({
    name: "mapStyle",
    initialState,
    reducers: {
        set: (state, action: PayloadAction<MapStyle>) => {
            state.mapStyle = action.payload
        }
    },
});

export const { set } = mapStyleSlice.actions;

export const selectmapStyle = (state: RootState) => state.mapStyle.mapStyle;

export default mapStyleSlice.reducer;
