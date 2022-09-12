import { ReactEventHandler} from "react";
import { MinusIcon, PlusIcon, } from "@heroicons/react/24/outline";


export const MapButtonZoomInOut = (props: { onClickZoomIn: ReactEventHandler, onClickZoomOut: ReactEventHandler }) => {
    return (
        <div className="flex flex-col items-center justify-between rounded-lg bg-stone-800 divide-y divide-stone-600 divide-y-[0.2px] opacity-90">
            <button className="px-2 py-3 text-stone-200 hover:text-white" onClick={ props.onClickZoomIn }>
                <PlusIcon className="h-4 w-4" />
            </button>
            <button className="px-3 py-3 text-stone-200 hover:text-white" onClick={ props.onClickZoomOut }>
                <MinusIcon className="h-4 w-4" />
            </button>
        </div>
    )
}
