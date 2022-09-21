import { useState } from "react"
import { MapModal, MapModalTitle } from "./mapModal";
import { UserProfilButton } from "../common/buttonRound";
import { Button } from "../common/button";
import { useUserNfts } from "../../hooks/useUserNfts";
import { UserNft } from "../common/userNft";


export const Profil = (props: { onClick: () => void } ) => {
    const { userNfts, fetchUserNfts, switchUserNfts } = useUserNfts();
    return (
        <div className="w-full px-6 py-2 flex flex-col justify-start">
            <MapModalTitle title="User profil"/>
            <div className="h-80 w-full flex flex-col items-strech justify-start gap-2 overflow-y-auto">
                { userNfts.map((item, index) => <UserNft nft={ item } key={ index } onClick={() => switchUserNfts(item)}/>) }
            </div>
            <div className="mt-4 mb-4 flex justify-center gap-2">
                <Button text="Refresh" onClick = { () => fetchUserNfts() } />
                <Button text="Close" onClick = { props.onClick } />
            </div>
        </div>
    );
}

export const MapButtonProfil = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div>
            <UserProfilButton
                onClick={ () => setIsOpen(true) }
            />
            <MapModal
                content={ <Profil onClick={ () => setIsOpen(false) } /> }
                isOpen={ isOpen }
                openModal={ () => setIsOpen(true) }
                closeModal={ () => setIsOpen(false) }
            />
        </div>
    )
}
