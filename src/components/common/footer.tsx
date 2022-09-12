import { PublicIconForDiscord, PublicIconForGithub, PublicIconForTelegram, PublicIconForTwitter } from "../icons/publicIcon";


export const Footer = () =>  {
    return (

            <div className="flex flex-row items-center justify-between">
                
                <div className="text-sm text-stone-200 font-poppins">
                    Copyright © 2022 NearFrens
                </div>

                <div className="flex flex-row items-center justify-between gap-8">
                    <PublicIconForDiscord />
                    <PublicIconForGithub />
                    <PublicIconForTelegram />
                    <PublicIconForTwitter />
                </div>

            </div>     
    );
}
