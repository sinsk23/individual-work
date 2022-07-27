const express = require("express");
const app = express();
const port = 3000;

//db연결
const connect = require("./schemas/index");
connect();

const requestMiddleWare=(req,res,next)=>{
    console.log("request URL: ",req.originalUrl," - ", new Date());
    next();
};


const commentsRouter = require("./routes/comments");
const indexRouter = require("./routes/index");
const postsRouter = require("./routes/posts");


app.use(express.json());
app.use(express.urlencoded());
app.use(requestMiddleWare);
app.use("/", [commentsRouter,indexRouter,postsRouter]);




app.listen (port, () =>{
    console.log(port, "포트로 서버 켜짐")

})

