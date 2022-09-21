import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import { IUserStatus } from "../interface/user";


export interface UserListOfCollectionStatusState {
    status: Array<IUserStatus>;
}

export const initialState: UserListOfCollectionStatusState = {
    status: [],
}

export const UserListOfCollectionStatusSlice = createSlice({
    name: "UserListOfCollectionStatus",
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

export const { append, reset } = UserListOfCollectionStatusSlice.actions;

export const selectUserListOfCollectionStatus = (state: RootState) => state.userListOfCollectionStatus.status;

export default UserListOfCollectionStatusSlice.reducer;
