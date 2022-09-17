import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux"; 
import { persistReducer } from "redux-persist";

import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";

import mapCoordWindowReducer from './../features/mapCoordWindow/mapCoordWindowSlice';
import mapCoordPositionReducer from "./../features/mapCoordPosition/mapCoordPositionSlice";
import mapStyleReducer from "./../features/mapStyle/mapStyleSlice";
import mapYourPositionsReducer from "./../features/mapYourPositions/mapYourPositionsSlice";
import mapZoomReducer from "./../features/mapZoom/mapZoomSlice";
import userStatusReducer from "./../features/userStatus/userStatusSlice";

const reducers = combineReducers({
    mapCoordWindow: mapCoordWindowReducer,
    mapCoordPosition: mapCoordPositionReducer,
    mapStyle: mapStyleReducer,
    mapYourPositions: mapYourPositionsReducer,
    mapZoom: mapZoomReducer,
    userStatus: userStatusReducer,
});

const persistConfig = {
    key: "root",
    storage: storage,
    transforms: [ ],
    blacklist: [
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
