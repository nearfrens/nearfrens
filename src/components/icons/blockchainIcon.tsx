import { ReactComponent as EthereumSvgLogo } from "../icons/svg/ethereum.svg";
import { ReactComponent as PolygonSvgLogo } from "../icons/svg/polygon.svg";
import { ReactComponent as OptimismSvgLogo } from "../icons/svg/optimism.svg";
import { useNetwork } from "wagmi";
import { EnumNetwork } from "../../interface/network";

export const EthereumIcon = () => {
    return <EthereumSvgLogo className="h-9 w-9" />;
}

export const PolygonIcon = () => {
    return <PolygonSvgLogo className="h-9 w-9 text-purple-500"/>;
}

export const OptimismIcon = () => {
    return <OptimismSvgLogo className="h-9 w-9 text-red-500" />;
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

export const NetworkChainIcon = (props: { enumNetwork: EnumNetwork }) => {
    if (props.enumNetwork === EnumNetwork.EthereumGoerli || props.enumNetwork === EnumNetwork.EthereumMainet) return <EthereumSvgLogo className="h-3 w-3" />;
    if (props.enumNetwork === EnumNetwork.PolygonMumbai || props.enumNetwork === EnumNetwork.PolygonMainet) return <PolygonSvgLogo className="h-3 w-3 text-purple-500" />;
    if (props.enumNetwork === EnumNetwork.OptimismGoerli || props.enumNetwork === EnumNetwork.OptimismMainet) return <OptimismSvgLogo className="h-3 w-3 text-red-500" />;
    return null;
}
