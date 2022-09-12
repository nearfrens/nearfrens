import { Dispatch } from "react";

export enum OptionMapStyles {
    STREET = "mapbox://styles/mapbox/streets-v11",
    LIGHT = "mapbox://styles/mapbox/light-v10",
    DARK = "mapbox://styles/mapbox/dark-v10",
}

export const MapButtonMapStyleChoice = (props: { onClick: Dispatch<string> }) => {
    return (
        <div>
            <div className="                    
                grid grid-cols-3
                bg-stone-800
                divide-x-[0.5px] 
                divide-stone-200
                rounded-lg
                text-stone-200
                text-center
                text-sm
                font-poppins
                "
            >
                <button 
                    className="px-4 py-2 hover:text-white"
                    onClick={ () => props.onClick( OptionMapStyles.STREET )} 
                >
                    Street
                </button>

                <button 
                    className="px-4 py-2 hover:text-white"
                    onClick={ () => props.onClick( OptionMapStyles.LIGHT )} 
                >
                    Light
                </button>

                <button 
                    className="px-4 py-2 hover:text-white"
                    onClick={ () => props.onClick( OptionMapStyles.DARK )} 
                >
                    Dark
                </button>                
            </div>
        </div>
    );
}
