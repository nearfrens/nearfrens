import { Dialog } from "@headlessui/react";
import { ReactElement, ReactEventHandler } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";


export const MapButtonSliderTitle = (props: { title: string, logo?: ReactElement, onClose?: ReactEventHandler }) => {
    return (
        <Dialog.Title as="div">            
            <div className="flex flex-row items-center justify-between">                
                <div className="min-w-max py-6 px-4 flex flex-row items-center justify-start text-lg text-stone-200 hover:text-white bg-stone-800 gap-4">                    
                    <div className="">
                        { props.logo }
                    </div>
                    <h1>
                        { props.title }
                    </h1>
                </div>
                <button onClick={ props.onClose } className="px-4">
                    <XMarkIcon className="h-6 w-6 text-stone-200 hover:text-white"/>
                </button>
            </div>
        </Dialog.Title>
    );
}