"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DATABASE_URI = exports.PORT = exports.JWT_PASSWORD = void 0;
exports.JWT_PASSWORD = process.env.JWT_PASSWORD || "password";
exports.PORT = process.env.PORT || 3000;
exports.DATABASE_URI = process.env.DATABASE_URI ||
    "mongodb+srv://root:12022004@cluster0.emubo4v.mongodb.net/";
