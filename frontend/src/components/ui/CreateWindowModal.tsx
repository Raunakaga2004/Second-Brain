import { useRef } from "react"
import { CloseIcon } from "../../assets/icons/CloseIcon"
import { Button } from "./Button"
import { Input } from "./Input"
import { useSetRecoilState } from "recoil"
import { modalwindowRecoil } from "../../store/atom"

import axios from "axios"
import { BACKEND_URL } from "../../config"

export const CreateWindowModal = () => {
    const titleRef = useRef<HTMLInputElement>(null);
    const linkRef = useRef<HTMLInputElement>(null);

    const setModalWindow = useSetRecoilState(modalwindowRecoil);

    const submitHandler = async ()=>{

        const linkValue = linkRef.current?.value?.toLowerCase() || "";

        const linkType = linkValue.includes("youtube.com") ? 
            "youtube" : 
            linkValue.includes("x.com") ? 
            "x" : "";

        console.log(linkRef.current?.value)

        if(linkType === ""){
            alert("Link must be from youtube or x.")
            return
        }

        await axios.post(`${BACKEND_URL}/content`, 
            {
            title : titleRef.current?.value,
            link : linkRef.current?.value,
            type : linkType
        }, 
        {
            headers : {
                Authorization : `${localStorage.getItem('token')}`,
            }
        }
    ).then(()=>{
            setModalWindow(false);
            alert("Content added!");
        })
    }

    const modelCloseIconHandler = ()=>{
        setModalWindow(false);
    }

    return <div>
        <div className="w-screen h-screen fixed top-0 left-0 bg-slate-300/60 flex justify-center items-center">
            <div className="absolute bg-white p-4 rounded-md border border-slate-400 border-1">
                <span className="bg-white">
                    <div className="hover:text-red-600  flex justify-end pb-2" onClick={modelCloseIconHandler}>
                        <CloseIcon size="md"/>
                    </div>
                    <div className="flex flex-col justify-center items-center gap-2">
                        <Input placeholder="Title" reference={titleRef}/>
                        <Input placeholder="Link" reference={linkRef}/>

                        <Button variant="primary" text="Submit" size="md" onClick={submitHandler}/>
                    </div>
                </span>
            </div>
        </div>
    </div>
}