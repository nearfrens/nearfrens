import { UserIcon } from "@heroicons/react/24/outline";
import truncateEthAddress from "truncate-eth-address";
import { useEnsName, useNetwork } from "wagmi";
import { ReactComponent as EnsLogo } from "../icons/svg/ens.svg";


export interface PropsEnsProfile {
    address: string;
    size?: string;
}

export const EnsProfile = (props: PropsEnsProfile) => {

    const { chains } = useNetwork();
    const ensName = useEnsName({ 
        address: props.address, 
        cacheTime: 5_000,
        chainId: chains[0].id }
    );

    const title = (ensName.data) ? ensName.data : truncateEthAddress(props.address!).toString() ;
    let ensLogo;
    
    if (props.size === "small") {
        ensLogo = (ensName.data) ? <EnsLogo className="h-3 w-3" /> : <UserIcon className="h-3 w-3" /> ;
        return (
            <div className="flex flex-row justify-start items-center gap-2">
                
                <div>
                    { ensLogo }
                </div>
                
                <div className="text-sm">
                    { title }
                </div>

            </div>
        )
    } else {
        ensLogo = (ensName.data) ? <EnsLogo className="h-4 w-4" /> : <UserIcon className="h-4 w-4" /> ;
        return (
            <div className="flex flex-row justify-start items-center gap-2">
                
                <div>
                    { ensLogo }
                </div>

                <div className="text-normal">
                    { title }
                </div>

            </div>
        )
    }
}