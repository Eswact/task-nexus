"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const db_config_1 = __importDefault(require("../config/db-config"));
const user_model_1 = __importDefault(require("./user-model"));
const db = {
    mongoose: mongoose_1.default,
    url: db_config_1.default.url,
    users: user_model_1.default,
};
exports.default = db;
