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
            
            <div>
                WM WagMeet
            </div>
            
            <div className="flex flex-row items-center justify-between gap-10">
                
                <CustomButtom text="Connect"/>
                
            </div>

        </div> 
    );
}
