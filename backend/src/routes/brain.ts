import {Router} from 'express'
import {Link, Content, User} from ".././db";
const router = Router();

import { random } from '../utils';
import { userMiddleware } from '../middleware';

//@ts-ignore
router.post("/share", userMiddleware, async (req, res) => {
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
router.get("/:sharelink", userMiddleware, async (req, res) => {
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
    })

    if(!content){
        return res.status(411).json({
            message : "Content not found"
        })
    }

    const user = await User.findById({
        _id : link.userId
    }).select("name")

    return res.json({
        user : user,
        content : content
    })
})

export default router;