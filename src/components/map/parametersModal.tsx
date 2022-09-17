import { Dialog, Transition } from '@headlessui/react'
import React, { Fragment, useState } from 'react'

export const ParametersModal = (props: { onClick?: React.DispatchWithoutAction }) => {
    
    let [isOpen, setIsOpen] = useState(false);

    function closeModal() {
        setIsOpen(false);
    }
    
    function openModal() {
        setIsOpen(true)
    }

    return (
        <>

            <div className="flex items-center justify-center">
                <button
                    type="button"
                    onClick={ openModal }
                    className="rounded-md bg-stone-800 bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                >
                    Parameters
                </button>
            </div>
    
            <Transition appear show={ isOpen } as={ Fragment }>

                <Dialog as="div" className="relative z-10" onClose={ closeModal }>

                    <Transition.Child
                        as={ Fragment }
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-stone-600 bg-opacity-25" />
                    </Transition.Child>
    
                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel
                                    className="
                                        w-full 
                                        max-w-md 
                                        transform 
                                        overflow-hidden 
                                        rounded-xl 
                                        bg-stone-800 
                                        p-6
                                        text-left
                                        align-middle 
                                        shadow-xl 
                                        transition-all
                                        "
                                >
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg leading-6 text-stone-200"
                                    >
                                        Parameters
                                    </Dialog.Title>
                                    
                                    <div className="mt-2">

                                        <p className="text-sm text-stone-200">
                                            Your payment has been successfully submitted. We’ve sent
                                            you an email with all of the details of your order.
                                        </p>

                                    </div>
    
                                    <div className="mt-4">
                                        <button
                                            className="
                                            px-3
                                            h-9
                                            flex items-center justify-center 
                                            rounded-md
                                            bg-stone-600
                                            text-md
                                            font-poppins
                                            text-stone-200 hover:text-white
                                            "
                                            onClick={closeModal}
                                            type="button"
                                        >
                                            Got it, thanks!
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}