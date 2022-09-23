import { Dispatch, useState } from "react";
import { MapModal } from "./mapModal";
import { FrensButton } from "../common/buttonRound";
import { Button } from "../common/button";
import { UserStatus } from "../common/userStatus";
import { useUserCollectionStatus } from "../../hooks/useUserCollectionStatus";
import { useMap } from "react-map-gl";
import { ICoordinate } from "./mapInterface";
import { IUserStatus } from "../../interface/user";
import { MessageConversationList } from "../message/messageConversationList";
import { MessageConversationHeader } from "../message/messageConversationHeader";
import { MessageInputView } from "../message/messageInputView";
import useConversation from "../../hooks/useConversation";


export const Frens = (props: { onClick: () => void, openMessageWith: Dispatch<IUserStatus> } ) => {

    const [ showMe ] = useState<boolean>(false);
    const { current: map } = useMap();
    const { userCollectionStatus, resetUserCollectionStatus, fetchUserCollectionStatus } = useUserCollectionStatus();

    let currentStatus: IUserStatus;
    for (let status of userCollectionStatus) {
        if (status.isMe) {
            currentStatus = status;
        }
    }

    function flyTo (coord: ICoordinate) {
        if (!map) return;
        map.flyTo({center: [coord.longitude, coord.latitude], zoom: 12});
    }

    function onClickUserStatus(userStatus: IUserStatus) {
        props.onClick();
        flyTo({longitude: userStatus.longitude, latitude: userStatus.latitude});
    }

    // <div className="flex flex-row justify-between items-center">
    // <MapModalTitle title="Discover friends"/>
    // <div className="w-24 text-xs"> 
    //     {/* <Button text={ "Show me" } onClick={ () => setShowMe(!showMe)}/> */}
    //     {/* <Button text={ "Open Message" } onClick={ props.openMessage }/> */}
    // </div>
    // </div>

    return (
        <div className="w-full flex flex-col justify-start">            

            <MessageConversationHeader status={ currentStatus! }/>
            
            <div className="px-3 py-3 h-72 w-full flex flex-col items-strech justify-start gap-2 overflow-y-auto">
                { userCollectionStatus.map((status, key) => (
                    (status.isMe && !showMe ) ? null :
                    <UserStatus 
                        key={ key } userStatus={ status } 
                        onClickFlyTo={ () => onClickUserStatus(status) }
                        onClickMessage={ () => { props.openMessageWith(status); flyTo({longitude: status.longitude, latitude: status.latitude}) } }
                    />
                )
                )}
            </div>
            
            <div className="px-3 pb-3 py-3 flex justify-center gap-2 bg-stone-700">
                <Button text="Refresh" onClick = { () => {resetUserCollectionStatus(); fetchUserCollectionStatus()} } />
                <Button text="Close" onClick = { props.onClick }/>
            </div>

        </div>
    );
}


export const MessageFrens = (props: { peerUserStatus: IUserStatus, onClick: () => void, closeMessage: () => void } ) => {
    
    const { sendMessage } = useConversation(props.peerUserStatus.address!);

    return (
        <div className="w-full flex flex-col justify-start">   
            
            <MessageConversationHeader status={ props.peerUserStatus }/>

            <MessageConversationList peerAddress={ props.peerUserStatus.address! } />
        
            <MessageInputView sendMessage={ sendMessage }/>
                     
            <div className="px-3 pb-3 py-1 flex justify-center gap-2 bg-stone-700">
                <Button text={ "Come back" } onClick={ props.closeMessage } />
                <Button text="Close" onClick = { props.onClick }/>
            </div>

        </div>
    );
}

export const MapButtonFrens = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [peerUserStatus, setPeerUserStatus] = useState<IUserStatus|null>(null);

    let content;

    if (peerUserStatus) {
        content = <MessageFrens peerUserStatus={ peerUserStatus } onClick={ () => setIsOpen(false) } closeMessage={ () => setPeerUserStatus(null) } />
    } else {
        content = <Frens onClick={ () => setIsOpen(false) } openMessageWith={ setPeerUserStatus } />
    }

    return (
        <div>
            
            <FrensButton
                onClick={ () => setIsOpen(true) }                
                tooltip={ "Discover and chat with near frens" }
            />

            <MapModal
                content={ content }
                isOpen={ isOpen }
                openModal={ () => setIsOpen(true) }
                closeModal={ () => setIsOpen(false) }
            />

        </div>
    )
}
