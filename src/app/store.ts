import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux"; 
import { persistReducer, createTransform } from "redux-persist";

import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";

import mapCoordWindowReducer from './../features/mapCoordWindow/mapCoordWindowSlice';
import mapCoordPositionReducer from "./../features/mapCoordPosition/mapCoordPositionSlice";
import mapStyleReducer from "./../features/mapStyle/mapStyleSlice";
import mapYourPositionsReducer, { MapYourPositionsState } from "./../features/mapYourPositions/mapYourPositionsSlice";
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


   


// import { configureStore } from "@reduxjs/toolkit";
// import mapCoordWindowReducer from './../features/mapCoordWindow/mapCoordWindowSlice';
// import mapCoordPositionReducer from "./../features/mapCoordPosition/mapCoordPositionSlice";
// import mapStyleReducer from "./../features/mapStyle/mapStyleSlice";
// import mapZoomReducer from "./../features/mapZoom/mapZoomSlice";
// export const store = configureStore({
//     reducer: {
//         mapCoordWindow: mapCoordWindowReducer,
//         mapCoordPosition: mapCoordPositionReducer,
//         mapStyle: mapStyleReducer,
//         mapZoom: mapZoomReducer,
//     },
// });
// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;

// const SetTransform: any = createTransform(
//     // transform state on its way to being serialized and persisted.
//     (inboundState: MapYourPositionsState, key): any => {
//         // console.log("Save inboud");
//         // console.log(inboundState);
//         // console.log(inboundState.markers);
//         // let output: any = { markers: inboundState.markers.toArray() }
//         // return output;
//         // console.log("Inbound", inboundState);
//         return inboundState;
//     },
//     // transform state being rehydrated
//     (outboundState: any, key): any => {
//         // console.log("Coucou @")
//         // console.log(outboundState);
//         // convert mySet back to a Set.
//         // let newMapYourPositions: Map<string, MarkerData> = Map({});
//         // let oldMapYourPositions: { [key: string]: any} = outboundState.mapYourPositions;
//         // for (let key in oldMapYourPositions) {
//         //     newMapYourPositions.set(key, oldMapYourPositions[key]);
//         // }
//         // outboundState.mapYourPositions.markers = newMapYourPositions;
//         // let output: MapYourPositionsState = { markers: Map() }
//         // return output;
//         // console.log("Outbound", outboundState);
//         return outboundState;
//     },
//     // define which reducers this transform gets called for.
//     {
//         whitelist: [
//             "mapYourPositions",
//         ]
//     }
// );