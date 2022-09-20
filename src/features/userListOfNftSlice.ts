import { IUserNft } from '../interface/user';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

export interface UserListOfNftState {
    nfts: Array<IUserNft>;
}

export const initialState: UserListOfNftState = {
    nfts: [],
}

export const userListOfNftSlice = createSlice({
    name: "userListOfNft",
    initialState,
    reducers: {
        append: (state, action: PayloadAction<IUserNft>) => {
            return { nfts: [ ...state.nfts, action.payload ] };
        },
        reset: (state) => {
            return initialState;
        },
        switchActivity: (state, action: PayloadAction<number>) => {
            state.nfts[action.payload].active = !state.nfts[action.payload].active;
        }
    },
});

export const { append, reset, switchActivity } = userListOfNftSlice.actions;

export const selectUserListOfNft = (state: RootState) => state.userListOfNft.nfts;

export default userListOfNftSlice.reducer;
