import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import { IUserStatus } from "../interface/user";

export interface UserStatusState {
    status: Array<IUserStatus>;
}

export const initialState: UserStatusState = {
    status: [],
}

export const userStatusSlice = createSlice({
    name: "userStatus",
    initialState,
    reducers: {
        append: (state, action: PayloadAction<IUserStatus>) => {
            return { status: [ ...state.status, action.payload ] };
        },
        reset: (state) => {
            return initialState;
        }
    },
});

export const { append, reset } = userStatusSlice.actions;

export const selectMapCoordPosition = (state: RootState) => state.userStatus.status;

export default userStatusSlice.reducer;
