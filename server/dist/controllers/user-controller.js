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
const models_1 = __importDefault(require("../models"));
const users = models_1.default.users;
const findAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const usersData = yield users.find();
        res.json(usersData);
    }
    catch (err) {
        res.status(500).send({ message: err.message || "Some error occurred while retrieving users." });
    }
});
module.exports = {
    findAll
};
