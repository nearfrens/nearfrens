export const Log = (props: { msg: string, level?: string,  }) => { 
    if (props.level === "info") {
        return (
            <div className="h-8 py-1 flex items-center justify-center rounded-lg w-full text-purple-300 border border-purple-300 text-xs italic"> 
                { props.msg }
            </div>
        );
    } else if (props.level === "warning") {
        return (
            <div className="h-8 py-1 flex items-center justify-center rounded-lg w-full text-orange-300 border border-orange-300 text-xs italic">
                { props.msg }
            </div>
        );        
    } else if (props.level === "error") {
        return (
            <div className="h-8 py-1 flex items-center justify-center rounded-lg w-full text-red-400 border border-red-400 text-xs italic"> 
                { props.msg }
            </div>
        );
    } else if (props.level === "success") {
        return (
            <div className="h-8 py-1 flex items-center justify-center rounded-lg w-full text-green-400 border border-green-400 text-xs italic"> 
                { props.msg }
            </div>
        );                
    } else {
        return (
            <div className="h-8 py-1 flex items-center justify-center rounded-lg w-full text-stone-200 border border-stone-200 text-xs italic"> 
                { props.msg }
            </div>
        );
    }
}
