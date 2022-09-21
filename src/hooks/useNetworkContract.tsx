import { useNetwork } from "wagmi"
import { NearFrensContractAddressMapping } from "../interface/contract";
import contractAbiJson from "./../contract/abi.json";


export interface QueryNetworkContract {
    contractAddress?: string;
    contractAbi?: string;
}

export const useNetworkContract = (): QueryNetworkContract => {
    const { chain } = useNetwork();
    const contractAddress: string|undefined = NearFrensContractAddressMapping[chain?.name!];
    const contractAbi: string = JSON.stringify(contractAbiJson);
    return { contractAddress, contractAbi }
}
