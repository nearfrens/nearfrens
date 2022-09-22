import { useAppSelector, useAppDispatch } from "../app/hooks";
import { append, reset, switchActivity } from "../features/userNftsSlice";
import { Alchemy } from "alchemy-sdk";
import { useAlchemyConfigNetwork } from "./useAlchemyConfigNetwork";
import { IUserNft } from "../interface/user";
import { Dispatch } from "react";
import { useAccount } from "wagmi";


export interface QueryUserNfts {
    userNfts: Array<IUserNft>;
    appendUserNfts: Dispatch<IUserNft>
    fetchUserNfts: () => void;
    resetUserNfts: () => void;
    switchUserNfts: Dispatch<IUserNft>;
}

export const useUserNfts = (): QueryUserNfts => {
    
    const { address } = useAccount();
    const { alchemyConfig, enumNetwork } = useAlchemyConfigNetwork();
    const alchemy = new Alchemy(alchemyConfig);
    
    const userNfts: Array<IUserNft> = useAppSelector((state) => Object.values(state.userNfts.mapping));
    const dispatch = useAppDispatch();
    const appendUserNfts = (nft: IUserNft) => dispatch(append(nft));
    const resetUserNfts = () => dispatch(reset());
    const switchUserNfts = (nft: IUserNft) => dispatch(switchActivity(nft));

    const fetchUserNfts = async () => {
        if (address === undefined) return;    
        
        resetUserNfts();
        
        const nfts = await alchemy.nft.getNftsForOwner(address);
        const nftList = nfts["ownedNfts"];
        
        for (let nft of nftList) {
            
            let imageUrl;
            
            if (nft.media && nft.media.length > 0) {
                const raw: string = nft.media[0].raw;
                const gateway: string = nft.media[0].gateway;
                if ( raw.startsWith("http") ) {
                    imageUrl = raw;
                } else {
                    imageUrl = gateway;
                }
                console.log(imageUrl);
            }

            let userNft: IUserNft = {
                contractAddress: nft.contract.address,
                description: nft.description,
                title: nft.title,
                tokenId: nft.tokenId,
                tokenType: nft.tokenType,
                tokenUri: nft.tokenUri?.raw,
                imageUrl: imageUrl,
                network: enumNetwork,
            }

            appendUserNfts(userNft);
        }
    };

    return { userNfts, appendUserNfts, fetchUserNfts, resetUserNfts, switchUserNfts };  
}
