import { QrCodeIcon, HashtagIcon, CheckBadgeIcon } from "@heroicons/react/24/outline";
import truncateEthAddress from "truncate-eth-address";
import { IUserNft } from "../../interface/user";
import { NetworkChainIcon } from "../icons/blockchainIcon";


export const UserNftImage = (props: { image: string|null }) => {
    const imageUrl = props.image;
    if (!imageUrl || imageUrl === null) {
        return null;
    } else {
        if ( imageUrl.startsWith("http")) {
            return <img src={ imageUrl } className="overflow-hidden rounded-lg" alt="User Nft"/>;
        } else {
            return <embed src={ imageUrl } className="w-full overflow-hidden rounded-lg"/>;
        }
    }
};

export const UserNft = (props: { nft: IUserNft, onClick?: () => void }) => {
    
    return (
        <div 
            className={`
                px-2 py-2
                flex flex-row justify-between gap-2
                border
                rounded-lg
                ${ props.nft.active ? "bg-stone-700" : null }
                hover:bg-stone-800
            `}
            onClick={ props.onClick }
        >

            <div className="w-1/4">
                <UserNftImage image={ props.nft.imageUrl! }/>
            </div>

            <div className="w-3/4 flex flex-col items-start justify-between">

                <div className="w-full flex flex-row items-center justify-between gap-1">
                    <h5 className="text-left">
                        { props.nft.title }
                    </h5>
                    <div className="border rounded-full py-1 px-1">
                        <NetworkChainIcon enumNetwork={ props.nft.network! }/>
                    </div>
                </div>

                <div className="text-xs truncate overflow-hidden">
                    { props.nft.description }
                </div>

                <div className="w-full flex flex-row items-center justify-between gap-2">
                    
                    <div className="flex flex-row items-center justify-start gap-2">
                        
                        <div className="flex flex-row items-center justify-start gap-1">
                            <div>
                                <QrCodeIcon className="h-4 w-4"/>
                            </div>
                            <div className="text-xs text-clip overflow-hidden">
                                {
                                    ( props.nft.contractAddress.length < 9 ) ? 
                                    props.nft.contractAddress : 
                                    props.nft.contractAddress.slice(0, 5) + "..." + props.nft.contractAddress.slice(-3)
                                }
                            </div>
                        </div>

                        <div className="flex flex-row items-center justify-start gap-1">
                            <div>
                                <HashtagIcon className="h-3 w-3"/>
                            </div>
                            <div className="text-xs">
                                {  (props.nft.tokenId.length < 9 ) ? props.nft.tokenId : props.nft.tokenId.slice(0, 3) + "..." + props.nft.tokenId.slice(-3) }
                            </div>
                        </div>

                    </div>

                    <div className="">
                        { ( props.nft.active ) ? <CheckBadgeIcon className="h-6 w-6 text-blue-400"/> : <div className="h-6 w-6"/> } 
                    </div>

                </div>

            </div>

        </div>
    )
}

export const UserNftSmall = (props: { nft: IUserNft }) => {
    return (
        <div className={`
            w-full
            px-2 py-2
            flex flex-col justify-start gap-2 
            border
            rounded-lg
            ${ props.nft.active ? "bg-stone-700" : null } 
            hover:bg-stone-700
        `}
        >

            <div className="flex flex-row items-center justify-between gap-2">
                <div className="border rounded-full py-1 px-1">
                    <NetworkChainIcon enumNetwork={ props.nft.network! }/>
                </div>
                <h5 className="w-full text-left">
                    { props.nft.title }
                </h5>
                <div className="border rounded-lg w-16 px-2 py-0.5 text-xs">
                    { props.nft.tokenType }
                </div>
            </div>

            <div className="text-xs flex flex-row items-center justify-between gap-2">
                <div className="text-xs flex flex-row items-center justify-start gap-2">
                    <div>
                        <QrCodeIcon className="h-4 w-4"/>
                    </div>
                    <div className="text-xs" onClick={() => { navigator.clipboard.writeText(props.nft.contractAddress) }}>
                        { truncateEthAddress(props.nft.contractAddress) }
                    </div>
                    <div>
                        <HashtagIcon className="h-4 w-4"/>
                    </div>
                    <div className="text-xs" onClick={() => { navigator.clipboard.writeText(props.nft.tokenId) }}>
                        {  (props.nft.tokenId.length < 32 ) ? props.nft.tokenId : props.nft.tokenId.slice(0, 10) + "..." + props.nft.tokenId.slice(-4) }
                    </div>
                </div>
                <div className="">
                    { ( props.nft.active ) ? <CheckBadgeIcon className="h-6 w-6 text-blue-400"/> : <div className="h-6 w-6"/> } 
                </div>
            </div>
            
        </div>
    )
}