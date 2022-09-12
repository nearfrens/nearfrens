import { ReactElement } from "react";
import { FaDiscord, FaGithub, FaTelegram, FaTwitter } from "react-icons/fa";
import { ReactComponent as NearFrensSvg } from "./svg/nearfrens.svg";


const PublicIcon = (props: { name: string, href?: string | null, symbol?: ReactElement }) => {
    if ( props.href ) {
        return (
            <a href={ props.href } target="_blank" rel="noopener noreferrer">
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
    } else {
        return (
            <div className="flex flex-row items-center justify-start font-poppins text-stone-500 gap-2 hover:text-stone-200">
                <div className="text-xl">
                    { props.symbol }
                </div>
                <div className="text-md">
                    { props.name }
                </div>
            </div>
        );
    }
}

export const PublicIconForDiscord = () => {
    return (
        <PublicIcon
            name=""
            href=""
            symbol={ <FaDiscord className="h-5 w-5"/> }
        />
    );
}

export const PublicIconForGithub = () => {
    return (
        <PublicIcon
            name=""
            href="https://github.com/wagmeet"
            symbol={ <FaGithub className="h-5 w-5"/> }
        />
    );
}

export const PublicIconForTelegram = () => {
    return (
        <PublicIcon
            name=""
            href=""
            symbol={ <FaTelegram className="h-5 w-5"/> }
        />
    );
}

export const PublicIconForTwitter = () => {
    return (
        <PublicIcon
            name=""
            href=""
            symbol={ <FaTwitter className="h-5 w-5"/> }
        />
    );
}

export const PublicIconForNearFrens = () => {
    return (
        <PublicIcon
            name=""
            href={ null }
            symbol={ <NearFrensSvg className="h-8 w-8 text-stone-200 hover:text-white" /> }
        />
    )
}

export const PublicIconForNearFrensWithText = () => {
    return (
        <div className="flex flex-row items-center justify-start gap-2 group">
            <div className="
                text-stone-200 group-hover:text-white
                "
            >
                <PublicIconForNearFrens />
            </div>
            <div className="
                text-xl 
                text-stone-200 group-hover:text-white
                font-poppins
                "
            >
                NearFrens
            </div>
        </div>
    );
}
