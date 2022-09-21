import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux"; 
import { persistReducer } from "redux-persist";

import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";

import mapCoordWindowReducer from '../features/mapCoordWindowSlice';
import mapCoordPositionReducer from "../features/mapCoordPositionSlice";
import mapStyleReducer from "../features/mapStyleSlice";
import mapYourPositionsReducer from "../features/mapYourPositionsSlice";
import mapZoomReducer from "../features/mapZoomSlice";
import paramsStyleReducer from "../features/paramsStyleSlice";
import userStatusReducer from "../features/userStatusSlice";
import userNftsReducer from "../features/userNftsSlice";
import userCollectionStatusReducer from "../features/userCollectionStatus";


const reducers = combineReducers({
    mapCoordWindow: mapCoordWindowReducer,
    mapCoordPosition: mapCoordPositionReducer,
    mapStyle: mapStyleReducer,
    mapYourPositions: mapYourPositionsReducer,
    mapZoom: mapZoomReducer,
    paramsStyle: paramsStyleReducer,
    userNfts: userNftsReducer,
    userStatus: userStatusReducer,
    userCollectionStatus: userCollectionStatusReducer,
});

const persistConfig = {
    key: "root",
    storage: storage,
    transforms: [ ],
    blacklist: [
        "userCollectionStatus",
        "userNfts",
        "userStatus",
    ]
};

const persistedReducer = persistReducer(
    persistConfig, 
    reducers,
);

export const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== "production",
    middleware: [thunk]
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
