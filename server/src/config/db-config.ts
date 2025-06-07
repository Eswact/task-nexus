require("dotenv").config();

const dbConfig = {
    url: process.env.MONGODB_CONNECTION || ""   
};

export default dbConfig;