import React from "react";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { set } from "../features/mapCoordPositionSlice";
import { Coordinate } from "../interface/map";


export interface QueryMapCoordPosition {
    mapCoordPosition: Coordinate|null;
    setMapCoordPosition: React.Dispatch<Coordinate|null>;
}

export const useMapCoordPosition = (): QueryMapCoordPosition => {
    const mapCoordPosition: Coordinate|null = useAppSelector((state) => state.mapCoordPosition.coordinate);
    const dispatch = useAppDispatch();
    const setMapCoordPosition = (coordinate: Coordinate|null) => dispatch(set(coordinate));
    return { mapCoordPosition, setMapCoordPosition };
}
