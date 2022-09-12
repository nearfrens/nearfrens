import { ReactElement } from "react";


export const Page = (props: { header: ReactElement, main: ReactElement, footer: ReactElement }) =>  {
    return (
        <div className="flex flex-col">

            <header className="min-w-full py-8 px-8 bg-black text-white">
                <div className="mx-auto max-w-screen-sm md:max-w-screen-md">
                    { props.header }
                </div>
            </header>

            <main className="min-w-full flex-grow px-8 bg-black text-white">
                <div className="mx-auto max-w-screen-sm md:max-w-screen-md">                    
                    { props.main }                    
                </div>
            </main>

            <footer className="min-w-full py-8 px-8 bg-black text-white">
                <div className="mx-auto max-w-screen-sm md:max-w-screen-md">
                    
                    <div className="relative pb-10">
                        <div className="absolute inset-0 flex items-center" aria-hidden="true">
                            <div className="w-full border-t border-stone-600" />
                        </div>
                    </div>

                    { props.footer }
                    
                </div>
            </footer>

        </div>
    );
}
