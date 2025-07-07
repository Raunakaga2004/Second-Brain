import { useRef } from "react";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import axios from "axios";

import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

export const SignUp = () => {
    const navigate = useNavigate();
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const submitHandler = async ()=>{
        await axios.post(`${BACKEND_URL}/api/v1/signup`, {
            username : usernameRef.current?.value,
            password : passwordRef.current?.value
        }).then(()=>{
            navigate("/signin");
        });
    }

    return <div className="h-screen w-screen flex justify-center items-center">
        <div className="flex flex-col gap-4 border py-6 px-6 rounded-lg bg-slate-100 border-slate-300">

            <div className="text-xl text-[var(--primary)] font-semibold">Create Your Account</div>

            <Input placeholder="Username" reference={usernameRef}/>
            <Input placeholder="Password" reference={passwordRef}/>
            <Button variant="primary" size="md" text="Submit" onClick={submitHandler}/>
        </div>
    </div>
}