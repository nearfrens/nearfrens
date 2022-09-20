import { ReactEventHandler } from "react";

export interface PropsInput {
    label: string;
    placeholder: string;
    type: string;
    value: any;
    disabled?: boolean|undefined;
}

export interface IMapInput {
    placeholder?: string,
    title?: string,
    titleSize?: string,
    textSize?: string,
    textPosition?: string,
    value: any,
    onChange?: ReactEventHandler,
}

export const Input = (props: PropsInput) => {
    return (
        <div className="
            py-1
            flex flex-row justify-start gap-2
            text-white
            text-md 
            bg-transparent
            "
        >
            <label className="w-24">
                { props.label }
            </label>
            <input
                type={ props.type }
                placeholder={ props.placeholder }
                value={ props.value }
                disabled={ props.disabled }
                className="bg-transparent text-right"
            />
        </div>
    )
}

export const MapInput = (props: IMapInput) => {
    return (
        <div className="w-full flex flex-col justify-start items-start">
            <div className={`
                ${ props.titleSize ? props.textSize  : "text-md"}
                `}
            >
                { props.title }
            </div>
            <div className="w-full py-1 px-2 border border-stone-200 rounded-lg font-poppins">
                <input
                    className={`                
                    w-full
                    bg-transparent 
                    border-transparent 
                    text-white hover:text-white focus:text-white
                    placeholder-stone-200
                    outline-0
                    ${ props.textSize? props.textSize : "" } 
                    ${ props.textPosition? props.textPosition : "" }
                    `}
                    value={ props.value }
                    onChange={ props.onChange }
                    placeholder={ props.placeholder } 
                />
            </div>
        </div>
    )
}
