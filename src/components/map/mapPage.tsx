import { useRef, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { MapButtonWallet } from './mapButtonWallet';
import { MapButtonMenu } from "./mapButtonMenu";
import { MapButtonZoomInOut } from './mapButtonZoomInOut';
import { PublicIconForNearFrensWithText } from '../icons/publicIcon';
import { OptionMapStyles, MapButtonMapStyleChoice } from './mapButtonMapStyleChoice';
import { Coordinate } from './mapInterface';
import { MapDisplayTable } from './mapDisplayTable';

import mapboxgl from "mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax

import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN!;


export const MapPage = () =>  {

    const navigate = useNavigate();

    const mapContainer = useRef<any>(null);
    const map = useRef<mapboxgl.Map | null>(null);

    const [ userZoom, setUserZoom ] = useState<number>( ( localStorage.getItem("userZoom")) ? Number(localStorage.getItem("userZoom")) : 2.0 );
    const [ userMapStyle, setUserMapStyle ] = useState<string>(OptionMapStyles.STREET);

    const [ mouseCoord, setMouseCoord ] = useState<Coordinate>({lat: 0.0, lng: 0.0});
    const [ currentCoord, setCurrentCoord ] = useState<Coordinate>({lat: 0.0, lng: 0.0});

    useEffect(() => {
        if (map.current) return;
                
        let initCoord: Coordinate = localStorage.getItem("currentCoord") ? JSON.parse(localStorage.getItem("currentCoord")!) : currentCoord ;
        let initZoom: number = localStorage.getItem("userZoom") ? JSON.parse(localStorage.getItem("userZoom")!) : userZoom ;
        let initMapStyle: string = localStorage.getItem("mapStyle") ? JSON.parse(localStorage.getItem("mapStyle")!) : userMapStyle ;
         
        setCurrentCoord({ lat: initCoord.lat, lng: initCoord.lng });
        setUserZoom(initZoom);
        setUserMapStyle(initMapStyle);
        
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: initMapStyle,
            center: [ initCoord.lng, initCoord.lat ],
            zoom: initZoom,
        });

    }, [currentCoord, userZoom, userMapStyle]);

    useEffect(() => {
        if (!map.current) return;
        map.current.setZoom(userZoom);
    }, [ userZoom ]);

    useEffect(() => {
        if (!map.current) return;
        map.current.setStyle(userMapStyle);
    }, [ userMapStyle ])

    useEffect(() => {
        if (!map || !map.current) return;
        map.current.on("move", () => {
            setCurrentCoord({ lat: map?.current?.getCenter().lat!, lng: map?.current?.getCenter().lng! })
            setUserZoom(map?.current?.getZoom()!);
        });
        localStorage.setItem("currentCoord", JSON.stringify(currentCoord));
        localStorage.setItem("userZoom", JSON.stringify(userZoom));
    });

    useEffect(() => {
        if (!map || !map.current) return;
        map.current.on("click", (event: mapboxgl.MapMouseEvent ) => {
            setMouseCoord({ lat: event.lngLat.lat, lng: event.lngLat.lng });
        });
        console.log("single click")
    }, [ mouseCoord ]);

    useEffect(() => {
        if (!map || !map.current) return;
        map.current.on("contextmenu", (event: mapboxgl.MapMouseEvent ) => {        
            const element = document.createElement("div");
            element.className = "h-5 w-5 bg-stone-800 cursor-pointer";
            new mapboxgl.Marker(element).setLngLat(event.lngLat).addTo(map.current!);
        });
    })

    const handleZoomIncrement = () => { setUserZoom(userZoom + 1.0)};
    const handleZoomDecrement = () => { setUserZoom(userZoom - 1.0)};
    const handleMapStyleChange = (newMapStyle: string) => { 
        setUserMapStyle(newMapStyle);
        localStorage.setItem("mapStyle", JSON.stringify(newMapStyle));
    };

    return (
        <div className="">
            <main className="relative w-screen h-screen">
                
                <div
                    className="absolute w-screen h-screen"
                    ref={ mapContainer }
                />

                <div className="absolute top-5 left-10 bg-stone-800 rounded-lg pl-2 py-2 pr-5" onClick={() => navigate("/about")}>
                    <PublicIconForNearFrensWithText />
                </div>

                <div className="absolute bottom-10 left-10">
                    <div className="flex flex-col justify-start items-stretch gap-2">
                        <MapDisplayTable params={ {"mapCoord": currentCoord, "mouseCoord": mouseCoord, "mapZoom": userZoom} }/>
                        <MapButtonMapStyleChoice onClick={ handleMapStyleChange }/>
                    </div>
                </div>

                <div className="flex flex-row items-center justify-start absolute top-5 right-5 gap-2">
                    <MapButtonWallet />
                    <MapButtonMenu />
                </div>

                <div className="absolute bottom-10 right-5">
                    <MapButtonZoomInOut 
                        onClickZoomIn={ handleZoomIncrement  }
                        onClickZoomOut={ handleZoomDecrement } 
                    />
                </div>

            </main>
        </div>
    );

}
