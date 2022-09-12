import { Button } from "./button";
import { PublicIconForNearFrensWithText } from "../icons/publicIcon";


export const Header = () =>  {
    return (
        <div className="flex flex-row items-center justify-between"> 
            <PublicIconForNearFrensWithText/>                  
            <Button text="Go to Map" href="/"/>
        </div> 
    );
}
