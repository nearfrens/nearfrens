import { useState, Dispatch } from 'react';
import { UserStatus } from '../common/userStatus';
import { IUserStatus } from '../../interface/user';
import { Marker, Popup } from 'react-map-gl';
import { useMapCoordPosition } from '../../hooks/useMapCoordPosition';
import { CurrentChainIcon } from '../icons/blockchainIcon';
import { ReactComponent as NearFrensSvg } from "../icons/svg/nearfrens.svg";
import { useUserCollectionStatus } from '../../hooks/useUserCollectionStatus';
import { UserNftSmall } from '../common/userNft';
import './mapbox.css';


interface IMapMarker {
    index: number;
    status: IUserStatus;
    openPopup: Dispatch<number>;
}

interface IMapPopup {
    status: IUserStatus;
    closePopup: () => void;
}

export const MapMarker = (props: IMapMarker) => {
    
    let color: string;
    if (props.status.weight !== undefined) {
        color = "border-blue-" + (props.status.weight!).toString() ;
    } else {
        color = "border-stone-200";
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
            <div className={`border border-0 ${color} flex justify-center items-center rounded-full`}>
                {
                    <NearFrensSvg className="h-6 w-6 text-stone-200 hover:text-white" />
                }
            </div>
        </Marker>
    );
}

export const MapPopup = (props: IMapPopup) => {
    return (
        <Popup
            longitude={ props.status.longitude }
            latitude={ props.status.latitude }
            onClose={ props.closePopup }
            closeButton={ true }
            closeOnClick={ false }
            anchor="top"
            className="max-w-64 bg-black"
            maxWidth="none"
            style={{
                "background": "none",
                "backgroundColor": "none",
            }}
        >
            <div className="w-64">
                {
                    ( !props.status.nfts ) ?
                    <UserStatus userStatus={ props.status } /> :
                    <UserNftSmall nft={ props.status.nfts[0] }/>
                }
            </div>
        </Popup>
    )
}

export const UserPin = () => {
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
                    onClick={ () => setMapCoordPosition(null) }
                >
                    <div className="bg-transparent rounded-full w-7 h-7">
                        <CurrentChainIcon />
                    </div>
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
    )
}
