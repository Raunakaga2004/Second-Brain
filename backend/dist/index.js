"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("./config");
const auth_1 = __importDefault(require("./routes/auth"));
const content_1 = __importDefault(require("./routes/content"));
const brain_1 = __importDefault(require("./routes/brain"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
const PORT = process.env.PORT;
app.use(express_1.default.json());
app.use('/api/v1/auth', auth_1.default);
app.use('/api/v1/content', content_1.default);
app.use('/api/v1/brain', brain_1.default);
app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
mongoose_1.default.connect(config_1.DATABASE_URI).then(() => {
    console.log("Connected to MongoDB");
}).catch((e) => {
    console.error(e);
});
