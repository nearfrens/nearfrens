import React from "react";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { set } from "./../features/mapCoordWindow/mapCoordWindowSlice";
import { Coordinate } from "./../interface/map";


export const useMapCoordWindow = (): [Coordinate, React.Dispatch<Coordinate>] => {
    const state: Coordinate = useAppSelector((state) => state.mapCoordWindow.coordinate);
    const dispatch = useAppDispatch();
    const setState = (coordinate: Coordinate) => dispatch(set(coordinate));
    return [state, setState];
}
