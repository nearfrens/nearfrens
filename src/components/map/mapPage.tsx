import { useNavigate } from "react-router-dom";
import { PublicIconForNearFrensWithText } from '../icons/publicIcon';
import { useMapCoordWindow } from "../../hooks/useMapCoordWindow";
import { useMapCoordPosition } from '../../hooks/useMapCoordPosition';
import { useMapStyle } from "../../hooks/useMapStyle";
import { useMapZoom } from "../../hooks/useMapZoom";
import { MapWalletConnect } from './mapWalletConnect';
import { MapButtonParameters } from './mapButtonParameters';
import { MapButtonSharePosition } from './mapButtonSharePosition';
import { MapButtonProfil } from "./mapButtonProfil";
import { MapPins, UserPin } from './mapPins';
import mapboxgl, { MapLayerMouseEvent } from "mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import 'mapbox-gl/dist/mapbox-gl.css';
import Map, { ViewStateChangeEvent } from 'react-map-gl';
import { useAccount, useNetwork } from "wagmi";
import { useEffect } from "react";
import { useUserStatus } from "../../hooks/useUserStatus";
import { useParamsStyle } from "../../hooks/useParamsStyle";
import { useUserListOfNft } from "../../hooks/useUserListOfNft";
import { MapButtonPositions } from "./mapButtonPositions";
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN!;


export const MapPage = () =>  {

    const navigate = useNavigate();
    const { isConnected } = useAccount();
    const { chain } = useNetwork();
      
    const [ paramsStyle ] = useParamsStyle();
    const [ mapCoordWindow, setMapCoordWindow ] = useMapCoordWindow();
    const [ , setMapCoordPosition ] = useMapCoordPosition();
    const [ mapStyle ] = useMapStyle();
    const [ mapZoom, setMapZoom ] = useMapZoom();
    const [ userStatus,,resetUserStatus, fetchUserStatus ] = useUserStatus();

    const { address } = useAccount();
    const [ userListOfNFt, fetchUserListOfNft] = useUserListOfNft(address!);

    function onMapMove (event: ViewStateChangeEvent) {
        const coord = event.target.getCenter();
        setMapCoordWindow({ longitude: coord.lng, latitude: coord.lat});
        setMapZoom(event.target.getZoom());
    }

    function onContextMenu (event: MapLayerMouseEvent) {
        if (!event.lngLat) return;
        const { lng, lat } = event.lngLat;
        setMapCoordPosition({longitude: lng, latitude: lat});
    }

    useEffect(() => {
        if (!isConnected) {
            resetUserStatus();
        }
    })

    useEffect(() => {
        if (isConnected) {
            fetchUserListOfNft();
        }
    }, [ chain ])

    useEffect(() => {
        if (isConnected) {
            fetchUserStatus();
        } else {
            resetUserStatus();
        }
    }, [ isConnected, userListOfNFt ]);

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
                        <div className={`
                            h-9
                            px-3
                            flex items-center
                            rounded-lg
                            ${ 
                                (paramsStyle.isFun) ?
                                    "bg-gradient-to-r from-pink-600/50 to-blue-600/50 hover:from-pink-600/60 hover:to-blue-600/60"
                                    :
                                    "bg-stone-800 bg-opacity-50 hover:bg-opacity-60"
                            }
                        `}
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
                            <MapButtonSharePosition />
                            <MapButtonProfil/>
                            <MapButtonParameters />
                        </div>
                    </div>                    

                </Map>

            </main>
        </div>
    );
}
