import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import { MarkerData } from "../interface/map";


export interface MapYourPositionsState {
    markers: Array<MarkerData>;
}

export const initialState: MapYourPositionsState = {
    markers: [],
}

export const mapYourPositionsSlice = createSlice({
    name: "mapYourPositions",
    initialState,
    reducers: {
        append: (state, action: PayloadAction<MarkerData>) => {
            return {"markers": [ ...state.markers, action.payload ]};
        },
        pop: (state, action: PayloadAction<MarkerData>) => {
            console.log(action.payload.uuid);
        },
        reset: (state) => {
            return {"markers": []};
        }
    },
});

export const { append, pop, reset } = mapYourPositionsSlice.actions;

export const selectMapCoordPosition = (state: RootState) => state.mapYourPositions.markers;

export default mapYourPositionsSlice.reducer;
