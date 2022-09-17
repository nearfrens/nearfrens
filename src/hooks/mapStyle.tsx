import React from "react";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { set } from "../features/mapStyle/mapStyleSlice";
import { MapStyle } from "../interface/map";


export const useMapStyle = (): [MapStyle, React.Dispatch<MapStyle>] => {
    const state: MapStyle = useAppSelector((state) => state.mapStyle.mapStyle);
    const dispatch = useAppDispatch();
    const setState = (newMapStyle: MapStyle) => dispatch(set(newMapStyle));
    return [state, setState];
}
