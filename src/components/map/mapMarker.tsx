import { Dispatch } from 'react';
import { IUserStatus } from '../../interface/user';
import { Marker } from "react-map-gl";
import { ReactComponent as NearFrensSvg } from "../icons/svg/nearfrens.svg";
import "./mapbox.css";


interface IMapMarker {
    index: number;
    status: IUserStatus;
    openPopup: Dispatch<number>;
}

export const MapMarker = (props: IMapMarker) => {
    
    let logoColor: string;
    let borderColor: string;
    if (props.status.isMe ) {
        logoColor = "text-blue-400";
        borderColor = "border-blue-400";
    } else {
        logoColor = "text-purple-400";
        borderColor = "border-purple-400";
    }

    return (
        <Marker
            key={props.index}
            longitude={ props.status.longitude } 
            latitude={ props.status.latitude } 
            anchor="bottom"            
            style={{
                "backgroundColor": "transparent",
                "borderWidth": "0px", 
                "borderStyle": "solid",
                "borderColor": "transparent",
                "display": "flex",
                "justifyContent": "center",
                "alignItems": "center",
            }}
            onClick={() => props.openPopup(props.index)}
        >
            <div className={`border border-2 ${ borderColor } flex justify-center items-center rounded-full`}>
                {
                    <NearFrensSvg className={`h-6 w-6 ${ logoColor } hover:text-white`} />
                }
            </div>
        </Marker>
    );
}
