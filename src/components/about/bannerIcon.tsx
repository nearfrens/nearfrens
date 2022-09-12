import { ReactElement } from "react";


export const BannerIcon = (props: {logo: ReactElement, name: string, legend: string, href: string}) => {
    return (
        <a href={ props.href } target="_blank" rel="noopener noreferrer">

            <div className="
                flex flex-col items-center justify-center gap-2 
                group"
            >
                
                <div className="
                    px-6 pt-6 pb-3
                    bg-stone-900 hover:bg-stone-800
                    flex flex-col items-center justify-between gap-5 
                    rounded-xl 
                    "
                >

                    <div>
                        { props.logo }
                    </div>

                    <div className="
                        text-sm 
                        text-stone-200 group-hover:text-white
                        font-poppins font-bold 
                        "
                    >
                        { props.name }
                    </div>

                    <div className="
                        text-xs 
                        text-stone-600 group-hover:text-stone-200
                        font-poppins
                        font-bold italic 
                        "
                    > 
                        { props.legend }
                    </div>

                </div>

            </div>

        </a>
    );
}
