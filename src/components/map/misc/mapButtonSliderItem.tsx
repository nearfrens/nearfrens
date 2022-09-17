import { ReactEventHandler, ReactElement } from "react";


export const MapButtonSliderItem = (props: {name: string, symbol?: ReactElement, onClick?: ReactEventHandler}) => {
    return (
        <div className="min-w-max py-3 px-4 flex flex-row items-center justify-start text-md text-stone-200 hover:text-white bg-stone-800 gap-4">
            <div>
                { props.symbol }
            </div>
            <div>
                { props.name }
            </div>
        </div>
    )
}
