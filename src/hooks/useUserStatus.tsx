import { useAppSelector, useAppDispatch } from "../app/hooks";
import { IUserStatus } from "../interface/user";
import { append, reset } from "../features/userStatusSlice";
import { Dispatch } from "react";
import { useAccount } from "wagmi";
import contractAbi from "./../contract/abi.json";
import { useContractRead } from "wagmi";
import { convertLatInt32ToFloat, convertLngInt32ToFloat } from "../components/map/mapFunction";
import { useNetworkContract } from "./useNetworkContract";
import { Result } from "ethers/lib/utils";


function FetchPositions(append: Dispatch<IUserStatus>, reset: () => void, data?: Result, userAddress?: string) {

    if (!userAddress) return;
    if (!data) return;
    
    reset();
    let arrayOfStatus: Array<IUserStatus> = [];

    for (let item of data.slice().reverse()) {
        let userStatus: IUserStatus = {
            address: userAddress?.toString(),
            longitude: convertLngInt32ToFloat(Number(item.longitude)), 
            latitude: convertLatInt32ToFloat(Number(item.latitude)),
            timestamp: item.timestamp.toString(),
            status: item.status,
            tokenIds: [],
            contractAddress: [],
            weight: 0,
            nfts: [],
        }
        arrayOfStatus.push(userStatus);
    }

    arrayOfStatus.sort(function(a: IUserStatus, b: IUserStatus){return Number(a.timestamp) - Number(b.timestamp)});
    for (let i = 0; i < arrayOfStatus.length; i++) {
        arrayOfStatus[i].weight = 100 * Math.floor( ( i / arrayOfStatus.length) * 8 + 1 );
    }

    arrayOfStatus.sort(function(a: IUserStatus, b: IUserStatus){return Number(b.timestamp) - Number(a.timestamp)});
    for (let item of arrayOfStatus) {
        append(item);
    }

}

export interface QueryUserStatus {
    userStatus: Array<IUserStatus>;
    appendUserStatus: Dispatch<IUserStatus>;    
    fetchUserStatus: () => void;
    resetUserStatus: () => void;
}

export function useUserStatus(): QueryUserStatus {
    const { address } = useAccount();
    const { contractAddress } = useNetworkContract();

    const userStatus: Array<IUserStatus> = useAppSelector((state) => state.userStatus.status);
    const dispatch = useAppDispatch();
    
    const { data } = useContractRead({
        addressOrName: contractAddress!,
        contractInterface: contractAbi,
        functionName: "getListOfUserPositions",
        args: [ address ],
        cacheOnBlock: true,
    })

    const appendUserStatus = (userStatus: IUserStatus) => dispatch(append(userStatus));
    const resetUserStatus = () => dispatch(reset());
    const fetchUserStatus = () => { FetchPositions(appendUserStatus, resetUserStatus, data, address) };

    return { userStatus, appendUserStatus, fetchUserStatus, resetUserStatus }
}
