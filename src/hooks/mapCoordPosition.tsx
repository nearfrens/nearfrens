import React from "react";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { set } from "./../features/mapCoordPosition/mapCoordPositionSlice";
import { Coordinate } from "./../interface/map";


export const useMapCoordPosition = (): [Coordinate|null, React.Dispatch<Coordinate|null>] => {
    const state: Coordinate|null = useAppSelector((state) => state.mapCoordPosition.coordinate);
    const dispatch = useAppDispatch();
    const setState = (coordinate: Coordinate|null) => dispatch(set(coordinate));
    return [state, setState];
}
