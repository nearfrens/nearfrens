import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";
import { useContext } from "react";
import { useAccount, useSigner } from "wagmi";
import { XmtpContext } from "../../context/xmtp";
import useConversation from "../../hooks/useConversation";
import { Button } from "../common/button";
import { MessageView } from "./messageView";


export interface PropsMessageList {
    peerAddress: string;
    messageOnError?: string; 
    messageOnLoading?: string;
}

export const MessageConversationList = (props: PropsMessageList) => {

    const { address } = useAccount();
    const { loading, messages, error } = useConversation(props.peerAddress);
    
    const { client, initClient } = useContext(XmtpContext);
    const { data: signer } = useSigner();

    if ( !client ) {
        return (
            <div className="h-72 flex justify-center items-center">

                <div className="flex flex-col justify-center items-center gap-2">

                    <div className="w-fit px-2 py-2 hover:text-white">
                        <Button 
                            icon={ <div className="pr-2"> <ArrowRightOnRectangleIcon className="w-6 h-6 group-hover:text-white" /> </div> }
                            text={ "XMTP Login" }
                            onClick={ () => initClient(signer!) } 
                        />
                    </div>

                </div>

            </div>
        )
    }
    
    if (error) {
        return (
            <div className="h-72 flex justify-center items-center">
                {
                    ( props.messageOnError ) ? 
                    props.messageOnError :
                    "Your Fren has no XMTP account yet!"
                }
            </div>
        );
    }

    if (loading) {
        return (
            <div className="h-72 flex justify-center items-center">
                {
                    ( props.messageOnLoading ) ? 
                    props.messageOnLoading :                    
                    "Wait a bit OG"
                }
            </div>
        )
    }

    return (
        <div className="
            px-3 py-2
            h-72 
            flex flex-col-reverse justify-start items-start gap-4 
            overflow-y-auto
            "
        >
            { messages.slice(0).reverse().map((item, key) => (
                <MessageView 
                    key={ key }
                    content={ item.content }
                    senderAddress={ item.senderAddress?.toString()! } 
                    recipientAddress={ item.recipientAddress?.toString()! }
                    timestamp={ item.sent?.toLocaleTimeString()! }
                    isUserSender={ address === item.senderAddress?.toString()! }
                />)
            )}
        </div>        
    )
}