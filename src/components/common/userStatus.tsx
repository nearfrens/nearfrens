import { ClockIcon, ChatBubbleLeftIcon, ChatBubbleLeftRightIcon, PhotoIcon } from "@heroicons/react/24/outline";
import { BackwardIcon, ForwardIcon  } from "@heroicons/react/24/solid";
import { IUserStatus } from "../../interface/user";
import { ComputeCurrentTimeDifference } from "../../utils/computeTimeDifference";
import { UserNftImage } from "./userNft";
import { useUserCollectionStatus } from "../../hooks/useUserCollectionStatus";
import { EnsProfile } from "../identity/ensProfile";

export interface PropsUserStatusAvatar {
    status: IUserStatus;
}


export const UserStatusAvatar = (props: PropsUserStatusAvatar) => {
    const { incrementUserCollectionStatusNftDisplay } = useUserCollectionStatus();
    return (
        <div className="relative group overflow-hidden rounded-lg">
            
            <UserNftImage image={ props.status.nfts[props.status.displayNft].imageUrl! }/>            
            
            {
                ( props.status.nfts.length <= 1) ? null :
                <div className="absolute top-1/2 left-1/2 z-10 -translate-x-1/2 translate-y-2/4">                
                    <div className="hidden group-hover:flex flex-row justify-center items-center">
                        <BackwardIcon className="h-8 w-8 text-white" onClick={ () => incrementUserCollectionStatusNftDisplay(props.status) } />
                        <ForwardIcon className="h-8 w-8 text-white" onClick={ () => incrementUserCollectionStatusNftDisplay(props.status) } />
                    </div>
                </div>
            }

        </div>
    );
}

export interface PropsUserStatus {
    userStatus: IUserStatus;
    onClickFlyTo?: () => void;
    onClickMessage?: () => void;
    onClickImage?: () => void;
}

export const UserStatus = (props: PropsUserStatus) => {

    let color: string;
    if (props.userStatus.weight !== undefined) {
        color = "border-blue-" + (props.userStatus.weight!).toString() ;
    } else {
        color = "border-stone-200";
    }
    
    return (
        <div className={` 
                px-2 py-2                
                flex flex-row justify-between items-stretch gap-2
                ${ color }
                rounded-lg
            `}
        >
            
            <div className="w-1/3 flex justify-center items-center">
                <UserStatusAvatar status={ props.userStatus } />
            </div>

            <div 
                className="pl-2 py-2 group w-2/3 flex flex-col justify-between items-start hover:bg-stone-800 rounded-lg"                 
                onClick={ props.onClickMessage }
            >
                
                <EnsProfile address={ props.userStatus.address! }/>
                
                <div className="flex flex-row items-start justify-start gap-2">
                    <div>
                        <ChatBubbleLeftIcon className="h-4 w-4"/>
                    </div>
                    <div className="text-xs text-left">
                        { props.userStatus.status }
                    </div>
                </div>

                <div className="w-full flex flew-row items-center justify-between">
                    <div className="flex flex-row items-center justify-start gap-2 text-xs">
                        <div>
                            { <PhotoIcon className="h-4 w-4"/> }
                        </div>
                        <div>
                            { `${ props.userStatus.displayNft + 1 }/${ props.userStatus.nfts.length }` }
                        </div>
                        <div>
                            <ClockIcon className="h-4 w-4"/>
                        </div>
                        <div className="text-xs">
                            { ComputeCurrentTimeDifference(Number(props.userStatus.timestamp) * 1000) }
                        </div>
                    </div>
                    {
                        ( !props.onClickFlyTo ) ? null :
                        <div className="px-2">
                            <ChatBubbleLeftRightIcon className="h-4 w-4 text-stone-200 group-hover:text-blue-400 "/>
                        </div>                        
                    }
                </div>

            </div>

        </div>
    )
}
