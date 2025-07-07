import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom"
import { BACKEND_URL } from "../config";

import type { cardProps } from "../components/ui/Card";
import { Card } from "../components/ui/Card";

import axios from "axios";
import { SideBar } from "../components/ui/SideBar";

export const Share = ()=>{
    const [searchParams] = useSearchParams();
    const hash = searchParams.get('hash');

    interface contentsType { 
        content : cardProps[]
    }

    const [contents, setContents] = useState<contentsType>();
    const [username, setUsername] = useState("");

    useEffect(()=>{
        async function fetch(){
            const res =  await axios.get<contentsType>(`${BACKEND_URL}/api/v1/brain/${hash}`, {
                headers : {
                    Authorization : localStorage.getItem("token")
                }
            })

            console.log(res);
            setContents(res.data);
            setUsername(res.data.content[0].userId?.username || "");
        }

        fetch();
    }, []);

    return <div className="h-full w-full">
        <SideBar/>
        <div className="ml-72 p-4 pt-10">
            <div className="font-semibold text-3xl">
                Shared Brain of {username}
            </div>
            <div className="p-2 pt-10 flex flex-row flex-wrap gap-4">
                {contents?.content?.map((content) => {
                    return <Card title={content.title} type={content.type} link={content.link} key={content._id} _id={content._id}/>
                })}
            </div>
        </div>
    </div>
}