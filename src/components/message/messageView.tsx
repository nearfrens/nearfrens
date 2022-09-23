export interface IMessage {
    content: string;
    timestamp: string;
    senderAddress: string;
    recipientAddress: string;
    isUserSender: boolean;
}

export const MessageView = (props: IMessage) => {
    return (
        <div className={`            
            w-full
            flex
            ${ ( props.isUserSender ) ? "justify-end" : "justify-start" }             
            `}
        >
            <div className={`            
                px-4 p
                y-2
                flex flex-col 
                gap-1
                rounded-lg
                ${ ( props.isUserSender ) ? "justify-end" : "justify-start" } 
                ${ ( props.isUserSender ) ? "items-end" : "items-start" }
                ${ ( props.isUserSender ) ? "bg-stone-800" : "bg-stone-600" }
                `}
            >
                <div className={`
                    py-1
                    text-white 
                    text-sm 
                    ${( props.isUserSender ) ? "text-right" : "text-left" }
                    `}
                >
                    { props.content }
                </div>
                
                <div className={`
                    text-stone-400
                    text-xs
                    ${( props.isUserSender ) ? "text-right" : "text-right" } 
                    `}
                >
                    { props.timestamp }
                </div>              

            </div>
        </div>        
    );
}