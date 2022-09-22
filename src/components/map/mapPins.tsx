import { Dispatch, useState } from "react";
import { Marker, MarkerDragEvent } from "react-map-gl";
import { useMapCoordPosition } from "../../hooks/useMapCoordPosition";
import { useUserCollectionStatus } from "../../hooks/useUserCollectionStatus";
import { MapMarker } from "./mapMarker";
import { MapPopup } from "./mapPopup";
import "./mapbox.css";


export const UserPin = (props: { onDrag: Dispatch<MarkerDragEvent> }) => {
    const { mapCoordPosition, setMapCoordPosition } = useMapCoordPosition();
    return (
        <div>
            {
                mapCoordPosition !== null &&
                <Marker
                    longitude={ mapCoordPosition?.longitude } 
                    latitude={ mapCoordPosition?.latitude } 
                    anchor="center"
                    style={{
                        "backgroundColor": "transparent", 
                        "borderWidth": "0px", 
                        "borderStyle": "solid",
                        "borderColor": "transparent",
                        "display": "flex",
                        "justifyContent": "center",
                        "alignItems": "center",
                    }}
                    draggable={ true }
                    onClick={ () => setMapCoordPosition(null) }
                    onDrag={ props.onDrag }
                >
                    <div className="w-6 h-6 border border-blue-400 rounded-full border-[5px] bg-white"/>                    
                </Marker>
            }
        </div>
    )
}

export const MapPins = () => {
    const { userCollectionStatus } = useUserCollectionStatus();
    const [indexPopup, setIndexPopup] = useState<number|null>(null);
    return (
        <div>
            <div>
                {
                    userCollectionStatus.map(
                        (status, key) => {
                            return (
                                <MapMarker
                                    key={ key }
                                    index={ key } 
                                    status={ status } 
                                    openPopup= { (index) => setIndexPopup(index) }
                                />
                            );
                        }
                    )
                }
            </div>
            <div>
                {                
                    indexPopup !== null && userCollectionStatus.length > 0 &&
                    <MapPopup
                        status={ userCollectionStatus[indexPopup] }
                        closePopup={ () => setIndexPopup(null) }
                    />
                }
            </div>
        </div>
    );
}
