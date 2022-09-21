import { useState } from "react"
import { MapModal, MapModalTitle } from "./mapModal";
import { BookmarkButton } from "../common/buttonRound";
import { Button } from "../common/button";
import { UserStatus } from "../common/userStatus";
import { useUserCollectionStatus } from "../../hooks/useUserCollectionStatus";


export const Positions = (props: { onClick: () => void } ) => {
    const { userCollectionStatus, resetUserCollectionStatus, fetchUserCollectionStatus }= useUserCollectionStatus();
    return (
        <div className="w-full px-6 py-2 flex flex-col justify-start">            
            <MapModalTitle title="What happened"/>                        
            <div className="h-64 w-full flex flex-col items-strech justify-start gap-2 overflow-y-auto">
                { userCollectionStatus.map((item, key) => <UserStatus key={key} userStatus={item}/>) }
            </div>
            <div className="mt-4 mb-4 flex justify-center gap-2">
                <Button text="Refresh" onClick = { () => {resetUserCollectionStatus(); fetchUserCollectionStatus()} } />
                <Button text="Close" onClick = { props.onClick }/>
            </div>
        </div>
    );
}


export const MapButtonPositions = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div>
            <BookmarkButton
                onClick={ () => setIsOpen(true) }
            />
            <MapModal
                content={ <Positions onClick={ () => setIsOpen(false) } /> }
                isOpen={ isOpen }
                openModal={ () => setIsOpen(true) }
                closeModal={ () => setIsOpen(false) }
            />
        </div>
    )
}
