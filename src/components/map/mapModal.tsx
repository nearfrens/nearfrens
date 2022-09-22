import { Dialog, Transition } from '@headlessui/react'
import { Fragment, ReactElement } from 'react'


interface PropsMapModal {
    content: ReactElement;
    isOpen: boolean|undefined;
    openModal: VoidFunction;
    closeModal: VoidFunction;
}

export const MapModalTitle = (props: {title: string}) => {
    return (<h3> { props.title } </h3>);
}

export const MapModalSubTitle = (props: {subTitle: string}) => {
    return (<h4 className="pb-1"> { props.subTitle } </h4>);
}

export const MapModal = (props: PropsMapModal) => {
    return (    
        <Transition appear show={ props.isOpen } as={ Fragment }>

            <Dialog as="div" className="relative z-10" onClose={ props.closeModal }>

                <Transition.Child
                    as={ Fragment }
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-stone-600 bg-opacity-90" />
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
                                    w-96
                                    transform
                                    overflow-hidden
                                    rounded-xl
                                    bg-stone-800
                                    bg-opacity-60
                                    text-left
                                    align-middle
                                    shadow-xl
                                    transition-all
                                    "
                            >
                                { props.content }
                            </Dialog.Panel>                        
                        </Transition.Child>
                    </div>
                </div>

            </Dialog>

        </Transition>
    )
}