import { Popup } from "react-map-gl";
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
            className="bg-black"
            maxWidth="none"
            style={{
                "background": "none",
                "backgroundColor": "none",
            }}
        >
            <div className="w-72">
                {
                    <UserStatus userStatus={ props.status } />
                }
            </div>
        </Popup>
    )
}