import { useAppSelector, useAppDispatch } from "../app/hooks";
import { append, reset, switchActivity } from "../features/userListOfNftSlice";
import { Alchemy, } from "alchemy-sdk";
import { IUserNft } from "../interface/user";
import { useAlchemyConfigNetwork } from "./useAlchemyConfigNetwork";
import { Dispatch } from "react";
import { useAccount } from "wagmi";


export const useUserListOfNft = (): [Array<IUserNft>, () => void, Dispatch<number>, () => void ] => {
    const { address } = useAccount();
    const [ alchemyConfig, enumNetwork ] = useAlchemyConfigNetwork();
    const alchemy = new Alchemy(alchemyConfig);

    const state: Array<IUserNft> = useAppSelector((state) => state.userListOfNft.nfts);
    const dispatch = useAppDispatch();
    const appendState = (nft: IUserNft) => dispatch(append(nft));
    const resetState = () => dispatch(reset());
    const switchActivityState = (index: number) => dispatch(switchActivity(index));

    const fetchState = async () => {
        if (address === undefined) return;    
        resetState();
        const nfts = await alchemy.nft.getNftsForOwner(address);
        const nftList = nfts["ownedNfts"];
        for (let nft of nftList) {
            let userNft: IUserNft = {
                contractAddress: nft.contract.address,
                description: nft.description,
                title: nft.title,
                tokenId: nft.tokenId,
                tokenType: nft.tokenType,
                tokenUri: nft.tokenUri?.raw,
                network: enumNetwork,
            }
            appendState(userNft);
        }
    }

    return [state, fetchState, switchActivityState, resetState]
}
