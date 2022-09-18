import { ReactElement, ReactEventHandler } from "react";
import { BookmarkIcon, Cog8ToothIcon, MapPinIcon } from "@heroicons/react/24/outline";


export const RoundButton = (props: { icon: ReactElement, onClick: ReactEventHandler }) => {
    return (
        <button
            type="button"
            className="
            py-2 px-2
            text-sm 
            text-stone-100 hover:text-white
            bg-gradient-to-r from-pink-600/50 to-blue-600/50 hover:from-pink-600/60 hover:to-blue-600/60
            bg-opacity-50 hover:bg-opacity-60
            rounded-full
            "
            onClick={ props.onClick }
        >
            { props.icon }
        </button>
    );
}

export const BookmarkButton = (props: { onClick: ReactEventHandler }) => {
    return (
        <RoundButton 
            icon={ <BookmarkIcon className="h-7 w-7"/>} 
            onClick={ props.onClick } 
        />
    );
}

export const ParametersButton = (props: { onClick: ReactEventHandler }) => {
    return (
        <RoundButton 
            icon={ <Cog8ToothIcon className="h-8 w-8"/>} 
            onClick={ props.onClick } 
        />
    );
}

export const MapPinButton = (props: { onClick: ReactEventHandler }) => {
    return (
        <RoundButton 
            icon={ <MapPinIcon className="h-8 w-8"/>} 
            onClick={ props.onClick } 
        />
    );
}
