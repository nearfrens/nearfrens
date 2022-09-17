import { useState } from "react"
import { ParametersButton } from "./mapButtonRound";
import { MapModal, MapModalSubTitle, MapModalTitle } from "./mapModal";
import { useMapZoom } from "../../hooks/mapZoom";
import { useMapStyle } from "../../hooks/mapStyle";
import { useMapCoordWindow } from "../../hooks/mapCoordWindow";
import { OptionMapStyles } from "../../interface/map";
import { Button } from "../common/button";
import { Table, TableLineWithTwoColumn } from "../common/table";


export const Parameters = (props: { onClick: () => void } ) => {

    const [ mapZoom ] = useMapZoom();
    const [ mapCoordWindow ] = useMapCoordWindow();
    const [ , setMapStyle] = useMapStyle();

    return (
        <div className="w-full px-6 py-2 flex flex-col justify-start gap-2">

            <MapModalTitle title="Parameters"/>

            <MapModalSubTitle subTitle="Choose Map style"/>

            <div className="w-full flex flex-row items-stretch justify-between gap-2">
                <Button
                    text="Street"
                    onClick={ () => setMapStyle({ style: OptionMapStyles.STREET })} 
                /> 
                <Button 
                    text="Light"
                    onClick={ () => setMapStyle({ style: OptionMapStyles.LIGHT })} 
                /> 
                <Button 
                    text="Dark"
                    onClick={ () => setMapStyle({ style: OptionMapStyles.DARK })} 
                />                               
            </div>

            <MapModalSubTitle subTitle="Map parameters"/>

            <Table
                lines = {
                    [
                        <TableLineWithTwoColumn                            
                            label="Zoom"
                            value={ mapZoom.toFixed(6).toString() }
                        />,
                        <TableLineWithTwoColumn
                            label="Window longitude"
                            value={ mapCoordWindow.longitude.toFixed(6).toString() }
                        />,
                        <TableLineWithTwoColumn
                            label="Window latitude"
                            value={ mapCoordWindow.latitude.toFixed(6).toString() }
                        />
                    ]
                }
            />

            <div className="mt-4 mb-4 flex justify-center">
                <Button text={ "Close" } onClick = { props.onClick }/>
            </div>

        </div>
    );
}


export const MapButtonParameters = () => {
    const [isOpen, setIsOpen] = useState(false);
    const content = <Parameters onClick= { () => setIsOpen(false) } />
    return (
        <div>
            <ParametersButton
                onClick={ () => setIsOpen(true) }
            />
            <MapModal
                content={ content } 
                isOpen={ isOpen }
                openModal={ () => setIsOpen(true) }
                closeModal={ () => setIsOpen(false) } 
            />
        </div>
    );
}
