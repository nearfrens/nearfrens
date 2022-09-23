import { ChatBubbleLeftIcon } from "@heroicons/react/24/outline";
import truncateEthAddress from "truncate-eth-address";
import { useEnsName, useNetwork } from "wagmi";
import { IUserStatus } from "../../interface/user"
import { UserNftImage } from "../common/userNft";
import { ReactComponent as EnsLogo } from "../icons/svg/ens.svg";


export interface PropsMessageConversationHeader {
    status: IUserStatus;
}

export const MessageConversationHeader = (props: PropsMessageConversationHeader) => {

    const { chains } = useNetwork();
    const ensName = useEnsName({ 
        address: props.status.address!, 
        cacheTime: 10_000, 
        chainId: chains[0].id }
    );

    const title = (ensName.data) ? ensName.data : truncateEthAddress(props.status.address!.toString()) ;
    const ensLogo = (ensName.data) ? <EnsLogo className="h-4 w-4" /> : null ;

    return (
        <div className="py-3 px-3 flex flex-row justify-start items-center gap-4 bg-stone-700">

            <div className="w-12 h-12 rounded-full overflow-hidden">
                <UserNftImage image={ props.status.nfts[0].imageUrl! }/>
            </div>

            <div className="flex flex-col justify-between items-start gap-1">
                
                <div className="flex flex-row justify-start items-center gap-2">
                    <div>
                        { ensLogo }
                    </div>
                    <div className="text-normal">
                        { title }
                    </div>
                </div>

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