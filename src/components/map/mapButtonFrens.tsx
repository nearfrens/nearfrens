import React, { Dispatch, useState } from "react";
import { MapModal, MapModalTitle } from "./mapModal";
import { FrensButton } from "../common/buttonRound";
import { Button } from "../common/button";
import { UserStatus } from "../common/userStatus";
import { useUserCollectionStatus } from "../../hooks/useUserCollectionStatus";
import { useMap } from "react-map-gl";
import { ICoordinate } from "./mapInterface";
import { IUserStatus } from "../../interface/user";
import { useAccount, useEnsName, useNetwork } from "wagmi";
import useConversation from "../../hooks/useConversation";
import { HorizontalLine } from "../common/horizontalLine";
import truncateEthAddress from "truncate-eth-address";
import { UserNftImage } from "../common/userNft";
import { FlagIcon } from "@heroicons/react/24/outline";


export const Frens = (props: { onClick: () => void, openMessageWith: Dispatch<IUserStatus> } ) => {

    const [ showMe ] = useState<boolean>(false);
    const { current: map } = useMap();
    const { userCollectionStatus, resetUserCollectionStatus, fetchUserCollectionStatus } = useUserCollectionStatus();

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
                    {/* <Button text={ "Show me" } onClick={ () => setShowMe(!showMe)}/> */}
                    {/* <Button text={ "Open Message" } onClick={ props.openMessage }/> */}
                </div>
            </div>
            
            <div className="h-72 w-full flex flex-col items-strech justify-start gap-2 overflow-y-auto">
                { userCollectionStatus.map((status, key) => (
                    (status.isMe && !showMe ) ? null :
                    <UserStatus 
                        key={ key } userStatus={ status } 
                        onClickFlyTo={ () => onClickUserStatus(status) }
                        onClickMessage={ () => props.openMessageWith(status) }
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


export interface IMessage {
    content: string;
    timestamp: string;
    senderAddress: string;
    recipientAddress: string;
    isUserSender: boolean;
}

const Message = (props: IMessage) => {
    return (
        <div className={`            
            w-full
            flex
            ${ ( props.isUserSender ) ? "justify-end" : "justify-start" }             
            `}
        >
            <div className={`            
                px-4 py-2
                flex flex-col 
                ${ ( props.isUserSender ) ? "justify-end" : "justify-start" } 
                ${ ( props.isUserSender ) ? "items-end" : "items-start" }
                gap-1
                ${ ( props.isUserSender ) ? "bg-stone-800" : "bg-stone-600" }
                rounded-lg
                `}
            >
                <div className={`${( props.isUserSender ) ? "text-right" : "text-left" } text-white text-sm py-1`}>
                    { props.content }
                </div>
                
                <div className={`${( props.isUserSender ) ? "text-right" : "text-right" } text-stone-400 text-xs`}>
                    { props.timestamp }
                </div>              

            </div>
        </div>        
    );
}

export const MessageFrensInput = (props: {sendMessage: Dispatch<string>}) => {
    const [message, setMessage] = useState<string>("");

    function handleKeyDown (event: React.KeyboardEvent<HTMLInputElement>) {
        if (event.key === "Enter") {
            props.sendMessage(message);
            setMessage("");
        }
    }

    return (
        <div className="w-full py-1 px-2 border border-stone-200 rounded-lg bg-stone-600">
            <input
                className="         
                    w-full
                    bg-transparent
                    border-transparent
                    text-white hover:text-white focus:text-white
                    placeholder-text-stone-200
                    outline-0
                    text-sm
                    text-left
                    "
                placeholder="Enter message"
                value={ message }
                onChange={ (event) => setMessage(event.target.value) }
                onKeyDown={ (event) => handleKeyDown(event) }             
            />
        </div>
    )
}

export const MessageFrensList = (props: {peerAddress: string}) => {

    const { address } = useAccount();
    const { loading, messages, error } = useConversation(props.peerAddress);

    if (error) {
        return (
            <div className="h-72 flex justify-center items-center">
                Your Fren has no XMTP account yet!
            </div>
        );
    }

    if (loading) {
        return (
            <div className="h-72 flex justify-center items-center">
                Wait a bit OG
            </div>
        )
    }

    return (
        <div className="h-72 flex flex-col-reverse justify-start items-start gap-4 overflow-y-auto">
            { messages.slice(0).reverse().map((item, key) => (
                <Message 
                    key={ key }
                    content={ item.content }
                    senderAddress={ item.senderAddress?.toString()! } 
                    recipientAddress={ item.recipientAddress?.toString()! }
                    timestamp={ item.sent?.toLocaleTimeString()! }
                    isUserSender={ address === item.senderAddress?.toString()! }
                />)
            )}
        </div>        
    )
}


export const MessageFrens = (props: { peerUserStatus: IUserStatus, onClick: () => void, closeMessage: () => void } ) => {
    
    const { sendMessage } = useConversation(props.peerUserStatus.address!);
    const { chains } = useNetwork();  
    const ensName = useEnsName({ address: props.peerUserStatus.address!, cacheTime: 10_000, chainId: chains[0].id });
    const title = (ensName.data) ? ensName.data : truncateEthAddress(props.peerUserStatus.address!.toString()) ;

    return (
        <div className="w-full px-6 py-2 flex flex-col justify-start gap-2">            
            
            <div className="flex flex-row justify-start items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                    <UserNftImage image={ props.peerUserStatus.nfts[0].imageUrl! }/>
                </div>
                <div className="flex flex-col justify-between items-start gap-1">
                    <div className="text-normal">
                        { title }
                    </div>
                    <div className="flex flex-row items-center justify-start gap-2">
                        <div>
                            <FlagIcon className="w-4 h-4"/>
                        </div>
                        <div className="text-xs text-stone-200">
                            { props.peerUserStatus.status }
                        </div>
                    </div>
                </div>
            </div>

            <HorizontalLine/>

            <MessageFrensList peerAddress={ props.peerUserStatus.address! }/>

            <div className="w-full my-2">
                <HorizontalLine/>
            </div>

            <MessageFrensInput sendMessage={ sendMessage }/>
                     
            <div className="mt-4 mb-4 flex justify-center gap-2">
                <Button text={ "Come back" } onClick={ props.closeMessage }/>
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
                tooltip={ "Discor near frens and fly to their position" }
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
