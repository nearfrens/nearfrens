import { ReactElement } from "react";
import { ReactComponent as EthereumIcon } from "../icons/ethereum.svg";
import { ReactComponent as OptimismIcon } from "../icons/optimism.svg";
import { ReactComponent as PolygonIcon } from "../icons/polygon.svg";


const BlockChainIcon = (props: {logo: ReactElement, legend: string}) => {
    return (
        <div>
            <div className="flex flex-col items-center justify-center gap-2">
                <div className="bg-stone-900 rounded-xl px-6 py-6 hover:bg-stone-800">
                    { props.logo }
                </div>
                <p className="text-sm font-poppins text-stone-200 font-bold"> 
                    { props.legend }
                </p>
            </div>
        </div>
    );
}

export const BannerForBlockchains = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center align-middle">

                <h2 className="text-left text-3xl  font-poppins">
                    Meet Multi-chain.
                </h2>

                <p className="mt-5 text-left text-lg font-poppins">
                    Continiously adding support for the most in-demand chains.
                </p>
                
                <div className="mt-20 flex flex-row items-center justify-center gap-16">

                    <BlockChainIcon 
                        logo={ <EthereumIcon className="w-20 h-20"/> }
                        legend="Coming soon"
                    />

                    <BlockChainIcon 
                        logo={ <OptimismIcon className="w-20 h-20"/> }
                        legend="Coming soon"
                    />

                    <BlockChainIcon 
                        logo={ <PolygonIcon className="w-20 h-20"/> }
                        legend="Coming soon"
                    />                    

                </div>

        </div>

    );
}
