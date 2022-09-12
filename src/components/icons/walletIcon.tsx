import { ReactComponent as CoinBaseWalletSvgLogo } from "../icons/svg/coinbase.svg";
import { ReactComponent as MetaMaskSvgLogo } from "../icons/svg/metamask.svg";
import { ReactComponent as WalletConnect } from "../icons/svg/walletconnect.svg";


export const CoinbaseWalletIcon = () => {
    return (
        <CoinBaseWalletSvgLogo className="h-8 w-8" />
    );
}

export const MetaMaskIcon = () => {
    return(
        <MetaMaskSvgLogo className="h-8 w-8" />
    );
}

export const WalletConnectIcon = () => {
    return (
        <WalletConnect className="h-8 w-8" />
    );
}


