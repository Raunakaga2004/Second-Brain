import { useRef } from "react";
import {Input} from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const SignIn = () => {
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const navigate = useNavigate();

    interface SignInResponse {
        token : string
    }

    const submitHandler = async () => {
        await axios.post<SignInResponse>(`${BACKEND_URL}/auth/signin`, {
            username : usernameRef.current?.value,
            password : passwordRef.current?.value
        }).then((res)=>{
            localStorage.setItem('token', res.data.token);

            navigate("/");
        })
    }

    return <div className="h-screen w-screen flex justify-center items-center">
        <div className="flex flex-col gap-4 border py-6 px-6 rounded-lg bg-slate-100 border-slate-300">

            <div className="text-[var(--primary)] text-lg font-semibold">
                Welcome Back
            </div>

            <Input placeholder="Username" reference={usernameRef}/>
            <Input placeholder="Password" reference={passwordRef}/>
            <Button variant="primary" size="md" text="Submit" onClick={submitHandler}/>
        </div>
    </div>
}