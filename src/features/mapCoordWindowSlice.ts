import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import { Coordinate } from "../interface/map";

interface mapCoordWindowState {
    coordinate: Coordinate;
}

export const initialState: mapCoordWindowState = {
    coordinate: { longitude: 0.0, latitude: 0.0 }
}

export const mapCoordWindowSlice = createSlice({
    name: "mapCoordWindow",
    initialState,
    reducers: {
        set: (state, action: PayloadAction<Coordinate>) => {
            state.coordinate.longitude = action.payload.longitude;
            state.coordinate.latitude = action.payload.latitude;
        },
    },
});

export const { set } = mapCoordWindowSlice.actions;

export const selectMapCoordWindow = (state: RootState) => state.mapCoordWindow.coordinate;

export default mapCoordWindowSlice.reducer;
