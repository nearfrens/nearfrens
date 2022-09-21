import { IUserNft } from '../interface/user';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

export interface UserNftsState {
    mapping: Record<string, IUserNft>;
}

export const initialState: UserNftsState = {
    mapping: {},
}

export const userNftsSlice = createSlice({
    name: "userNfts",
    initialState,
    reducers: {
        append: (state, action: PayloadAction<IUserNft>) => {
            let key = `${action.payload.contractAddress}_${action.payload.tokenId}`;
            return { mapping: { ...state.mapping, [key]: action.payload} };
        },
        reset: (state) => {
            return initialState;
        },
        switchActivity: (state, action: PayloadAction<IUserNft>) => {
            let key = `${action.payload.contractAddress}_${action.payload.tokenId}`;            
            state.mapping[key].active = !state.mapping[key].active;
        }
    },
});

export const { append, reset, switchActivity } = userNftsSlice.actions;

export const selectUserListOfNft = (state: RootState) => Object.values(state.userNfts.mapping);

export default userNftsSlice.reducer;
