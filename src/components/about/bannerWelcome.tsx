export const BannerWelcome = () => {
    return (
        <div className="my-24">
            <h1 className="
                py-10
                text-left 
                text-4xl
                text-transparent
                font-bold
                font-poppins
                bg-clip-text
                bg-gradient-to-r from-stone-400 via-stone-100 to-stone-200
                "
            >
                Welcome to NearFrens
            </h1>

            <div className="pt-10">
                
                <div>
                    <p className="
                        text-left
                        text-4xl
                        text-stone-200
                        font-poppins
                        "
                    >
                        The decentralized map that brings crypto natives and communities together.
                    </p>
                </div>

                <div>
                    <p className="
                        pt-16
                        italic 
                        text-left 
                        text-2xl 
                        text-stone-200 
                        font-poppins 
                        "
                    >
                        We are All Gonna Meet!
                    </p>
                    <p className="
                        text-left 
                        text-sm 
                        text-stone-200 
                        font-poppins
                        "
                    >
                        Built by the community for community.
                    </p>
                </div>

            </div>
        </div>
    );
}