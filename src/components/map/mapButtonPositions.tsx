import { useState } from "react"
import { MapModal, MapModalTitle } from "./mapModal";
import { BookmarkButton } from "../common/buttonRound";
import { Button } from "../common/button";
import { UserStatus } from "../common/userStatus";
import { useUserStatus } from "../../hooks/useUserStatus";


export const Positions = (props: { onClick: () => void } ) => {
    const [ userStatus,,,fetchUserStatus ] = useUserStatus();
    return (
        <div className="w-full px-6 py-2 flex flex-col justify-start">            
            <MapModalTitle title="What happened"/>                        
            <div className="h-64 w-full flex flex-col items-strech justify-start gap-2 overflow-y-auto">
                { userStatus.map((item, key) => <UserStatus key={key} userStatus={item}/>) }
            </div>
            <div className="mt-4 mb-4 flex justify-center gap-2">
                <Button text="Refresh" onClick = { () => fetchUserStatus() } />
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
