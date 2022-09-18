import { useState } from "react"
import { MapModal, MapModalTitle } from "./mapModal";
import { BookmarkButton } from "./mapButtonRound";
import { Button } from "../common/button";
import { useAccount, useContractRead } from "wagmi";
import { convertLngInt32ToFloat, convertLatInt32ToFloat } from "./mapFunction";
import { IUserStatus } from "../../interface/user";
import { UserStatus } from "../common/userStatus";
import contractAbi from "./../../contract/abi.json";
import { useUserStatus } from "../../hooks/useUserStatus";

const contractAddress:string = process.env.REACT_APP_CONTRACT_ON_GOERLI!;

export function LoadPositions () {
    const [ ,appendUserStatus, resetUserStatus ] = useUserStatus();
    const { address } = useAccount();
    useContractRead({
        addressOrName: contractAddress,
        contractInterface: contractAbi,
        functionName: "getListOfUserPositions",
        args: [ address ],
        cacheOnBlock: true,
        onSuccess(data) {
            resetUserStatus();
            if (address) {
                for (let item of data.slice().reverse()) {
                    let userStatus: IUserStatus = {
                        address: address?.toString(),
                        longitude: convertLngInt32ToFloat(Number(item.latitude)), // ToDo: change
                        latitude: convertLatInt32ToFloat(Number(item.longitude)), // ToDo: change
                        timestamp: item.timestamp.toString(),
                        status: item.status,                    
                    }
                    appendUserStatus(userStatus);
                }
            }
        },
    });
}


export const Positions = (props: { onClick: () => void } ) => {
    const [ userStatus, appendUserStatus, resetUserStatus ] = useUserStatus();
    const { address } = useAccount();
    useContractRead({
        addressOrName: contractAddress,
        contractInterface: contractAbi,
        functionName: "getListOfUserPositions",
        args: [ address ],
        cacheOnBlock: true,
        onSuccess(data) {
            resetUserStatus();
            for (let item of data.slice().reverse()) {
                let userStatus: IUserStatus = {
                    address: address?.toString(),
                    longitude: convertLngInt32ToFloat(Number(item.latitude)), // ToDo: change
                    latitude: convertLatInt32ToFloat(Number(item.longitude)), // ToDo: change
                    timestamp: item.timestamp.toString(),
                    status: item.status,                    
                }
                appendUserStatus(userStatus);
            }
        },
    });

    console.log(userStatus);

    return (
        <div className="w-full px-6 py-2 flex flex-col justify-start">            
            <MapModalTitle title="What happened"/>                        
            <div className="h-64 w-full flex flex-col items-strech justify-start gap-2 overflow-y-auto">
                { userStatus.map((item, key) => <UserStatus key={key} userStatus={item}/>) }
            </div>
            <div className="mt-4 mb-4 flex justify-center">
                <Button text={ "Close" } onClick = { props.onClick }/>
            </div>
        </div>
    );
}

export const MapButtonPositions = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div>
            <BookmarkButton
                onClick={ () => setIsOpen(true) }
            />
            <MapModal
                content={ <Positions onClick={ () => setIsOpen(false) } /> }
                isOpen={ isOpen }
                openModal={ () => setIsOpen(true) }
                closeModal={ () => setIsOpen(false) }
            />
        </div>
    )
}
