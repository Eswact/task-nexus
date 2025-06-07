"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const dbConfig = {
    url: process.env.MONGODB_CONNECTION || ""
};
exports.default = dbConfig;
