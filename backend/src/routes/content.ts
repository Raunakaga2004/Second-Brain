import {Router} from 'express'
import {Content} from ".././db";

import { userMiddleware } from '../middleware';

const router = Router();
//@ts-ignore
router.post("/", userMiddleware, async (req, res) => {
    const {link, title, description, type} = req.body;

    // Validation
    if (!title) {
      return res.status(400).json({ message: "Title is required." });
    }

    try{
        await Content.create({
            link,
            title,
            description : description || "",
            type : type,
            //@ts-ignore
            userId : req.userId,
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
    try{
        //@ts-ignore
        const userId = req.userId;

        const content = await Content.find({
            userId : userId
        })
            .populate("userId", "name")
            .populate("tags", "title")
            .sort({createdAt : - 1});

        return res.json({
            content
        })
    }catch(e){
        res.status(500).json(e);
        
    }
})

//@ts-ignore
router.delete("/", userMiddleware, async (req, res) => {
    try{
        const contentId = req.query.id
        await Content.deleteMany({
            _id : contentId,
            //@ts-ignore
            userId : req.userId
        })

        return res.json({
            message : "Content Deleted"
        })
    }
    catch(e){
        res.status(500).json(e)
    }
})

//@ts-ignore
router.put("/:id", userMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, link, tags, type } = req.body;
    //@ts-ignore
    const userId = req.userId;

    // Basic validation
    if (!id) {
      return res.status(400).json({ message: "Content ID is required." });
    }

    // Find the content
    const content = await Content.findOne({ _id: id, userId });

    if (!content) {
      return res.status(404).json({ message: "Content not found or unauthorized." });
    }

    // Apply updates
    if (title !== undefined) content.title = title;
    if (description !== undefined) content.description = description;
    if (link !== undefined) content.link = link;
    if (tags !== undefined) content.tags = tags;
    if (type !== undefined) content.type = type;

    await content.save();

    return res.status(200).json({
      message: "Content updated successfully!",
      content
    });
  } catch (e) {
    console.error("Error updating content:", e);
    return res.status(500).json({
     e
    });
  }
});


export default router;