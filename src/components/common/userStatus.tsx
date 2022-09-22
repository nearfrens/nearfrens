import truncateEthAddress from "truncate-eth-address";
import { ClockIcon, UserIcon, PaperAirplaneIcon, ChatBubbleLeftIcon  } from "@heroicons/react/24/outline";
import { IUserStatus } from "../../interface/user";
import { ComputeCurrentTimeDifference } from "../../utils/computeTimeDifference";
import { useEnsName, useNetwork } from "wagmi";
import { UserNftImage } from "./userNft";


export const UserStatus = (props: { userStatus: IUserStatus, onClickFlyTo?: () => void, onClickImage?: () => void }) => {

    let color: string;
    if (props.userStatus.weight !== undefined) {
        color = "border-blue-" + (props.userStatus.weight!).toString() ;
    } else {
        color = "border-stone-200";
    }

    const { chains } = useNetwork();    
    const ensName = useEnsName({ address: props.userStatus.address, cacheTime: 10_000, chainId: chains[0].id });
    
    return (
        <div className={`            
                border
                flex flex-row justify-between items-stretch gap-2
                ${ color }
                rounded-lg
            `}
        >
            
            <div className="w-1/3 hover:bg-stone-100/10">
                <button onClick={ props.onClickImage }>
                    { 
                        (props.userStatus.nfts && props.userStatus.nfts.length > 0) ?
                        <UserNftImage image={ props.userStatus.nfts[props.userStatus.displayNft].imageUrl! }/> :
                        null
                    }
                </button>
            </div>

            <div className="group w-2/3 flex flex-col justify-between items-start hover:bg-stone-800" onClick={ props.onClickFlyTo }>
                <div className="flex flex-row items-center justify-between gap-2">
                    <div className="text-sm flex flex-row items-center justify-start gap-2">
                        <div>
                            <UserIcon className="h-5 w-5"/>
                        </div>
                        <div>
                            {
                                (!ensName.data) ?
                                truncateEthAddress(props.userStatus?.address!) :
                                ensName.data
                            }
                        </div>
                    </div>
                </div>
                
                <div className="flex flex-row items-start justify-start gap-2">
                    <div>
                        <ChatBubbleLeftIcon className="h-5 w-5"/>
                    </div>
                    <div className="text-xs text-left">
                        { props.userStatus.status }
                    </div>
                </div>

                <div className="w-full flex flew-row items-center justify-between">
                    <div className="flex flex-row items-center justify-start gap-2 text-xs">
                        <div>
                            <ClockIcon className="h-5 w-5"/>
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
                    {
                        ( !props.onClickFlyTo ) ? null :
                        <div className="px-2">
                            <PaperAirplaneIcon className="h-4 w-4 text-stone-200 group-hover:text-blue-400 group-hover:-rotate-45"/>
                        </div>                        
                    }
                </div>

            </div>

        </div>
    )
}
