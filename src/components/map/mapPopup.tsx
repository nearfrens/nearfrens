import { Popup } from "react-map-gl";
import { UserNft } from "../common/userNft";
import { UserStatus } from "../common/userStatus";
import { IUserStatus } from "../../interface/user";

interface IMapPopup {
    status: IUserStatus;
    closePopup: () => void;
}

export const MapPopup = (props: IMapPopup) => {
    console.log(props.status.nfts[0]);
    return (
        <Popup
            longitude={ props.status.longitude }
            latitude={ props.status.latitude }
            onClose={ props.closePopup }
            closeButton={ true }
            closeOnClick={ false }
            anchor="top"
            className="bg-black"
            maxWidth="none"
            style={{
                "background": "none",
                "backgroundColor": "none",
            }}
        >
            <div className="w-72">
                {
                    ( !props.status.nfts ) ?
                    <UserStatus userStatus={ props.status } /> :
                    <UserNft nft={ props.status.nfts[0] }/>
                }
            </div>
        </Popup>
    )
}