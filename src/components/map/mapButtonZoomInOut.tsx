import { MinusIcon, PlusIcon, } from "@heroicons/react/24/outline";
import { useMapZoom } from "../../hooks/useMapZoom";


export const MapButtonZoomInOut = () => {

    const [mapZoom, setMapZoom] = useMapZoom();

    return (
        <div className="
            flex flex-col items-center justify-between 
            rounded-lg 
            bg-stone-800
            bg-opacity-40 hover:bg-opacity-50
            divide-y divide-stone-600 divide-y-[0.2px]
            "
        >
            
            <button 
                className="px-2 py-3 text-stone-200 hover:text-white" 
                onClick={ () => setMapZoom(mapZoom + 1) }
                type="button"
            >
                <PlusIcon className="h-4 w-4" />
            </button>

            <button 
                className="px-3 py-3 text-stone-200 hover:text-white" 
                onClick={ () => setMapZoom(mapZoom - 1) }
                type="button"
            >
                <MinusIcon className="h-4 w-4" />
            </button>
            
        </div>
    )
}
