import { useNetwork } from "wagmi"
import { NearFrensContractAddressMapping } from "../interface/contract";

export const useNetworkContract = (): [ string? ] => {
    const { chain } = useNetwork();
    return [ NearFrensContractAddressMapping[chain?.name!] ]
}
