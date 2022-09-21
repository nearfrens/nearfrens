import { Popup } from "react-map-gl";
import { UserNftSmall } from "../common/userNft";
import { UserStatus } from "../common/userStatus";
import { IUserStatus } from "../../interface/user";

interface IMapPopup {
    status: IUserStatus;
    closePopup: () => void;
}

export const MapPopup = (props: IMapPopup) => {
    return (
        <Popup
            longitude={ props.status.longitude }
            latitude={ props.status.latitude }
            onClose={ props.closePopup }
            closeButton={ true }
            closeOnClick={ false }
            anchor="top"
            className="max-w-64 bg-black"
            maxWidth="none"
            style={{
                "background": "none",
                "backgroundColor": "none",
            }}
        >
            <div className="w-64">
                {
                    ( !props.status.nfts ) ?
                    <UserStatus userStatus={ props.status } /> :
                    <UserNftSmall nft={ props.status.nfts[0] }/>
                }
            </div>
        </Popup>
    )
}