import { ReactComponent as EthereumSvgLogo } from "../icons/svg/ethereum.svg";
import { ReactComponent as PolygonSvgLogo } from "../icons/svg/polygon.svg";
import { ReactComponent as OptimismSvgLogo } from "../icons/svg/optimism.svg";
import { useNetwork } from "wagmi";

export const EthereumIcon = () => {
    return (
        <EthereumSvgLogo className="h-9 w-9" />
    );
}

export const PolygonIcon = () => {
    return(
        <div className="bg-purple-500 h-11 w-11 flex items-center justify-center rounded-full">
            <PolygonSvgLogo className="h-9 w-9 text-white" />
        </div>
    );
}

export const OptimismIcon = () => {
    return(
        <OptimismSvgLogo className="h-9 w-9 text-red-500" />
    );
}

export const CurrentChainIcon = () => {
    const { chain } = useNetwork();
    if (chain?.name === "Goerli") return <EthereumIcon/>;
    if (chain?.name === "Ethereum") return <EthereumIcon/>;
    if (chain?.name === "Polygon") return <PolygonIcon/>;
    if (chain?.name === "Polygon Mumbai") return <PolygonIcon/>;
    if (chain?.name === "Optimism") return <OptimismIcon />;
    if (chain?.name === "Optimism Goerli") return <OptimismIcon />;
    return null;
}
