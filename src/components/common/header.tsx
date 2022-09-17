import { useNavigate } from "react-router-dom";
import { Button } from "./button";
import { PublicIconForNearFrensWithText } from "../icons/publicIcon";

export const Header = () =>  {
    const navigate = useNavigate();
    return (
        <div className="flex flex-row items-center justify-between"> 
            <PublicIconForNearFrensWithText/>
            <div className="w-32">
                <Button text="Go to Map" onClick={() => { navigate("/")}}/>
            </div>
        </div> 
    );
}
