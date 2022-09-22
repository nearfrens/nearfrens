import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import { IUserStatus } from "../interface/user";


export interface UserCollectionStatusState {
    mapping: Record<string, IUserStatus>;
}

export const initialState: UserCollectionStatusState = {
    mapping: {},
}

export const UserCollectionStatusSlice = createSlice({
    name: "userCollectionStatus",
    initialState,
    reducers: {
        append: (state, action: PayloadAction<IUserStatus>) => {            
            let key = `${action.payload.address}_${action.payload.timestamp}`;            
            return { mapping: { ...state.mapping, [key]: action.payload} };
        },
        reset: (state) => {
            return initialState;
        },
        incrementDisplayNft: (state, action: PayloadAction<IUserStatus>) => {            
            let key = `${action.payload.address}_${action.payload.timestamp}`;  
            if (state.mapping[key].nfts) {
                state.mapping[key].displayNft = (state.mapping[key].displayNft + 1) % state.mapping[key].nfts.length;
            }
        }
    },
});

export const { append, reset, incrementDisplayNft } = UserCollectionStatusSlice.actions;

export const selectUserCollectionStatusSlice = (state: RootState) => Object.values(state.userCollectionStatus.mapping);

export default UserCollectionStatusSlice.reducer;
