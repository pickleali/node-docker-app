const express = require("express");
const mongoose = require('mongoose');
const session = require('express-session')
const redis = require('redis')
const RedisStore = require('connect-redis')(session)
const cors = require("cors")

const {
    MONGO_USER,
    MONGO_PASSWORD,
    MONGO_PORT,
    MONGO_IP,
    REDIS_URL,
    REDIS_PORT,
    SESSION_SECRET
} = require("../config/config");

let RedisClient = redis.createClient({
    host: REDIS_URL,
    port: REDIS_PORT
})

const postRouter = require("../routes/postRoutes")
const userRouter = require("../routes/userRoutes")

const app = express();
const mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;
// const mongoURL = "mongodb://admin:12345@mongodb:27017/?authSource=admin";

mongoose
    .connect(mongoURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    })
    .then(() => console.log("Succesfully connected to DB!"))
    .catch((e) => console.log(e));


//This line is required if a proxy such as nginx is connected to the network
app.enable("trust proxy");
app.use(cors({}))

app.use(session({
    store: new RedisStore({
        client: RedisClient
    }),
    secret: SESSION_SECRET,
    cookie: {
        secure: false,
        resave: false,
        saveUninitialized: false,
        httpOnly: true,
        maxAge: 30000
    }
}));

app.use(express.json());
app.get("/api/v1", (req, res) => {
    /*     res.sendFile('index.html', {
            root: __dirname
        }) */
    res.send("<h1>This is a test...</h1>")
    console.log("it is working! . . .");

});

// process.env.port defaults the port number to 3000 if port value is not set


app.use("/api/v1/posts", postRouter)
app.use("/api/v1/users", userRouter)

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}`));