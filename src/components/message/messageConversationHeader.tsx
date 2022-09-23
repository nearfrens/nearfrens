import { ChatBubbleLeftIcon } from "@heroicons/react/24/outline";
import { IUserStatus } from "../../interface/user"
import { UserStatusAvatar } from "../common/userStatus";
import { EnsProfile } from "../identity/ensProfile";


export interface PropsMessageConversationHeader {
    status: IUserStatus;
}

export const MessageConversationHeader = (props: PropsMessageConversationHeader) => {

    return (
        <div className="py-3 px-3 flex flex-row justify-start items-center gap-4 bg-stone-700">

            <div className="w-12 h-12 rounded-full overflow-hidden">
                <UserStatusAvatar status={ props.status }/>                
            </div>

            <div className="flex flex-col justify-between items-start gap-1">
                
                <EnsProfile address={ props.status.address! } size="medium"/>

                <div className="flex flex-row items-center justify-start gap-2">
                    <div>
                        <ChatBubbleLeftIcon className="w-4 h-4"/>
                    </div>
                    <div className="text-xs text-stone-200">
                        { props.status.status }
                    </div>
                </div>

            </div>
        
        </div>
    )
}