import { Dispatch } from "react";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { IUserStatus } from "../interface/user";
import { useNetworkContract } from "./useNetworkContract";
import { useUserNfts } from "./useUserNfts";
import { convertLatInt32ToFloat, convertLngInt32ToFloat } from "../components/map/mapFunction";
import { append, reset } from "../features/userCollectionStatus";
import { ethers } from "ethers";
import { useAlchemyConfigNetwork } from "./useAlchemyConfigNetwork";
import { useAccount, useNetwork } from "wagmi";
import { Alchemy } from "alchemy-sdk";


function ParseInput (data: Array<any>, currentAddress: string): Array<IUserStatus> {
    let parsedData = [];
    for (let item of data) {
        let userStatus: IUserStatus = { 
            address: item.user,
            contractAddress: item.collections,
            tokenIds: item.tokenIds,
            longitude: convertLngInt32ToFloat(Number(item.longitude)),
            latitude: convertLatInt32ToFloat(Number(item.latitude)),
            timestamp: item.timestamp.toString(),
            status: item.status,
            weight: 0,
            nfts: [],
            isMe: currentAddress === item.user,
        }
        parsedData.push(userStatus);
    }
    return parsedData;
}

export interface QueryUserCollectionStatus {
    userCollectionStatus: Array<IUserStatus>;
    appendUserCollectionStatus: Dispatch<IUserStatus>;
    fetchUserCollectionStatus: () => void;
    resetUserCollectionStatus: () => void;
}


export function useUserCollectionStatus(): QueryUserCollectionStatus {
    
    const { chain } = useNetwork();
    const { address } = useAccount();
    const { contractAddress, contractAbi } = useNetworkContract();
    const { alchemyConfig, enumNetwork } = useAlchemyConfigNetwork();
    const { userNfts } = useUserNfts();


    const userCollectionStatus: Array<IUserStatus> = useAppSelector((state) => Object.values(state.userCollectionStatus.mapping));
    const dispatch = useAppDispatch();
    const appendUserCollectionStatus = (userStatus: IUserStatus) => dispatch(append(userStatus));
    const resetUserCollectionStatus = () => dispatch(reset());

    const fetchUserCollectionStatus = async () => { 

        if (!contractAddress) {
            console.log("Empty contract address");
            return ;
        }

        if (!contractAbi) {
            console.log("Empty contract abi");
            return ;
        }

        if (!address) {
            console.log("Emptu address");
            return ;
        }

        const alchemy = new Alchemy(alchemyConfig);
        const provider = new ethers.providers.AlchemyProvider(chain?.network!, alchemyConfig.apiKey);
        
        let listOfCollectionAddress: Array<string> = [];
        for (let userNft of userNfts) {
            if (!listOfCollectionAddress.includes(userNft.contractAddress)) {
                listOfCollectionAddress.push(userNft.contractAddress);
            }
        };
        
        if (listOfCollectionAddress.length === 0) {
            console.log("No colletions"); 
            return ;
        }
        
        const smartContrat = new ethers.Contract(contractAddress, contractAbi, provider);

        resetUserCollectionStatus();
        for (let collection of listOfCollectionAddress) {
            let data = await smartContrat.getPositionsforCollections([collection], 0);
            console.log(data);
            let newUserListOfCollection = ParseInput(data[0], address);
            for (let userStatus of newUserListOfCollection) {        
                let nft = await alchemy.nft.getNftMetadata(userStatus.contractAddress[0], userStatus.tokenIds[0]);
                userStatus.nfts.push({
                    contractAddress: nft.contract.address,
                    description: nft.description,
                    title: nft.title,
                    tokenId: nft.tokenId,
                    tokenType: nft.tokenType,
                    tokenUri: nft.tokenUri?.raw,
                    network: enumNetwork,
                });
                appendUserCollectionStatus(userStatus);
            }
        }
    };

    return { userCollectionStatus, appendUserCollectionStatus, fetchUserCollectionStatus, resetUserCollectionStatus };

}
