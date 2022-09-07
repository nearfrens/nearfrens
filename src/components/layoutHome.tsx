export const LayoutHome = () => {
    return (
        <div className="flex flex-col">

            <h1 className="
                py-10
                text-left 
                text-4xl
                text-transparent
                font-bold
                font-poppins
                bg-clip-text
                bg-gradient-to-r from-sky-500 via-teal-500 to-purple-500
                "
            >
                Welcome to WagMeet!
            </h1>

            <div className="pt-10">
                <p className="
                    text-left
                    text-4xl
                    text-stone-200
                    font-poppins
                    "
                >
                    The decentralized map that brings crypto natives and communities together.
                </p>

                <p className="text-left text-lg text-stone-200 font-poppins pt-10">
                    Built by the community for community.
                </p>

                <p className="text-left text-2xl text-stone-200 font-poppins italic pt-16">
                    W're All Gonne Meet!
                </p>
            </div>


        </div>
    );
}