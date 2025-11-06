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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("./config");
const db_1 = require("./db");
const middleware_1 = require("./middleware");
const utils_1 = require("./utils");
const auth_1 = __importDefault(require("./routes/auth"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
const PORT = 3000;
app.use(express_1.default.json());
app.use('/api/v1/auth', auth_1.default);
//@ts-ignore
app.post("/api/v1/content", middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { type, link, title } = req.body;
    try {
        yield db_1.Content.create({
            type,
            link,
            title,
            //@ts-ignore
            userId: req.userId,
            tags: []
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
app.get("/api/v1/content", middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //@ts-ignore
    const userId = req.userId;
    const content = yield db_1.Content.find({
        userId: userId
    }).populate("userId" /* populate the foreign key userId*/, "username" /* and select only username property */);
    return res.json({
        content
    });
}));
//@ts-ignore
app.delete("/api/v1/content", middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const contentId = req.query.id;
    yield db_1.Content.deleteMany({
        _id: contentId,
        //@ts-ignore
        userId: req.userId
    });
    return res.json({
        message: "Content Deleted"
    });
}));
//@ts-ignore
app.post("/api/v1/brain/share", middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
app.get("/api/v1/brain/:sharelink", middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
    }).populate("userId", "username");
    if (!content) {
        return res.status(411).json({
            message: "Content not found"
        });
    }
    return res.json({
        content
    });
}));
app.listen(PORT);
mongoose_1.default.connect(config_1.DATABASE_URI).then(() => {
    console.log("Connected to MongoDB");
}).catch((e) => {
    console.error(e);
});
