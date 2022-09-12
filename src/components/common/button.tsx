import { ReactEventHandler } from "react";

export const Button = (props: { text: string, onClick?: ReactEventHandler }) => {
    return (
        <button
            onClick={ props.onClick }
            className="
            px-3
            py-1.5
            border
            border-0
            rounded-lg
            font-poppins 
            font-bold
            text-md
            text-stone-200 hover:text-white 
            bg-gradient-to-r from-stone-700 to-stone-800 hover:to-stone-700
            "
            type="button"
        >
            { props.text }
        </button>
    );
}
