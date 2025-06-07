"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const usersController = require("../controllers/user-controller");
const endpoints = [
    { method: "get", path: "published", func: usersController.findAll },
];
exports.default = endpoints;
