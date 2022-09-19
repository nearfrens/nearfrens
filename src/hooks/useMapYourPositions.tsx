import React from "react";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { append, pop } from "../features/mapYourPositionsSlice";
import { MarkerData } from "../interface/map";

export const useMapYourPositions = (): [Array<MarkerData>, React.Dispatch<MarkerData>, React.Dispatch<MarkerData>] => {
    const state: Array<MarkerData> = useAppSelector((state) => state.mapYourPositions.markers);
    const dispatch = useAppDispatch();
    const appendState = (markerData: MarkerData) => dispatch(append(markerData));
    const popState = (markerData: MarkerData) => dispatch(pop(markerData));
    return [state, appendState, popState];
}
