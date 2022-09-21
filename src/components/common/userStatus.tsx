import truncateEthAddress from "truncate-eth-address";
import { MapPinIcon, ClockIcon, EnvelopeIcon, UserIcon  } from "@heroicons/react/24/outline";
import { IUserStatus } from "../../interface/user";
import { ComputeCurrentTimeDifference } from "../../utils/computeTimeDifference";
import { useAccount } from "wagmi";


export const UserStatus = (props: { userStatus: IUserStatus }) => {

    const { address } = useAccount();

    let color: string;
    if (props.userStatus.weight !== undefined) {
        color = "border-blue-" + (props.userStatus.weight!).toString() ;
    } else {
        color = "border-stone-200";
    }

    return (
        <div className={`
            px-2 py-2
            flex flex-col justify-start gap-2 
            border 
            ${ color }
            rounded-lg
        `}
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
                <div className="text-stone-200 text-xs rounded-lg px-2 py-1 border-stone-200">
                    { ( props.userStatus.address === address ) ? "me" : "friend" }
                </div>
            </div>
            
            <div className="flex flex-row items-center justify-start gap-2">
                <div>
                    <EnvelopeIcon className="h-4 w-4"/>
                </div>
                <div>
                    { props.userStatus.status }
                </div>
            </div>

            <div className="flex flex-row items-center justify-start gap-2 text-xs">
                <div>
                    { <MapPinIcon className="h-4 w-4"/> }
                </div>
                <div>
                    { props.userStatus.latitude.toFixed(5) }, { props.userStatus.longitude.toFixed(5) }
                </div>
            </div>

        </div>
    )
}
