import truncateEthAddress from "truncate-eth-address";
import { MapPinIcon, ClockIcon, UserIcon, PaperAirplaneIcon, HomeIcon, ChatBubbleLeftIcon  } from "@heroicons/react/24/outline";
import { IUserStatus } from "../../interface/user";
import { ComputeCurrentTimeDifference } from "../../utils/computeTimeDifference";
import { useEnsName, useNetwork } from "wagmi";
import { UserNft, UserNftImage } from "./userNft";


export const UserStatus = (props: { userStatus: IUserStatus, onClick?: () => void }) => {

    let color: string;
    if (props.userStatus.weight !== undefined) {
        color = "border-blue-" + (props.userStatus.weight!).toString() ;
    } else {
        color = "border-stone-200";
    }

    const { chains } = useNetwork();    
    const ensName = useEnsName({ address: props.userStatus.address, cacheTime: 10_000, chainId: chains[0].id });
    // const ensAvatar = useEnsAvatar({ addressOrName: props.userStatus.address, cacheTime: 10_000, chainId: chains[0].id });
    
    return (
        <div className={`
                px-2 py-2
                border
                flex flex-row justify-between items-center
                ${ color }
                rounded-lg
                hover:bg-stone-800
                group
            `}
            onClick={ props.onClick }
        >
            
            <div className="w-1/5">
                <UserNftImage nft={ props.userStatus.nfts[0] }/>
            </div>

            <div className="w-3/4 flex flex-col justify-start gap-2">
                <div className="flex flex-row items-center justify-between gap-2">
                    <div className="text-xs flex flex-row items-center justify-start gap-2">
                        <div>
                            <UserIcon className="h-4 w-4"/>
                        </div>
                        <div>
                            { 
                                (!ensName.data) ? 
                                truncateEthAddress(props.userStatus?.address!) :
                                ensName.data
                            }
                        </div>
                        {/* <div>
                            ·
                        </div> */}
                    </div>
                    <button className="px-2 py-1 text-stone-200 group-hover:text-white">
                        { ( props.userStatus.isMe ) ?
                            <HomeIcon className="h-4 w-4"/> :
                            <UserIcon className="h-4 w-4"/>
                        }
                    </button>
                </div>
                
                <div className="flex flex-row items-start justify-start gap-2">
                    <div>
                        <ChatBubbleLeftIcon className="h-4 w-4"/>
                    </div>
                    <div className="text-xs">
                        { props.userStatus.status }
                    </div>
                </div>

                <div className="flex flew-row items-center justify-between">
                    <div className="flex flex-row items-center justify-start gap-2 text-xs">
                        <div>
                            <ClockIcon className="h-4 w-4"/>
                        </div>
                        <div>
                            { ComputeCurrentTimeDifference(Number(props.userStatus.timestamp) * 1000) }
                        </div>
                        {/* <div>
                            { <MapPinIcon className="h-4 w-4"/> }
                        </div>
                        <div>
                            { props.userStatus.latitude.toFixed(5) }, { props.userStatus.longitude.toFixed(5) }
                        </div> */}
                    </div>
                    <div className="px-2">
                        <PaperAirplaneIcon className="h-4 w-4 text-stone-200 group-hover:text-blue-400 group-hover:-rotate-45"/>
                    </div>
                </div>

            </div>

        </div>
    )
}
