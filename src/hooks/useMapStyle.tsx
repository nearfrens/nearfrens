import React from "react";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { set } from "../features/mapStyleSlice";
import { MapStyle } from "../interface/map";


export interface QueryUseMapStyle {
    mapStyle: MapStyle,
    setMapStyle: React.Dispatch<MapStyle>
}

export const useMapStyle = (): QueryUseMapStyle => {
    const mapStyle: MapStyle = useAppSelector((state) => state.mapStyle.mapStyle);
    const dispatch = useAppDispatch();
    const setMapStyle = (newMapStyle: MapStyle) => dispatch(set(newMapStyle));
    return { mapStyle, setMapStyle };
}
