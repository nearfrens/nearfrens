import { useNavigate } from "react-router-dom";

export const Button = (props: { text: string, href?: string }) => {
    const navigate = useNavigate();
    return (
        <button
            onClick={ () => navigate(props.href!) }
            className="
            px-4
            py-2
            border
            border-0
            rounded-xl
            font-poppins 
            font-bold
            text-md
            text-stone-200 hover:text-white 
            bg-gradient-to-r from-stone-700 to-stone-800 hover:to-stone-700
            "
        >
            { props.text }
        </button>
    );
}
