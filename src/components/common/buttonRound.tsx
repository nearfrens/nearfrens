import { ReactElement, ReactEventHandler } from "react";
import { Cog8ToothIcon, MapPinIcon, UsersIcon, WalletIcon } from "@heroicons/react/24/outline";
import { useParamsStyle } from "../../hooks/useParamsStyle";


export const RoundButton = (props: { icon: ReactElement, onClick: ReactEventHandler, tooltip?: string }) => {
    const { paramsStyle } = useParamsStyle();
    return (
        <div className="group relative">
            <button
                type="button"
                className={`
                py-2 px-2            
                text-sm 
                text-stone-200 group-hover:text-white
                ${ 
                    (paramsStyle.isFun) ?
                        "bg-gradient-to-r from-pink-600/50 to-blue-600/50 hover:from-pink-600/60 hover:to-blue-600/60"
                        :
                        "bg-stone-800 bg-opacity-50 hover:bg-opacity-70"
                }
                rounded-full
                `}
                onClick={ props.onClick }
            >
                { props.icon }
            </button>
            {
                (!props.tooltip) ? null :
                <span
                    className="
                        w-32 px-3 py-3
                        bg-stone-800
                        absolute
                        bottom-16 -translate-x-1/2 left-1/2
                        rounded-lg
                        text-xs
                        text-center
                        text-white
                        hidden group-hover:flex
                        rounded-lg
                        align-top
                        object-center
                    "
                    >
                        { props.tooltip } 
                </span>            
            }
        </div>
    );
}

export const AssetButton = (props: { onClick: ReactEventHandler, tooltip?: string }) => {
    return (
        <RoundButton
            icon={ <WalletIcon className="h-8 w-8"/>}
            onClick={ props.onClick }
            tooltip={ props.tooltip }
        />
    );
}

export const FrensButton = (props: { onClick: ReactEventHandler, tooltip?: string }) => {
    return (
        <RoundButton
            icon={ <UsersIcon className="h-8 w-8"/>}
            onClick={ props.onClick }
            tooltip={ props.tooltip }
        />
    );
}

export const LocationButton = (props: { onClick: ReactEventHandler, tooltip?: string }) => {
    return (
        <RoundButton 
            icon={ <MapPinIcon className="h-10 w-10"/>} 
            onClick={ props.onClick }
            tooltip={ props.tooltip }
        />
    );
}
    
export const ParametersButton = (props: { onClick: ReactEventHandler, tooltip?: string }) => {
    return (
        <RoundButton
            icon={ <Cog8ToothIcon className="h-5 w-5"/>}
            onClick={ props.onClick }
            tooltip={ props.tooltip }
        />
    );
}
