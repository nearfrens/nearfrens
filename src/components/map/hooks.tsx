import React, { useState } from "react";
import { OptionMapStyles, ICoordinate, IMapStyle, IZoom } from "./mapInterface"


function getInitialHookValue(field: string, initVariable: ICoordinate|IMapStyle|IZoom ) {
    let storageVariable: string|null = localStorage.getItem(field);
    if (!storageVariable) {
        return initVariable;
    } else {
        return JSON.parse(storageVariable);
    }
}

export const useMapStyle = (): [ IMapStyle, React.Dispatch<IMapStyle> ] => {
    let initMapStyle: IMapStyle = getInitialHookValue("mapStyle", { mapStyle: OptionMapStyles.STREET });
    const [ mapStyle, setMapStyle ] = useState<IMapStyle>(initMapStyle);
    const saveMapStyle = (mapStyle: IMapStyle) => localStorage.setItem("mapStyle", JSON.stringify(mapStyle));
    const updateMapStyle = (mapStyle: IMapStyle) => {
        setMapStyle(mapStyle);
        saveMapStyle(mapStyle);
    }
    return [mapStyle, updateMapStyle];
}

export function useMapCoord(): [ ICoordinate, React.Dispatch<ICoordinate> ] {
    let initMapCoord: ICoordinate = getInitialHookValue("mapCoord", { longitude: 0.0, latitude: 0.0 });
    const [ mapCoord, setMapCoord ] = useState<ICoordinate>(initMapCoord);    
    const saveMapCoord = (coord: ICoordinate) => localStorage.setItem("mapCoord", JSON.stringify(coord));
    const updateMapCoord = (coord: ICoordinate) => {
        setMapCoord(coord)
        saveMapCoord(coord);
    }
    return [mapCoord, updateMapCoord];
}

export const useMapZoom = (): [ IZoom, React.Dispatch<IZoom> ]  => {
    let initMapZoom: IZoom = getInitialHookValue("mapZoom", { zoom: 2.0 });
    const [ mapZoom, setMapZoom ] = useState<IZoom>(initMapZoom);
    const saveMapZoom = (zoom: IZoom) => localStorage.setItem("mapZoom", JSON.stringify(zoom));
    const updateZoom = (zoom: IZoom) => {
        setMapZoom(zoom);
        saveMapZoom(zoom);
    }
    return [mapZoom, updateZoom];
}

export function usePosCoord(): [ ICoordinate, React.Dispatch<ICoordinate>, () => void ] {
    let initPosCoord: ICoordinate = getInitialHookValue("posCoord", { longitude: 0.0, latitude: 0.0 });
    const [ posCoord, setPosCoord ] = useState<ICoordinate>(initPosCoord);    
    const savePosCoord = () => localStorage.setItem("posCoord", JSON.stringify(posCoord));
    return [posCoord, setPosCoord, savePosCoord];
}
