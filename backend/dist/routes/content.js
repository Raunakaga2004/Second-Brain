"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const db_1 = require(".././db");
const middleware_1 = require("../middleware");
const router = (0, express_1.Router)();
//@ts-ignore
router.post("/", middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { link, title, description, type } = req.body;
    // Validation
    if (!title) {
        return res.status(400).json({ message: "Title is required." });
    }
    try {
        yield db_1.Content.create({
            link,
            title,
            description: description || "",
            type: type,
            //@ts-ignore
            userId: req.userId,
        });
        res.status(200).json({
            message: "Content Added!"
        });
    }
    catch (e) {
        res.status(500).json(e);
    }
}));
//@ts-ignore
router.get("/", middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //@ts-ignore
        const userId = req.userId;
        const content = yield db_1.Content.find({
            userId: userId
        })
            .populate("userId", "name")
            .populate("tags", "title")
            .sort({ createdAt: -1 });
        return res.json({
            content
        });
    }
    catch (e) {
        res.status(500).json(e);
    }
}));
//@ts-ignore
router.delete("/", middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const contentId = req.query.id;
        yield db_1.Content.deleteMany({
            _id: contentId,
            //@ts-ignore
            userId: req.userId
        });
        return res.json({
            message: "Content Deleted"
        });
    }
    catch (e) {
        res.status(500).json(e);
    }
}));
//@ts-ignore
router.put("/:id", middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const content = yield db_1.Content.findOne({ _id: id, userId });
        if (!content) {
            return res.status(404).json({ message: "Content not found or unauthorized." });
        }
        // Apply updates
        if (title !== undefined)
            content.title = title;
        if (description !== undefined)
            content.description = description;
        if (link !== undefined)
            content.link = link;
        if (tags !== undefined)
            content.tags = tags;
        if (type !== undefined)
            content.type = type;
        yield content.save();
        return res.status(200).json({
            message: "Content updated successfully!",
            content
        });
    }
    catch (e) {
        console.error("Error updating content:", e);
        return res.status(500).json({
            e
        });
    }
}));
exports.default = router;
