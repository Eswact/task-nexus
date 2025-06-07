"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_route_1 = __importDefault(require("./user-route"));
const router = express_1.default.Router();
const chooseMethod = (method, path, func) => {
    switch (method) {
        case "get":
            router.get(path, func);
            break;
        case "post":
            router.post(path, func);
            break;
        case "put":
            router.put(path, func);
            break;
        case "delete":
            router.delete(path, func);
            break;
        default:
            break;
    }
};
user_route_1.default.forEach(({ method, path, func }) => {
    chooseMethod(method, `/users/${path}`, func);
});
exports.default = router;
