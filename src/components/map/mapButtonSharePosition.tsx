import React, { useEffect, useState } from "react";
import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from "wagmi";
import { ArrowLeftCircleIcon, ArrowRightCircleIcon } from "@heroicons/react/24/outline";

import { Button } from "../common/button";
import { Log } from "../common/log";
import { MapInput } from "../common/input";
import { UserNftSmall } from "../common/userNft";
import { MapPinButton } from "../common/buttonRound";

import contractAbi from "./../../contract/abi.json";

import { useMapCoordPosition } from '../../hooks/useMapCoordPosition';
import { useUserListOfNft } from "../../hooks/useUserListOfNft";
import { useNetworkContract } from "../../hooks/useNetworkContract";

import { convertLatFloatToInt32, convertLngFloatToInt32 } from "./mapFunction";
import { MapModal, MapModalTitle, MapModalSubTitle } from "./mapModal";


interface ITransactionData {
    latitude: number;
    longitude: number;
    status: string;
    zoneId: number;
    collections: Array<string>;
    tokenId: Array<string>;
}

// const TransactionParameters = (props: {data: ITransactionData}) => {
    
//     let displayCollections: Array<string> = [];
//     for (let collection of props.data.collections) {
//         displayCollections.push(truncateEthAddress(collection));
//     }

//     let displayTokenId: Array<string>  = [];
//     for (let tokenId of props.data.tokenId) {
//         displayTokenId.push(tokenId);
//     }

//     console.log("Coucou");
//     console.log(props.data);

//     return (
//         <Table
//             lines={[
//                     <TableLineWithTwoColumn
//                         label="Latitude"
//                         value={ props.data.latitude?.toString() }
//                         textSize="text-xs"
//                     />,
//                     <TableLineWithTwoColumn
//                         label="Longitude"
//                         value={ props.data.longitude?.toString() }
//                         textSize="text-xs"
//                     />,
//                     <TableLineWithTwoColumn
//                         label="ZoneId"
//                         value={ props.data.zoneId?.toString() }
//                         textSize="text-xs"
//                     />,
//                     <TableLineWithTwoColumn 
//                         label="Status"
//                         value={ props.data.status }
//                         textSize="text-xs"
//                     />,
//                     <TableLineWithTwoColumn 
//                         label="Collections"
//                         value={ displayCollections.toString() }
//                         textSize="text-xs"
//                     />,
//                     <TableLineWithTwoColumn 
//                         label="tokenIds"
//                         value={ displayTokenId.toString() }
//                         textSize="text-xs"
//                     />
//             ]}
//         />
//     );
// }

// interface IPositionParameters {
//     longitude: number;
//     latitude: number;
//     timestamp: number;
// }

// const PositionParameters = (props: {pos: IPositionParameters}) => {
//     return (
//         <Table
//             lines={[
//                 <TableLineWithTwoColumn
//                     label="Latitude"
//                     value={ props.pos.latitude?.toString() }
//                     textSize="text-xs"
//                 />,
//                 <TableLineWithTwoColumn 
//                     label="Longitude"
//                     value={ props.pos.longitude?.toString() }
//                     textSize="text-xs"
//                 />,
//             ]}
//         />
//     );
// }

const DisplayCollection = () => {
    const [ userListOfNFt,,switchUserListOfNft ] = useUserListOfNft();
    const maxLen: number = userListOfNFt.length;
    const [ index, setIndex ] = useState<number>(0);
    const [ numActivated, setActivated ] = useState<number>(0);
    const decrementIndex = () => { if(index !== 0       ) setIndex(index - 1) };
    const incrementIndex = () => { if(index !== maxLen-1) setIndex(index + 1) };

    useEffect(() => {
        let counter = 0;
        for (let userNft of userListOfNFt) {
            if (userNft.active) {
                counter += 1;
            }
        }
        setActivated(counter);
    }, [ userListOfNFt ])

    return (
        <div className="w-full flex flex-col gap-2">
            <div className="w-full" onClick={ () => switchUserListOfNft(index)} >
                <UserNftSmall nft={ userListOfNFt[index] } />
            </div>
            <div className="w-full flex flex-row gap-2 items-center justify-center">
                <button onClick={ decrementIndex } disabled={index === 0}>
                    { (index !== 0) ? <ArrowLeftCircleIcon className="h-6 w-6"/> : <ArrowLeftCircleIcon className="h-6 w-6 text-stone-600"/> }
                </button>
                <div className="text-sm">
                    Active collections: { numActivated }
                </div>
                <button onClick={ incrementIndex } disabled={index === maxLen}>
                    { (index !== maxLen) ? <ArrowRightCircleIcon className="h-6 w-6"/> : <ArrowRightCircleIcon className="h-6 w-6 text-stone-600"/> }
                </button>
            </div>
        </div>
    );
}

export const SharePosition = (props: { onClick: () => void } ) => {
    
    const [ userListOfNFt ] = useUserListOfNft();
    const [ contractAddress ] = useNetworkContract();
    const [mapCoordPosition] = useMapCoordPosition();
    const [status, setStatus] = useState<string>("");
    const [zoneId] = useState<number>(0);
    const [tokenId, setTokenId] = useState<Array<string>>([]);
    const [collectionAddress, setCollectionAddress] = useState<Array<string>>([]);
    const [gasLimit, setGasLimit] = useState<number>(800001);

    useEffect(() => {
        let listTokenId = [];
        let listCollectionAddress = [];
        for (let userNft of userListOfNFt) {
            if (userNft.active) {
                listTokenId.push(userNft.tokenId);
                listCollectionAddress.push(userNft.contractAddress);
            }
        }
        setTokenId(listTokenId);
        setCollectionAddress(listCollectionAddress);
    }, [ userListOfNFt ]);

    const txData: ITransactionData = {
        longitude: convertLngFloatToInt32(mapCoordPosition?.longitude!),
        latitude: convertLatFloatToInt32(mapCoordPosition?.latitude!),
        status: status,
        zoneId: zoneId!,
        collections: collectionAddress,
        tokenId: tokenId,
    };

    const { config, error } = usePrepareContractWrite({
        addressOrName: contractAddress!,
        contractInterface: contractAbi,
        functionName: "checkIn",
        args: [
            txData.latitude,
            txData.longitude,
            txData.zoneId,
            txData.collections,
            txData.tokenId,
            txData.status,
        ],
        overrides: {
            gasLimit: gasLimit,
        },
    });
    
    const writeContract = useContractWrite(config);

    const tx = useWaitForTransaction({
        hash: writeContract.data?.hash,
    })

    let buttonMessage = "Send";

    let txStatus = null;
    if ( error ) {
        txStatus = <Log level="error" msg="All parameters must be filled" />;
    } else if ( writeContract.isSuccess ) {
        if (tx.isLoading) {
            txStatus = <Log level="info" msg="Waiting for transaction status" />;      
        }
        if (tx.isSuccess) {
            txStatus = <Log level="info" msg="Transaction sent" />;
        }
    } else if ( writeContract.isLoading ) {
        txStatus = <Log level="info" msg="Let's go" />
    } else {
        if ( gasLimit < 21000 ) {
            txStatus = <Log level="warning" msg="Insufficent gas" />;
        } else {
            txStatus = <Log msg="Share your position wit near frens" />;
        }
    }

    return (
        <div className="w-full px-6 py-2 flex flex-col justify-start">

            <MapModalTitle title="Share your collections" />
            
            <div className="flex mb-4 flex-col justify-start gap-1 overflow-y-auto">

                <MapModalSubTitle subTitle="Select your collections" />
                <DisplayCollection />

                <MapModalSubTitle subTitle="Enter your status" />
                <div className="w-full flex flex-row items-center gap-2">    
                    <MapInput
                        value={ status }
                        onChange={ (event: React.ChangeEvent<HTMLInputElement>) => setStatus(event.target.value) }
                        placeholder="What's happening ?"
                        // title={ null }
                        // titleSize="text-sm"
                        textPosition="text-left"
                        textSize="text-xs"
                    />
                </div>

                <MapInput
                    value={ gasLimit }
                    onChange={ (event: React.ChangeEvent<HTMLInputElement>) => setGasLimit(Number(event.target.value)) }
                    placeholder=""
                    title="Gas Limit"
                    textSize="text-xs"
                    textPosition="text-right"
                />  

            </div>

            <div className="text-xs">
                { txStatus }
            </div>

            <div className="mt-4 mb-4 flex justify-center gap-4">
                <Button 
                    text={ buttonMessage } 
                    onClick = { () => writeContract.write?.()}
                    disabled = { !writeContract.write }
                />
                <Button
                    text={ "Close" } 
                    onClick = { props.onClick }
                />
            </div>
            
        </div>
    );
}

export const MapButtonSharePosition = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div>
            <MapPinButton
                onClick={ () => setIsOpen(true) }
            />
            <MapModal
                content={ <SharePosition onClick={ () => setIsOpen(false) } /> }
                isOpen={ isOpen }
                openModal={ () => setIsOpen(true) }
                closeModal={ () => setIsOpen(false) } 
            />
        </div>
    );
}
