import { ReactElement } from "react";
import { PageFooter } from "./pageFooter";
import { PageHeader } from "./pageHeader";


export const Page = (props: { main: ReactElement }) =>  {
    return (
        <div className="min-h-screen flex flex-col">

            <header className="min-w-full py-8 px-8 bg-black text-white">
                <div className="mx-auto max-w-screen-sm lg:max-w-screen-lg">
                    <PageHeader/>
                </div>
            </header>

            <main className="min-w-full flex-grow px-8 bg-black text-white">
                <div className="mx-auto max-w-screen-sm lg:max-w-screen-lg">
                    { props.main }
                </div>
            </main>

            <footer className="min-w-full py-8 px-8 bg-black text-white">
                <div className="mx-auto max-w-screen-sm md:max-w-screen-md">
                    <PageFooter/>
                </div>
            </footer>

        </div>
    );
}
