import { ReactElement } from "react";
import { LayoutFooter } from "./layoutFooter";
import { LayoutHeader } from "./layoutHeader";


export const Page = (props: { main: ReactElement }) =>  {
    return (
        <div className="min-h-screen flex flex-col">

            <header className="min-w-full py-8 px-8 bg-black text-white">
                <div className="mx-auto max-w-screen-sm md:max-w-screen-md">
                    <LayoutHeader/>
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

                    <LayoutFooter/>
                </div>
            </footer>

        </div>
    );
}
