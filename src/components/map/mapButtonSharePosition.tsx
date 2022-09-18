import { useState } from "react";
import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from "wagmi";
import truncateEthAddress from "truncate-eth-address";
import { Button } from "../common/button";
import { Log } from "../common/log";
import { MapInput } from "../common/input";
import { Table, TableLineWithTwoColumn } from "../common/table";
import { convertLatFloatToInt32, convertLngFloatToInt32 } from "./mapFunction";
import { useMapCoordPosition } from '../../hooks/mapCoordPosition';
import { MapModal, MapModalTitle } from "./mapModal";
import { MapPinButton } from "./mapButtonRound";
import { MapDisclosure } from "./mapDisclosure";
import contractAbi from "./../../contract/abi.json";
const contractAddress:string = process.env.REACT_APP_CONTRACT_ON_GOERLI!;


interface ITransactionData {
    latitude: number;
    longitude: number;
    status: string;
    zoneId: number;
    collections: Array<string>;
    tokenId: Array<number>;
}

const TransactionParameters = (props: {data: ITransactionData}) => {
    return (
        <Table
            lines={[
                    <TableLineWithTwoColumn
                        label="Latitude"
                        value={ props.data.latitude?.toString() }
                        textSize="text-xs"
                    />,
                    <TableLineWithTwoColumn 
                        label="Longitude"
                        value={ props.data.longitude?.toString() }
                        textSize="text-xs"
                    />,
                    <TableLineWithTwoColumn 
                        label="ZoneId"
                        value={ props.data.zoneId?.toString() }
                        textSize="text-xs"
                    />,
                    <TableLineWithTwoColumn 
                        label="Status"
                        value={ props.data.status }
                        textSize="text-xs"
                    />,
                    <TableLineWithTwoColumn 
                        label="Collections"
                        // value={ (props.data.collections) ? truncateEthAddress(props.data.collections[0]) : "" }
                        value=""
                        textSize="text-xs"
                    />,
                    <TableLineWithTwoColumn 
                        label="tokenIds"
                        value={ props.data.tokenId?.toString() }
                        textSize="text-xs"
                    />
            ]}
        />
    );
}

interface IPositionParameters {
    longitude: number;
    latitude: number;
    timestamp: number;
}

const PositionParameters = (props: {pos: IPositionParameters}) => {
    // const dateTimestamp = new Date(props.pos.timestamp).toISOString();
    return (
        <Table
            lines={[
                    <TableLineWithTwoColumn
                        label="Latitude"
                        value={ props.pos.latitude?.toString() }
                        textSize="text-xs"
                    />,
                    <TableLineWithTwoColumn 
                        label="Longitude"
                        value={ props.pos.longitude?.toString() }
                        textSize="text-xs"
                    />,
                    // <TableLineWithTwoColumn 
                    //     label="Timestamp"
                    //     value={ dateTimestamp }
                    // />,
            ]}
        />
    );
}

export const SharePosition = (props: { onClick: () => void } ) => {
    
    const timestamp: number = Date.now();
    const [mapCoordPosition] = useMapCoordPosition();
    const [gasLimit, setGasLimit] = useState<number>(400000);
    const [status, setStatus] = useState<string>("");
    const [zoneId, setZoneId] = useState<number|null>(null);
    const [tokenId, setTokenId] = useState<number|null>(null);
    const [collectionAddress, setCollectionAddress] = useState<string|null>(null);

    const pos: IPositionParameters = {
        longitude: mapCoordPosition?.longitude!,
        latitude: mapCoordPosition?.latitude!,
        timestamp: timestamp,
    }

    const txData: ITransactionData = {
        longitude: convertLngFloatToInt32(mapCoordPosition?.longitude!),
        latitude: convertLatFloatToInt32(mapCoordPosition?.latitude!),
        status: status,
        zoneId: zoneId!,
        collections: [ collectionAddress! ],
        tokenId: [ tokenId! ],
    }

    console.log("txData", txData);
    console.log("contractAbi", contractAbi);
    console.log("contractAddress", contractAddress);

    const { config, error } = usePrepareContractWrite({
        addressOrName: contractAddress,
        contractInterface: contractAbi,
        functionName: "checkIn",
        args: [
            txData.longitude,
            txData.latitude,
            txData.zoneId,
            txData.collections,
            txData.tokenId,
            txData.status,
        ],
        overrides: {
            gasLimit: gasLimit,
        },
    })
    
    const writeContract = useContractWrite(config)

    const tx = useWaitForTransaction({
        hash: writeContract.data?.hash,
    })

    let buttonMessage = "Send";

    let txStatus = null;
    if ( error ) {
        txStatus = <Log level="error" msg="All parameters must be filled" />
    } else if ( writeContract.isSuccess ) {
        if (tx.isLoading) {
            txStatus = <Log level="info" msg="Waiting for transaction status" />        
        }
        if (tx.isSuccess) {
            txStatus = <Log level="success" msg="Transaction successfuly sent" />
        }
    } else if ( writeContract.isLoading ) {
        txStatus = <Log level="info" msg="Let's go" />
    } else {
        if ( gasLimit < 21000 ) {
            txStatus = <Log level="warning" msg="Insufficent gas" />
        } else {
            txStatus = <Log msg="Share your position wit near frens" />
        }
    }

    return (
        <div className="w-full px-6 py-2 flex flex-col justify-start">

            <MapModalTitle title="Share position" />

            <div className="flex flex-col justify-start items-strech gap-4 overflow-y-auto h-64 mb-4">
                <div className="w-full flex flex-row items-center gap-2">
                    <div className="w-full">
                        <MapInput
                            value={ status }
                            onChange={ setStatus }
                            placeholder="What's happening ?"
                            title="Position status"
                            titleSize="text-sm"
                            textPosition="text-left"
                            textSize="text-xs"
                        />
                    </div>
                    <div className="w-20">
                        <MapInput
                            value={ zoneId }
                            onChange={ setZoneId }
                            placeholder=""
                            title="Zone id"
                            titleSize="text-sm"
                            textPosition="text-right"
                            textSize="text-xs"
                        />                 
                    </div>   
                </div>
                <div className="w-full flex flex-row items-center gap-2">
                    <div className="w-full">
                        <MapInput
                            value={ collectionAddress }
                            onChange={ setCollectionAddress }
                            placeholder=""
                            title="Collection address"
                            titleSize="text-sm"
                            textPosition="text-left"
                            textSize="text-xs"
                        />
                    </div>
                    <div className="w-20">
                        <MapInput
                            value={ tokenId }
                            onChange={ setTokenId }
                            placeholder=""
                            title="Token id"
                            titleSize="text-sm"
                            textPosition="text-right"
                            textSize="text-xs"
                        />   
                    </div>
                </div>                                  
                <MapDisclosure title="Position parameters" content={ <PositionParameters pos={ pos } />} />
                <MapDisclosure title="Transaction data" content={ <TransactionParameters data={ txData } />} />            
                <MapInput
                    value={ gasLimit }
                    onChange={ setGasLimit }
                    placeholder="What's happening ?"
                    title="Gas Fees"
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
    )
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
    )
}
