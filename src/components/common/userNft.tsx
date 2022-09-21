import { QrCodeIcon, HashtagIcon, CheckBadgeIcon } from "@heroicons/react/24/outline";
import truncateEthAddress from "truncate-eth-address";
import { IUserNft } from "../../interface/user";
import { NetworkChainIcon } from "../icons/blockchainIcon";


export const UserNft = (props: { nft: IUserNft, onClick?: () => void }) => {
    return (
        <div 
            className={`
                px-2 py-2
                flex flex-col justify-start gap-2 
                border
                rounded-lg
            `}
            onClick={ props.onClick }
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

            <div className="text-xs">
                { props.nft.description }
            </div>

            <div className="flex flex-row items-center justify-between gap-2 text-xs">
                <div className="text-xs flex flex-row items-center justify-start gap-2">
                    <div>
                        <QrCodeIcon className="h-4 w-4"/>
                    </div>
                    <div className="text-xs">
                        { truncateEthAddress(props.nft.contractAddress) }
                    </div>
                    <div>
                        <HashtagIcon className="h-4 w-4"/>
                    </div>
                    <div className="text-xs">
                        {  (props.nft.tokenId.length < 32 ) ? props.nft.tokenId : props.nft.tokenId.slice(0, 10) + "..." + props.nft.tokenId.slice(-4) }
                    </div>
                </div>
                <div className="px-4">
                    { ( props.nft.active ) ? <CheckBadgeIcon className="h-6 w-6"/> : <div className="h-6 w-6"/> } 
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
                    { ( props.nft.active ) ? <CheckBadgeIcon className="h-6 w-6"/> : <div className="h-6 w-6"/> } 
                </div>
            </div>
            
        </div>
    )
}