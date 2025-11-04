import { useRecoilState, useRecoilValue } from "recoil"
import { AddIcon } from "../../assets/icons/AddIcon"
import { ShareIcon } from "../../assets/icons/ShareIcon"
import { Button } from "./Button"
import { Card } from "./Card"

import { modalwindowRecoil, reloadRecoil } from "../../store/atom"

import type { cardProps } from "./Card"
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../../config"

import axios from "axios"

export const MainContent = () => {
    const [contents, setContents] = useState<cardProps[]>([]);
    const [modalWindow, setModalWindow] = useRecoilState(modalwindowRecoil);

    const reloadRecoilVal = useRecoilValue(reloadRecoil);

    useEffect(()=>{
        async function fetch(){
            await axios.get<cardProps[]>(`${BACKEND_URL}/content`, {
                headers : {
                    Authorization : localStorage.getItem('token')
                }
            }).then((res)=>{
                //@ts-ignore
                setContents(res.data.content);
            }).catch((e)=>{
                console.log(e);
            })
        }

        fetch();
    }, [modalWindow, reloadRecoilVal])

    const addContentHandler = async () => {
        setModalWindow(true);
    }

    interface responseType  {
        hash : String
    }

    const shareBrainHandler = async () => {
        const res = await axios.post<responseType>(`${BACKEND_URL}/brain/share`,{
            share : true
        }, {
            headers : {
                Authorization : localStorage.getItem('token')
            }
        })
        
        console.log(res);
        alert(`http://localhost:5173/share?hash=${res.data.hash}`);
    }

    return <div className="pl-82 p-10 min-h-screen bg-slate-100">
        <div className="flex justify-between items-center">
            <div className="font-semibold text-3xl">All Notes</div>
            <div className="flex gap-2">
                <Button variant="secondary" text="Share Brain" startIcon={<ShareIcon size="sm"/>} size="md" onClick={shareBrainHandler}/>
                <Button variant="primary" text="Add Content" startIcon={<AddIcon size="sm"/>} size="md" onClick={addContentHandler}/>
            </div>
        </div>
        <div className="p-2 pt-10 flex flex-row flex-wrap gap-4">
            {contents?.map((content) => {
                return <Card title={content.title} type={content.type} link={content.link} key={content._id} _id={content._id}/>
            })}
        </div>
    </div>
}