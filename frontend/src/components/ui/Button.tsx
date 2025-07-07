import type { ReactElement } from "react";

interface ButtonProps {
    variant : "primary" | "secondary";
    size : "sm" | "md" | "lg";
    text : string;
    startIcon? : ReactElement; //any is not the correct choice. 'ReactElement' is the best choice
    endIcon? : ReactElement;
    onClick? : () => void;
}

const backgroundVariant = {
    "primary" : "bg-[var(--primary)] text-white",
    "secondary" : "bg-[var(--secondary)] text-white"
}

const sizeVariant = {
    "sm" : "px-2 py-1 text-xs rounded-xl",
    "md" : "px-4 py-2 text-sm rounded-md",
    "lg" : "px-8 py-4 text-lg rounded-lg",
}

const defaultStyling = "border border-0 flex gap-2 items-center justify-center"

export const Button = (props : ButtonProps) => {

    //option 1 : using nested if else

    return <button className={`${backgroundVariant[props.variant]} ${sizeVariant[props.size]} ${defaultStyling}`} onClick={props.onClick}>
        {props.startIcon}
        {props.text}
        {props.endIcon}
    </button>
}
