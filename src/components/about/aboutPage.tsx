import { Header } from "../common/header";
import { Footer } from "../common/footer";
import { Page } from "../common/page"
import { HorizontalLine } from "../common/horizontalLine";

import { BannerWelcome } from "./bannerWelcome";
import { BannerBlockchains } from "./bannerBlockchains";
import { BannerCommunities } from "./bannerCommunities";


const AboutMain = () => {
    return (
        <div className="flex flex-col">
            <BannerWelcome/>
            <HorizontalLine/>
            <BannerBlockchains/>
            <HorizontalLine/>
            <BannerCommunities/>
        </div>
    );
}

export const AboutPage = () => {
    return (
        <Page
            header={ <Header /> }
            main={ <AboutMain /> }
            footer={ <Footer /> }
        />
    )
}