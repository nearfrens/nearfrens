import { ReactElement, ReactEventHandler } from "react";
import { BookmarkIcon, Cog8ToothIcon, MapPinIcon } from "@heroicons/react/24/outline";


export const RoundButton = (props: { icon: ReactElement, onClick: ReactEventHandler }) => {
    return (
        <button
            type="button"
            className="
            py-2 px-2
            text-sm 
            text-stone-200 hover:text-white
            bg-stone-800 bg-opacity-40 hover:bg-opacity-50
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
