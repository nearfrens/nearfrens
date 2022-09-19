import { IParamsStyle } from '../interface/params';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
 

interface paramsStyleState {
    params: IParamsStyle;
}

export const initialState: paramsStyleState = {
    params: { isFun: true },
}

export const paramStyleSlice = createSlice({
    name: "paramsStyle",
    initialState,
    reducers: {
        set: (state, action: PayloadAction<IParamsStyle>) => {
            if (action.payload.isFun !== undefined) state.params.isFun = action.payload.isFun;
        }
    },
});

export const { set } = paramStyleSlice.actions;

export const selectParamsStyle = (state: RootState) => state.paramsStyle.params;

export default paramStyleSlice.reducer;
