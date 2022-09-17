import { ReactElement, ReactEventHandler } from "react";


export const MapButton = (props: { symbol: ReactElement, onClick?: ReactEventHandler }) => {
    return (
        <button onClick={ props.onClick } className="ml-2 px-2 py-1.5 bg-stone-800 rounded-lg font-bold text-stone-200 hover:text-white">
            { props.symbol }
        </button>
    )
}
