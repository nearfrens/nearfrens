import { ReactElement, ReactEventHandler } from "react";

interface IButton {
    text: string|ReactElement|null;
    icon?: ReactElement|null; 
    onClick?: ReactEventHandler;
    disabled?: boolean|undefined;
}

export const Button = (props: IButton) => {
    return (
        <button
            className="
            w-full            
            flex flex-row items-center justify-center
            px-3
            h-9            
            border
            border-0
            rounded-lg
            font-poppins 
            font-bold
            text-md
            text-stone-200 hover:text-white
            bg-stone-800 hover:bg-stone-black
            group
            "
            onClick={ props.onClick }
            type={ "button" }
            disabled={ props.disabled }
        >
            <div className="flex flex-row items-center justify-center">
                <div className="group-hover:text-white">
                    { props.icon }
                </div>
                {
                    ( !props.disabled ) ?
                        <div className="group-hover:text-white">
                            { props.text }
                        </div> :
                        <div className="text-stone-500 group-hover:text-white">
                            { props.text }
                        </div>

                }
            </div>
        </button>
    );
}
