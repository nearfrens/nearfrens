import { ReactComponent as EthereumSvgLogo } from "../icons/svg/ethereum.svg";
import { ReactComponent as PolygonSvgLogo } from "../icons/svg/polygon.svg";


export const EthereumIcon = () => {
    return (
        <EthereumSvgLogo className="h-8 w-8" />
    );
}

export const PolygonIcon = () => {
    return(
        <PolygonSvgLogo className="h-8 w-8" />
    );
}
