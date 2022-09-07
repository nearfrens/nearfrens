import { BannerForBlockchains } from "./bannerForBlockchains";
import { BannerForCommunities } from "./bannerForCommunities";
import { BannerWelcome } from "./bannerWelcome";
import { HorizontalLine } from "./horizontalLine";


export const LayoutHome = () => {
    return (
        <div className="flex flex-col">
            <BannerWelcome/>
            <HorizontalLine/>
            <BannerForBlockchains/>
            <HorizontalLine/>
            <BannerForCommunities/>
        </div>
    );
}