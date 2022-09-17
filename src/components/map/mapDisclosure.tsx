import { ReactElement } from "react";
import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/24/outline";


export function MapDisclosure(props: {title: string, content: ReactElement}) {
    return (
        <div className="w-full">
            <div className="w-full rounded-lg bg-transparent">
                <Disclosure>
                    {({ open }) => (
                        <>
                            <Disclosure.Button 
                                className="
                                    w-full h-9
                                    flex justify-between items-center
                                    rounded-lg 
                                    bg-stone-800
                                    px-4
                                    text-left 
                                    text-sm
                                    font-medium 
                                    text-stone-200 hover:text-white
                                    focus:outline-none 
                                    focus-visible:ring 
                                    focus-visible:ring-purple-500 
                                    focus-visible:ring-opacity-75
                                    "
                            >
                                <span>
                                    { props.title }
                                </span>
                                <ChevronUpIcon
                                    className={`${
                                        !open ? 'rotate-180 transform' : ''
                                        } h-5 w-5 text-stone-200`
                                    }
                                />
                            </Disclosure.Button>
                            <Disclosure.Panel className="pt-2 pb-2">
                                <div>
                                    { props.content }
                                </div>
                            </Disclosure.Panel>
                        </>
                    )}
                </Disclosure>
            </div>
        </div>
    );
}