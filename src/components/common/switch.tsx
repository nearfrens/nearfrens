import { Switch as HeadlessSwitch } from "@headlessui/react";


export default function Switch(props: {label: string, enabled: boolean, setEnabled: () => void}) {
  return (
    <HeadlessSwitch.Group>
        <div className="w-full flex items-center justify-between">
            <HeadlessSwitch.Label className="mr-4 text-sm">
                { props.label }
            </HeadlessSwitch.Label>
            <HeadlessSwitch
                checked={ props.enabled }
                onChange={ props.setEnabled }
                className={`
                    w-20
                    flex
                    ${!props.enabled ? 'bg-stone-700' : 'bg-stone-700'}
                    relative inline-flex
                    rounded-full 
                    border-2 border-transparent 
                    shrink-0
                    cursor-pointer 
                    transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75
                `}
            >
                <span
                    aria-hidden="true"
                    className={`
                        h-5 w-7
                        bg-stone-800
                        text-stone-200
                        ${props.enabled ? 'translate-x-12' : 'translate-x-0'}
                        pointer-events-none
                        transform
                        rounded-full
                        shadow-lg
                        ring-0
                        transition duration-300 ease-in-out
                    `}
                />            
            </HeadlessSwitch>
        </div>
    </HeadlessSwitch.Group>
  )
}

