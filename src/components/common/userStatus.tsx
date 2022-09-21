import truncateEthAddress from "truncate-eth-address";
import { MapPinIcon, ClockIcon, EnvelopeIcon, UserIcon, PaperAirplaneIcon, HomeIcon  } from "@heroicons/react/24/outline";
import { IUserStatus } from "../../interface/user";
import { ComputeCurrentTimeDifference } from "../../utils/computeTimeDifference";
import { useAccount } from "wagmi";
import { useMap } from "react-map-gl";


export const UserStatus = (props: { userStatus: IUserStatus }) => {

    const { address } = useAccount();
    const { current: map } = useMap();

    let color: string;
    if (props.userStatus.weight !== undefined) {
        color = "border-blue-" + (props.userStatus.weight!).toString() ;
    } else {
        color = "border-stone-200";
    }
    
    function flyTo () {
        if (!map) return;
        map.flyTo({center: [props.userStatus.longitude, props.userStatus.latitude]});
    }

    return (
        <div className={`
                px-2 py-2
                flex flex-col justify-start gap-2 
                border 
                ${ color }
                rounded-lg
                hover:bg-stone-700
                group
            `}
            onClick={ flyTo }
        >
            <div className="flex flex-row items-center justify-between gap-2">
                <div className="text-xs flex flex-row items-center justify-start gap-2">
                    <div>
                        <UserIcon className="h-4 w-4"/>
                    </div>
                    <div>
                        { truncateEthAddress(props.userStatus?.address!) }
                    </div>
                    <div>
                        ·
                    </div>
                    <div>
                        <ClockIcon className="h-4 w-4"/>
                    </div>
                    <div>
                        { ComputeCurrentTimeDifference(Number(props.userStatus.timestamp) * 1000) }
                    </div>
                </div>
                <button className="px-2 py-1 text-stone-200 group-hover:text-white">
                    { ( props.userStatus.isMe ) ?
                        <HomeIcon className="h-4 w-4"/> :
                        <UserIcon className="h-4 w-4"/>
                    }
                </button>
            </div>
            
            <div className="flex flex-row items-center justify-start gap-2">
                <div>
                    <EnvelopeIcon className="h-4 w-4"/>
                </div>
                <div>
                    { props.userStatus.status }
                </div>
            </div>

            <div className="flex flew-row items-center justify-between">
                <div className="flex flex-row items-center justify-start gap-2 text-xs">
                    <div>
                        { <MapPinIcon className="h-4 w-4"/> }
                    </div>
                    <div>
                        { props.userStatus.latitude.toFixed(5) }, { props.userStatus.longitude.toFixed(5) }
                    </div>
                </div>
                <div className="px-2">
                    <PaperAirplaneIcon className="h-4 w-4 text-stone-200 group-hover:text-blue-400 group-hover:-rotate-45"/>
                </div>
            </div>

        </div>
    )
}
