import { BannerIcon } from "./bannerIcon";
import { ReactComponent as EnsIcon } from "../icons/svg/ens.svg";
import { ReactComponent as LensIcon } from "../icons/svg/lens.svg";
import { ReactComponent as PoapIcon } from "../icons/svg/poap.svg";


export const BannerCommunities = () => {
    return (
        <div className="my-24 flex flex-col items-center justify-center align-middle">

                <h2 className="text-left text-3xl font-poppins">
                    Meet nearby frens and community members
                </h2>

                <p className="mt-5 text-left text-lg font-poppins">
                    Community missing ? Tell us which we should add
                </p>
                
                <div className="mt-20 flex flex-row items-center justify-center gap-16">

                    <BannerIcon 
                        logo={ <EnsIcon className="w-24 h-24"/> }
                        href="https://ens.domains/"
                        name="Ens"
                        legend="Coming soon"
                    />

                    <BannerIcon 
                        logo={ <LensIcon className="w-24 h-24 text-green-600"/> }
                        href="https://lens.xyz/"
                        name="Lens Protocol"
                        legend="Coming soon"
                    />

                    <BannerIcon 
                        logo={ <PoapIcon className="w-24 h-24 text-green-600"/> }
                        href="https://poap.xyz/"
                        name="Poap"
                        legend="Coming soon"
                    />

                </div>

        </div>        
    );
}
