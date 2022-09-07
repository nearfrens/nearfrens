import { ReactComponent as ArbitrumLogo } from "../icons/arbitrum.svg";
import { ReactComponent as EthereumIcon } from "../icons/ethereum.svg";
import { ReactComponent as OptimismIcon } from "../icons/optimism.svg";
import { ReactComponent as PolygonIcon } from "../icons/polygon.svg";
import { BannerIcon } from "./bannerIcon";


export const BannerForBlockchains = () => {
    return (
        <div className="my-24 flex flex-col items-center justify-center align-middle">

                <h2 className="text-left text-3xl  font-poppins">
                    Meet Multi-chain.
                </h2>

                <p className="mt-5 text-left text-lg font-poppins">
                    Continiously adding support for the most in-demand chains.
                </p>
                
                <div className="mt-20 flex flex-row items-center justify-center gap-16">

                    <BannerIcon 
                        logo={ <EthereumIcon className="w-20 h-20"/> }
                        href="https://ethereum.org"
                        name="Ethereum"
                        legend="Coming soon"
                    />

                    <BannerIcon 
                        logo={ <PolygonIcon className="w-20 h-20 text-purple-500"/> }
                        href="https://polygon.technology/"
                        name="Polygon"
                        legend="Coming soon"
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
