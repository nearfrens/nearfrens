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
                        value={ props.data.latitude.toString() }
                    />,
                    <TableLineWithTwoColumn 
                        label="Longitude"
                        value={ props.data.longitude.toString() }
                    />,
                    <TableLineWithTwoColumn 
                        label="ZoneId"
                        value={ props.data.zoneId.toString() }
                    />,
                    <TableLineWithTwoColumn 
                        label="Status"
                        value={ props.data.status }
                    />,
                    <TableLineWithTwoColumn 
                        label="Collections"
                        value={ truncateEthAddress(props.data.collections[0]).toString() }
                    />,
                    <TableLineWithTwoColumn 
                        label="tokenIds"
                        value={ props.data.tokenId.toString() }
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
    const dateTimestamp = new Date(props.pos.timestamp).toISOString();
    return (
        <Table
            lines={[
                    <TableLineWithTwoColumn
                        label="Latitude"
                        value={ props.pos.latitude.toString() }
                    />,
                    <TableLineWithTwoColumn 
                        label="Longitude"
                        value={ props.pos.longitude.toString() }
                    />,
                    <TableLineWithTwoColumn 
                        label="Timestamp"
                        value={ dateTimestamp }
                    />,
            ]}
        />
    );
}

export const SharePosition = (props: { onClick: () => void } ) => {
    
    const timestamp: number = Date.now();
    const [mapCoordPosition] = useMapCoordPosition();
    const [gasLimit, setGasLimit] = useState<number>(400000);
    const [status, setStatus] = useState<string>("");

    const pos: IPositionParameters = {
        longitude: mapCoordPosition?.longitude!,
        latitude: mapCoordPosition?.latitude!,
        timestamp: timestamp,
    }

    const txData: ITransactionData = {
        longitude: convertLngFloatToInt32(mapCoordPosition?.longitude!),
        latitude: convertLatFloatToInt32(mapCoordPosition?.latitude!),
        status: status,
        zoneId: 1,
        collections: [ "0x1b974541C78D6f4b61133962819Ed3ceA726512d", "0x2363FC419368ea1EeE89d17828af66f800f86c2e" ],
        tokenId: [ 1, 2 ],
    }

    const { config, error } = usePrepareContractWrite({
        addressOrName: contractAddress,
        contractInterface: contractAbi,
        functionName: "checkIn",
        args: [
            txData.longitude.toString(),
            txData.latitude.toString(),
            txData.zoneId.toString(),
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
        txStatus = <Log level="error" msg="Error" />
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

            <div className="flex flex-col justify-start items-strech gap-4">
                <MapInput
                    value={ status }
                    onChange={ setStatus }
                    placeholder="What's happening ?"
                    title="Position status"
                    textPosition="text-left"
                    textSize="text-sm"
                />                                     
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
                <div className="text-xs">
                    { txStatus }
                </div>
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
