import { ReactElement, ReactEventHandler } from "react";
import { WalletIcon } from "@heroicons/react/24/outline";


export const MapButton = (props: { symbol: ReactElement, onClick?: ReactEventHandler }) => {
    return (
        <button onClick={ props.onClick } className="px-3 py-3 bg-stone-800 rounded-lg font-bold text-stone-200 hover:text-white opacity-90">
            { props.symbol }
        </button>
    )
}

export const MapButtonWallet = () => {
    return (
        <MapButton
            symbol={ <WalletIcon className="h-6 w-6 text-stone-200 hover:text-white bg-red" /> }
        />
    )
}
