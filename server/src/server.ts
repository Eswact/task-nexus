import express, { Application, Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import cookieSession from 'cookie-session';
import dotenv from "dotenv";
import db from "./models";
import routes from "./routes/index";

dotenv.config();

const app: Application = express();

// CORS
const corsOptions = {
  origin: ['http://localhost:3000'],
  credentials: true
};
app.use(cors(corsOptions));

// bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB connection
db.mongoose
  .connect(db.url, {
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
const PORT = process.env.PORT || 3037;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

const sessionSecret:string = process.env.SESSION_SECRET || "default"; 
app.use(
  cookieSession({
    name: 'session',
    keys: [sessionSecret],
    maxAge: 60 * 60 * 1000,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
  })
);

// route
app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Welcome to Server." });
});
app.use("/api", routes);