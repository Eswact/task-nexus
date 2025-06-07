"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const models_1 = __importDefault(require("./models")); // TypeScript'e uygun import
const index_1 = __importDefault(require("./routes/index")); // TypeScript'e uygun import
dotenv_1.default.config();
const app = (0, express_1.default)();
// CORS
const corsOptions = {
    origin: ['http://localhost:5072'],
};
app.use((0, cors_1.default)(corsOptions));
// bodyParser
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
// MongoDB bağlantısı
models_1.default.mongoose
    .connect(models_1.default.url, {
// useNewUrlParser: true,
// useUnifiedTopology: true
})
    .then(() => {
    console.log("Connected to the database!");
})
    .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
});
// set port & listen
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
// route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to Server." });
});
app.use("/api", index_1.default);
