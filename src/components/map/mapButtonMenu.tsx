import { Fragment, useState } from "react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { Transition, Dialog } from "@headlessui/react";
import { MapButton } from "./mapButton";
import { MapButtonMenuNav } from "./mapButtonMenuNav";


export const MapButtonMenu = () => {

    let [isOpen, setIsOpen] = useState(false);
    const switchOpen = () => setIsOpen(!isOpen);

    return (
        <div>

            <MapButton
                symbol={ <Bars3Icon className="h-6 w-6 text-stone-200 hover:text-white" /> }
                onClick={ switchOpen }
            />
    
            <Transition.Root as={ Fragment } show={ isOpen } >

                <Dialog as="div" className="relative z-5" onClose={ switchOpen }>

                    <Transition.Child
                        as={Fragment}
                        enter="ease-in-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in-out duration-300"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-stone-600 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-hidden">

                        <div className="absolute inset-0 overflow-hidden">

                            <div className="pointer-events-none fixed inset-y-0 right-0 flex">

                                <Transition.Child
                                    as={Fragment}
                                    enter="transform transition ease-in-out duration-200 sm:duration-200"
                                    enterFrom="translate-x-full"
                                    enterTo="translate-x-0"
                                    leave="transform transition ease-in-out duration-200 sm:duration-200"
                                    leaveFrom="translate-x-0"
                                    leaveTo="translate-x-full"
                                >

                                    <Dialog.Panel
                                        className="
                                        w-72
                                        max-w-md
                                        transform
                                        overflow-hidden
                                        bg-stone-800
                                        text-left
                                        align-left
                                        shadow-xl
                                        "
                                    >
                                        <MapButtonMenuNav onClose={ () => switchOpen() }/>
                            
                                    </Dialog.Panel>

                                </Transition.Child>

                            </div>

                        </div>

                    </div>

                </Dialog>

            </Transition.Root>
 
        </div>
    );
}