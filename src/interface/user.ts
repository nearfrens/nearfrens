import { EnumNetwork } from './network';
import { BigNumber } from 'ethers';

export interface IUserStatus {
    address?: string;
    contractAddress: Array<string>;
    timestamp: string;
    longitude: number;
    latitude: number;
    status: string;
    weight: number;
    tokenIds: Array<BigNumber>;
    nfts: Array<IUserNft>;
    isMe: boolean;
    displayNft: number;
}

export interface IUserNft {
    active?: boolean;
    contractAddress: string;
    description: string;
    network?: EnumNetwork;
    title: string;
    tokenId: string;
    tokenType: string;
    tokenUri?: string;
    imageUrl?: string;
}
