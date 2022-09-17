import { MapParameters } from "../mapInterface";

const MapDisplayTableLine = (props: { name: string, value: string } ) => {
    return (
        <tr>
            <td className="px-2">
                { props.name }
            </td>
            <td className="px-2">
                { props.value }
            </td>
        </tr>
    );
}

export const MapDisplayTable = (props: { params: MapParameters }) => {
    const precision: number = 10;
    return (
        <div 
            className="
            text-xs
            text-left 
            text-stone-200
            bg-stone-800
            rounded-lg
            font-poppins
            "
        >
            <table className="mx-2 my-2">
                <thead className="my-1">
                    <tr>
                        <th className="px-2">
                            Parameter
                        </th>
                        <th className="px-2">
                            Value
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <MapDisplayTableLine 
                        name="Map Lat."
                        value={ props.params.mapCoord.latitude.toFixed(precision) }
                    />
                    <MapDisplayTableLine 
                        name="Map Lng."
                        value={ props.params.mapCoord.longitude.toFixed(precision) }
                    />
                    <MapDisplayTableLine 
                        name="Mouse Lat."
                        value={ props.params.mouseCoord.latitude.toFixed(precision) }
                    />
                    <MapDisplayTableLine 
                        name="Mouse Lng."
                        value={ props.params.mouseCoord.longitude.toFixed(precision) }
                    />
                    <MapDisplayTableLine 
                        name="Zoom"
                        value={ props.params.mapZoom.toFixed(precision) }
                    />      
                </tbody>
            </table>
        </div>
    );
}
