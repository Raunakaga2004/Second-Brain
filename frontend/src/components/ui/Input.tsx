interface inputProps {
    placeholder : string;
    reference : any
}

export const Input = (props : inputProps) => {
    return <input className="border border-slate-300 p-1 rounded-sm text-sm w-72 focus:border-blue-500 focus:outline-none" placeholder={props.placeholder} ref={props.reference} type="text"/>
}