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
const router = (0, express_1.Router)();
const utils_1 = require("../utils");
const middleware_1 = require("../middleware");
//@ts-ignore
router.post("/share", middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const share = req.body.share;
    if (share) {
        const existingLink = yield db_1.Link.findOne({
            //@ts-ignore
            userId: req.userId
        });
        if (existingLink) {
            return res.json({
                hash: existingLink.hash
            });
        }
        const hash = (0, utils_1.random)(10);
        yield db_1.Link.create({
            //@ts-ignore
            userId: req.userId,
            hash: hash
        });
        res.json({
            hash: hash
        });
    }
    else {
        yield db_1.Link.deleteOne({
            //@ts-ignore
            userId: req.userId
        });
        return res.json({
            message: "Link deleted"
        });
    }
}));
//@ts-ignore
router.get("/:sharelink", middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const hash = req.params.sharelink;
    const link = yield db_1.Link.findOne({
        hash: hash
    });
    if (!link) {
        return res.status(411).json({
            message: "Link not found"
        });
    }
    const content = yield db_1.Content.find({
        userId: link.userId
    });
    if (!content) {
        return res.status(411).json({
            message: "Content not found"
        });
    }
    const user = yield db_1.User.findById({
        _id: link.userId
    }).select("name");
    return res.json({
        user: user,
        content: content
    });
}));
exports.default = router;
