import { useNavigate } from "react-router-dom";
import { PublicIconForNearFrensWithText } from '../icons/publicIcon';
import { useMapCoordWindow } from "../../hooks/mapCoordWindow";
import { useMapCoordPosition } from '../../hooks/mapCoordPosition';
import { useMapStyle } from "../../hooks/mapStyle";
import { useMapZoom } from "../../hooks/mapZoom";
import { MapWalletConnect } from './mapWalletConnect';
import { LoadPositions, MapButtonPositions } from './mapButtonPositions';
import { MapButtonParameters } from './mapButtonParameters';
import { MapButtonSharePosition } from './mapButtonSharePosition';
import { MapPins, UserPin } from './mapPins';
import mapboxgl, { MapLayerMouseEvent } from "mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import 'mapbox-gl/dist/mapbox-gl.css';
import Map, { ViewStateChangeEvent } from 'react-map-gl';
import { useAccount } from "wagmi";
import { useEffect } from "react";
import { useUserStatus } from "../../hooks/useUserStatus";
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN!;


export const MapPage = () =>  {

    const navigate = useNavigate();
    const { isConnected } = useAccount();
      
    const [ mapCoordWindow, setMapCoordWindow ] = useMapCoordWindow();
    const [ , setMapCoordPosition ] = useMapCoordPosition();
    const [ mapStyle ] = useMapStyle();
    const [ mapZoom, setMapZoom ] = useMapZoom();
    const [ ,,resetUserStatus ] = useUserStatus();
    
    function onMapMove (event: ViewStateChangeEvent) {
        const coord = event.target.getCenter();
        setMapCoordWindow({ longitude: coord.lng, latitude: coord.lat});
        setMapZoom(event.target.getZoom());
    }

    function onContextMenu (event: MapLayerMouseEvent) {
        const { lng, lat } = event.lngLat;
        setMapCoordPosition({longitude: lng, latitude: lat});
    }

    LoadPositions();

    useEffect(() => {
        if (!isConnected) {
            resetUserStatus();
        }
    })

    return (
        <div className="">
            <main className="relative w-screen h-screen">
                
                <Map
                    initialViewState={{
                        longitude: mapCoordWindow.longitude,
                        latitude: mapCoordWindow.latitude,
                        zoom: mapZoom,
                    }}
                    style={{ width: "100vw", height: "100vh" }}
                    mapStyle={ mapStyle.style } 
                    mapboxAccessToken={ process.env.REACT_APP_MAPBOX_TOKEN! }
                    onMove={ onMapMove }
                    onContextMenu={ onContextMenu }
                >
                    
                    <div>
                        <MapPins/>
                        <UserPin/>
                    </div>

                    <div className="absolute inset-x-0 top-0 flex flex-row px-10 pt-7 justify-between">
                        <div className="
                            h-9
                            px-3
                            flex items-center
                            rounded-lg
                            bg-stone-800 bg-opacity-40 hover:bg-opacity-50
                            " 
                            onClick={() => navigate("/about")}
                        >
                            <PublicIconForNearFrensWithText />
                        </div>
                        <div className="flex flex-row items-center justify-start gap-2">
                            <MapWalletConnect/>
                        </div>
                    </div>

                    <div className="absolute flex justify-center bottom-12 inset-x-0 px-10">                
                        <div className="flex flex-row justify-center items-center gap-4">
                            <MapButtonPositions/>
                            <MapButtonSharePosition/>
                            <MapButtonParameters/>
                        </div>           
                    </div>                        

                </Map>

            </main>
        </div>
    );
}
