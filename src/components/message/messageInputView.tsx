import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import React, { Dispatch, useState } from "react";


export interface PropsMessageInputView {
    sendMessage: Dispatch<string>;
}

export const MessageInputView = (props: PropsMessageInputView) => {
    
    const [message, setMessage] = useState<string>("");

    function handleKeyDown (event: React.KeyboardEvent<HTMLInputElement>) {
        if (!message || message === "") return;        
        if (event.key === "Enter") {
            props.sendMessage(message);
            setMessage("");
        }
    }

    function handleClickButton () {
        if (message !== "") {
            props.sendMessage(message);
            setMessage("");
        }
    }

    return (
        <div className="w-full flex flex-row justify-between items-center px-3 py-3 bg-stone-700">
            <div className="
                w-full 
                py-2 px-3
                flex justify-center
                border border-stone-200 
                rounded-lg 
                bg-stone-600
                "
            >
                <input
                    className="
                        w-full
                        bg-transparent
                        border-transparent
                        text-stone-200 hover:text-white focus:text-white
                        placeholder-stone-200
                        outline-0
                        text-sm
                        text-left
                        "
                    placeholder="Type message and click enter to send"
                    value={ message }
                    onChange={ (event) => setMessage(event.target.value) }
                    onKeyDown={ (event) => handleKeyDown(event) }             
                />
            </div>
            <button className="w-10 flex justify-center" onClick={ handleClickButton }>
                {
                    (message.length > 0) ?
                    <PaperAirplaneIcon className="w-6 h-6 px-1 py-1 text-white rounded-full bg-blue-400"/> :
                    <PaperAirplaneIcon className="w-6 h-6 px-1 py-1 text-stone-200"/>
                }
            </button>
        </div>
    );
}