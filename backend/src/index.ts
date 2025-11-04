import  express, {Request, Response} from "express";

import cors from "cors"
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

import { JWT_PASSWORD } from "./config";
import {User, Content, Link} from "./db";
import { userMiddleware } from "./middleware";
import { random } from "./utils";

import authRouter from './routes/auth'

const app = express();

app.use(cors());

const PORT = 3000;

app.use(express.json());
app.use('/api/v1/auth', authRouter)

//@ts-ignore
app.post("/api/v1/content", userMiddleware, async (req, res) => {
    const {type, link, title} = req.body;

    try{
        await Content.create({
            type,
            link,
            title,
            //@ts-ignore
            userId : req.userId,
            tags : []
        });

        res.status(200).json({
            message : "Content Added!"
        });

    } catch(e){
        res.status(500).json(e);
    }
})

//@ts-ignore
app.get("/api/v1/content", userMiddleware, async (req, res) => {
    //@ts-ignore
    const userId = req.userId;

    const content = await Content.find({
        userId : userId
    }).populate("userId" /* populate the foreign key userId*/, "username" /* and select only username property */);

    return res.json({
        content
    })
})

//@ts-ignore
app.delete("/api/v1/content", userMiddleware, async (req, res) => {
    const contentId = req.query.id
    await Content.deleteMany({
        _id : contentId,
        //@ts-ignore
        userId : req.userId
    })

    return res.json({
        message : "Content Deleted"
    })
})

//@ts-ignore
app.post("/api/v1/brain/share", userMiddleware, async (req, res) => {
    const share = req.body.share;
    if(share) {
        const existingLink = await Link.findOne({
            //@ts-ignore
            userId : req.userId
        });

        if(existingLink){
            return res.json({
                hash : existingLink.hash
            })
        }

        const hash = random(10);
        await Link.create({
            //@ts-ignore
            userId : req.userId,
            hash : hash
        })

        res.json({
            hash : hash
        })
    }
    else{
        await Link.deleteOne({
            //@ts-ignore
            userId : req.userId
        });

        return res.json({
            message : "Link deleted"
        })
    }
})

//@ts-ignore
app.get("/api/v1/brain/:sharelink", userMiddleware, async (req, res) => {
    const hash =  req.params.sharelink;
    const link = await Link.findOne({
        hash : hash
    });

    if(!link){
        return res.status(411).json({
            message : "Link not found"
        })
    }

    const content = await Content.find({
        userId : link.userId
    }).populate("userId", "username");

    if(!content){
        return res.status(411).json({
            message : "Content not found"
        })
    }

    return res.json({
        content
    })
})

const DATABASE_URI = "mongodb+srv://root:12022004@cluster0.emubo4v.mongodb.net/";

app.listen(PORT);

mongoose.connect(DATABASE_URI).then(()=>{
    console.log("Connected to MongoDB");
}).catch((e)=>{
    console.error(e);
});