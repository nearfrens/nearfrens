import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { Coordinate } from "../../interface/map";

interface mapCoordPositionState {
    coordinate: Coordinate|null;
}

export const initialState: mapCoordPositionState = {
    coordinate: null,
}

export const mapCoordPositionSlice = createSlice({
    name: "mapCoordPosition",
    initialState,
    reducers: {
        set: (state, action: PayloadAction<Coordinate|null>) => {
            if ( action.payload === null ) {
                state.coordinate = null;
            } else {
                state.coordinate = { 
                    longitude: action.payload.longitude,
                    latitude: action.payload.latitude,
                }
            }
        },
    },
});

export const { set } = mapCoordPositionSlice.actions;

export const selectMapCoordPosition = (state: RootState) => state.mapCoordPosition.coordinate;

export default mapCoordPositionSlice.reducer;
