import { useState } from "react";
import { MapModal, MapModalTitle } from "./mapModal";
import { FrensButton } from "../common/buttonRound";
import { Button } from "../common/button";
import { UserStatus } from "../common/userStatus";
import { useUserCollectionStatus } from "../../hooks/useUserCollectionStatus";
import { useMap } from "react-map-gl";
import { ICoordinate } from "./mapInterface";
import { IUserStatus } from "../../interface/user";


export const Frens = (props: { onClick: () => void } ) => {

    const [ showMe, setShowMe ] = useState<boolean>(false);
    const { current: map } = useMap();
    const { userCollectionStatus, resetUserCollectionStatus, fetchUserCollectionStatus, incrementUserCollectionStatusNftDisplay  }= useUserCollectionStatus();

    function flyTo (coord: ICoordinate) {
        if (!map) return;
        map.flyTo({center: [coord.longitude, coord.latitude], zoom: 12});
    }

    function onClickUserStatus(userStatus: IUserStatus) {
        props.onClick();
        flyTo({longitude: userStatus.longitude, latitude: userStatus.latitude});
    }
    
    return (
        <div className="w-full px-6 py-2 flex flex-col justify-start">            
            
            <div className="flex flex-row justify-between items-center">
                <MapModalTitle title="Discover friends"/>
                <div className="w-24 text-xs"> 
                    <Button text={ "Show me" } onClick={ () => setShowMe(!showMe)}/>
                </div>
            </div>
            
            <div className="h-72 w-full flex flex-col items-strech justify-start gap-2 overflow-y-auto">
                { userCollectionStatus.map((status, key) => (
                    (status.isMe && !showMe ) ? null :
                    <UserStatus
                        key={ key } userStatus={ status } 
                        onClickFlyTo={ () => onClickUserStatus(status) } 
                        onClickImage={ () => { incrementUserCollectionStatusNftDisplay(status) }}
                    />
                )
                )}
            </div>
            
            <div className="mt-4 mb-4 flex justify-center gap-2">
                <Button text="Refresh" onClick = { () => {resetUserCollectionStatus(); fetchUserCollectionStatus()} } />
                <Button text="Close" onClick = { props.onClick }/>
            </div>

        </div>
    );
}


export const MapButtonFrens = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div>
            
            <FrensButton
                onClick={ () => setIsOpen(true) }
                tooltip={ "Discor near frens and fly to their position" }
            />

            <MapModal
                content={ <Frens onClick={ () => setIsOpen(false) } /> }
                isOpen={ isOpen }
                openModal={ () => setIsOpen(true) }
                closeModal={ () => setIsOpen(false) }
            />

        </div>
    )
}
