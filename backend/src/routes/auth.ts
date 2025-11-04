import {Router} from 'express'

import { JWT_PASSWORD } from "../config";
import {User} from ".././db";
import jwt from "jsonwebtoken";

const router = Router();

//@ts-ignore
app.post("/api/v1/signup", async (req, res) =>{
    const {username, password} =  req.body;

    try{
        const user = await User.findOne({username : username});
        if(user){
            return res.status(403).json({
                message : "Username already exists"
            })
        }

        await User.create({
            username : username,
            password : password
        });
        
        res.status(200).json({
            message : "User created successfully"
        })

    }
    catch(e){
        res.status(500).json({
            message : "Server Error!"
        })
    }
})

//@ts-ignore
app.post("/api/v1/signin", async (req, res) =>{
    const {username, password} = req.body;
    try{
        const user = await User.findOne({
            username : username,
            password : password
        })
        if(!user){
            return res.status(403).json({
                message : "Wrong email/password!"
            });
        }
        
        const token = jwt.sign({
            id : user._id
        }, JWT_PASSWORD);
        
        res.json({token});
    }
    catch(e){
        res.status(500).json({
            message : "Server Error!"
        });
    }
})

export default router;