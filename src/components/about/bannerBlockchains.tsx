import { ReactComponent as ArbitrumLogo } from "../icons/svg/arbitrum.svg";
import { ReactComponent as EthereumIcon } from "../icons/svg/ethereum.svg";
import { ReactComponent as OptimismIcon } from "../icons/svg/optimism.svg";
import { ReactComponent as PolygonIcon } from "../icons/svg/polygon.svg";
import { BannerIcon } from "./bannerIcon";


export const BannerBlockchains = () => {
    return (
        <div className="my-16 flex flex-col items-center justify-center align-middle">

                <h2 className="text-left text-3xl  font-poppins">
                    Meet Multi-chain.
                </h2>

                <p className="mt-5 text-left text-lg font-poppins">
                    Continiously adding support for the most in-demand chains.
                </p>
                
                <div className="mt-20 flex flex-row items-center justify-center gap-8">

                    <BannerIcon 
                        logo={ <EthereumIcon className="w-20 h-20"/> }
                        href="https://ethereum.org"
                        name="Ethereum"
                        legend="Live"
                    />

                    <BannerIcon 
                        logo={ <PolygonIcon className="w-20 h-20 text-purple-500"/> }
                        href="https://polygon.technology/"
                        name="Polygon"
                        legend="Live"
                    />       

                    <BannerIcon 
                        logo={ <OptimismIcon className="w-20 h-20 text-red-500"/> }
                        href="https://www.optimism.io/"
                        name="Optimism"
                        legend="Coming soon"
                    />

                    <BannerIcon 
                        logo={ <ArbitrumLogo className="w-20 h-20"/> }
                        href="https://arbitrum.io/"
                        name="Arbitrum"
                        legend="Coming soon"
                    />
             
                </div>

        </div>

    );
}
