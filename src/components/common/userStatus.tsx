import { ClockIcon, ChatBubbleLeftIcon, ChatBubbleLeftRightIcon, PhotoIcon } from "@heroicons/react/24/outline";
import { BackwardIcon, ForwardIcon  } from "@heroicons/react/24/outline";
import { IUserStatus } from "../../interface/user";
import { ComputeCurrentTimeDifference } from "../../utils/computeTimeDifference";
import { UserNftImage } from "./userNft";
import { useUserCollectionStatus } from "../../hooks/useUserCollectionStatus";
import { EnsProfile } from "../identity/ensProfile";
import { XmtpContext } from '../../context/xmtp';
import { useContext } from "react";


export interface PropsUserStatusAvatar {
    status: IUserStatus;
}


export const UserStatusAvatar = (props: PropsUserStatusAvatar) => {
    const { incrementUserCollectionStatusNftDisplay } = useUserCollectionStatus();
    return (
        <div className="
            relative 
            overflow-hidden 
            rounded-lg                     
            group
            transition 
            ease-in-out
            delay-20
            duration-200
            hover:-translate-y-0.5
            hover:-translate-x-0.5
            hover:scale-105
            "
        >
            
            <UserNftImage image={ props.status.nfts[props.status.displayNft].imageUrl! }/>            
            
            {
                ( props.status.nfts.length <= 1) ? null :
                <div className="absolute top-1/2 left-1/2 z-10 -translate-x-1/2 translate-y-2/4">                
                    <div className="hidden group-hover:flex flex-row justify-center items-center gap-4">
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

    const { convoMessages } = useContext(XmtpContext);
    const numberOfMessages = convoMessages.get(props.userStatus.address!)?.length;

    return (
        <div className={` 
                px-3 
                py-3
                flex flex-row justify-between items-stretch gap-4
                ${ color }
                rounded-lg
                hover:bg-stone-700
                hover:shadow-2xl
            `}
        >
            
            <div className="w-1/3 flex justify-center items-center">
                <UserStatusAvatar status={ props.userStatus } />
            </div>

            <div 
                className="
                    pl-2 py-2
                    group
                    w-2/3
                    flex flex-col justify-between items-start
                    hover:bg-stone-800 rounded-lg
                    transition 
                    ease-in-out 
                    delay-20
                    duration-200
                    hover:scale-105
                    hover:-translate-y-0.5
                    hover:translate-x-0.5
                    "
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

                <div className="flex flex-row items-start justify-start gap-2">
                    <div>
                        <ClockIcon className="h-4 w-4"/>
                    </div>
                    <div className="text-xs">
                        { ComputeCurrentTimeDifference(Number(props.userStatus.timestamp) * 1000) }
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
                    </div>
                    {
                        ( !props.onClickFlyTo ) ? null :
                        <div className="px-2 flex flex-row justify-start items-center gap-1">
                            <div className="text-xs group-hover:text-blue-400">
                                { (numberOfMessages) ? numberOfMessages : null }
                            </div>
                            <ChatBubbleLeftRightIcon className="h-4 w-4 text-stone-200 group-hover:text-blue-400 "/>
                        </div>                        
                    }
                </div>
            
            </div>

        </div>
    )
}
