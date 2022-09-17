import { ReactEventHandler } from "react";
import { UserIcon } from "@heroicons/react/24/outline";

import { HorizontalLine } from "../../common/horizontalLine";
import { CoinbaseWalletIcon, MetaMaskIcon, WalletConnectIcon } from "../../icons/walletIcon";

import { MapButtonSliderItem } from "./mapButtonSliderItem";
import { MapButtonSliderTitle } from "./mapButtonSliderTitle";


export const MapButtonWalletNav = (props: { onClose?: ReactEventHandler }) => {
    return (
        <div className="min-h-full flex flex-col items-stretch justify-start pointer-events-auto">

            <MapButtonSliderTitle logo={ <UserIcon className="h-6 w-6" /> } title="Profile" onClose={ props.onClose }/>

            <HorizontalLine />

            <p className="mx-4 mt-8 mb-4 text-stone-200 text-sm">
                If you don't have a wallet yet, you can select a provider and create one now.
            </p>

            <div className="overflow-hidden mx-4 my-4 flex flex-col items-stretch justify-start divide-y-[0.2px] divide-stone-600 border border-stone-600 border-1 rounded-lg">
                
                <div className="py-3">
                    <MapButtonSliderItem 
                        symbol={ <MetaMaskIcon /> }
                        name="MetaMask"
                    />
                </div>

                <div className="py-3">
                    <MapButtonSliderItem 
                        symbol={ <WalletConnectIcon /> }
                        name="WalletConnect"
                    />
                </div>

                <div className="py-3">
                    <MapButtonSliderItem
                        symbol={ <CoinbaseWalletIcon /> }
                        name="Coinbase Wallet"
                    />                
                </div>

            </div>

        </div>
    );
}