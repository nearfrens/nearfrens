import React from "react";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { set, decrement, increment } from "../features/mapZoomSlice";


export interface QueryMapZoom {
    mapZoom: number;
    setMapZoom: React.Dispatch<number>;
    incrementMapZoom: () => void;
    decrementMapZoom: () => void;
}

export const useMapZoom = (): QueryMapZoom => {
    const mapZoom: number = useAppSelector((state) => state.mapZoom.value);
    const dispatch = useAppDispatch();
    const setMapZoom = (value: number) => dispatch(set(value));
    const incrementMapZoom = () => dispatch(increment());
    const decrementMapZoom = () => dispatch(decrement());
    return {mapZoom, setMapZoom, incrementMapZoom, decrementMapZoom};
}
