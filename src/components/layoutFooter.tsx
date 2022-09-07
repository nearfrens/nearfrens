import { ReactElement } from "react";
import { FaDiscord, FaGithub, FaTelegram, FaTwitter } from "react-icons/fa";

const FooterItem = (props: { name: string, href: string, symbol?: ReactElement }) => {
    return (
        <a href={ props.href}>
            <div className="flex flex-row items-center justify-start font-poppins text-stone-500 gap-2 hover:text-stone-200">
                <div className="text-xl">
                    { props.symbol }
                </div>
                <div className="text-md">
                    { props.name }
                </div>
            </div>
        </a>
    );
}

export const LayoutFooter = () =>  {
    return (

            <div className="flex flex-row items-center justify-between">
                
                <div className="text-sm text-stone-200 font-poppins">
                    Copyright © 2022 WagMeet
                </div>

                <div className="flex flex-row items-center justify-between gap-8">

                    <FooterItem 
                        name=""
                        href=""
                        symbol={ <FaTwitter/> }
                    />

                    <FooterItem 
                        name=""
                        href=""
                        symbol={ <FaTelegram/> }
                    />                

                    <FooterItem 
                        name=""
                        href=""
                        symbol={ <FaDiscord/> }
                    />

                    <FooterItem 
                        name=""
                        href="https://github.com/wagmeet"
                        symbol={ <FaGithub/> }
                    />

                </div>

            </div>     
    );
}
