import {Router} from 'express'
import {Content} from ".././db";

import { userMiddleware } from '../middleware';

const router = Router();
//@ts-ignore
router.post("/", userMiddleware, async (req, res) => {
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
router.get("/", userMiddleware, async (req, res) => {
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
router.delete("/", userMiddleware, async (req, res) => {
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

export default router;