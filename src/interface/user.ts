import { EnumNetwork } from './network';
export interface IUserStatus {
    address?: string;
    timestamp: string;
    longitude: number;
    latitude: number;
    status: string;
    weight: number;
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
}
