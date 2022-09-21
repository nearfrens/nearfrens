import React from "react";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { set } from "../features/mapCoordWindowSlice";
import { Coordinate } from "../interface/map";


export interface QueryMapCoordWindow {
    mapCoordWindow: Coordinate;
    setMapCoordWindow: React.Dispatch<Coordinate>;
}

export const useMapCoordWindow = (): QueryMapCoordWindow => {
    const mapCoordWindow: Coordinate = useAppSelector((state) => state.mapCoordWindow.coordinate);
    const dispatch = useAppDispatch();
    const setMapCoordWindow = (coordinate: Coordinate) => dispatch(set(coordinate));
    return { mapCoordWindow, setMapCoordWindow };
}
