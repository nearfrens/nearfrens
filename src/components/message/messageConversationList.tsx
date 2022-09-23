import { useAccount } from "wagmi";
import useConversation from "../../hooks/useConversation";
import { MessageView } from "./messageView";


export interface PropsMessageList {
    peerAddress: string;
    messageOnError?: string; 
    messageOnLoading?: string;
}

export const MessageConversationList = (props: PropsMessageList) => {

    const { address } = useAccount();
    const { loading, messages, error } = useConversation(props.peerAddress);

    if (!props.messageOnError) 

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