import { ReactComponent as Logo } from "../icons/wagmeet.svg";


const CustomButtom = (props: { text: string }) => {
    return (
        <button className="
            px-4
            py-2
            border
            border-0
            rounded-xl
            font-poppins 
            font-bold
            text-md
            text-stone-200 hover:text-white 
            bg-gradient-to-r from-sky-600 to-teal-500"
        >
            { props.text }
        </button>
    );
}

export const LayoutHeader = () =>  {
    return (
        <div className="flex flex-row items-center justify-between"> 
            
            <div className="flex flex-row items-center justify-start gap-4 group">
                <div className="
                    text-stone-200 group-hover:text-white
                ">
                    <Logo className="h-5 w-5"/>
                </div>
                <div className="
                    text-xl 
                    text-stone-200 group-hover:text-white
                    font-poppins
                ">
                    WagMeet
                </div>
            </div>
            
            <div className="flex flex-row items-center justify-between gap-10">
                
                <CustomButtom text="Connect"/>
                
            </div>

        </div> 
    );
}
