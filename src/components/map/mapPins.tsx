import { useState, Dispatch } from 'react';
import { PublicIconForNearFrens } from '../icons/publicIcon';
import { useUserStatus } from '../../hooks/useUserStatus';
import { UserStatus } from '../common/userStatus';
import { IUserStatus } from '../../interface/user';
import { Marker, Popup } from 'react-map-gl';
import { useMapCoordPosition } from '../../hooks/mapCoordPosition';
import { EthereumIcon, OptimismIcon, PolygonIcon } from '../icons/blockchainIcon';
import { useNetwork } from 'wagmi';


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
    return (
        <Marker
            longitude={ props.status.longitude} 
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
            <PublicIconForNearFrens/>
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
            anchor="bottom"
            className="bg-transparent"
        >
            <div className="bg-stone-800 rounded-lg">
                <UserStatus userStatus={ props.status } />
            </div>
        </Popup>
    )
}

export const UserPin = () => {
    const [ mapCoordPosition, setMapCoordPosition ] = useMapCoordPosition();
    const { chain } = useNetwork();
    let icon;
    if (chain?.name === "Goerli") {
        icon = <EthereumIcon/>;
    } else if (chain?.name === "Ethereum") {
        icon = <EthereumIcon/>;
    } else if (chain?.name === "Polygon") {
        icon = <PolygonIcon/>;
    } else if (chain?.name === "Polygon Mumbai") {
        icon = <PolygonIcon/>;        
    } else if (chain?.name === "Optimism") {
        icon = <OptimismIcon />;        
    } else if (chain?.name === "Optimism Goerli") {
        icon = <OptimismIcon />;
    } else {
        icon = <div className="bg-red-500 w-6 h-6 rounded-full"></div>;
    }
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
                        { icon }
                    </div>
                </Marker>
            }
        </div>
    )
}

export const MapPins = () => {
    const [indexPopup, setIndexPopup] = useState<number|null>(null);
    const [userStatus] = useUserStatus();
    return (
        <div>
            <div>
                {
                    userStatus.map(
                        (status, key) => {
                            return (
                                <MapMarker 
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
                    indexPopup !== null && userStatus.length > 0 &&
                    <MapPopup
                        status={ userStatus[indexPopup] }
                        closePopup={ () => setIndexPopup(null) }
                    />
                }
            </div>
        </div>
    )
}
