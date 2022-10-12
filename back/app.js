const express = require("express");
const postRouter = require("./routes/post");
const postsRouter = require("./routes/posts");
const userRouter = require("./routes/user");
const hashtagRouter = require("./routes/hashtag");
const db = require("./models");
const passportConfig = require("./passport");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const cors = require("cors");
const passport = require("passport");
const morgan = require("morgan");
const path = require("path");
const app = express();
dotenv.config();

db.sequelize
  .sync()
  .then(() => {
    console.log("db 연결 성공");
  })
  .catch(console.error);

// passport config
passportConfig();
//morgan use
app.use(morgan("dev"));
// cors error
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

// cookie
app.use(cookieParser(process.env.COOKIE_SECRET));

app.use("/", express.static(path.join(__dirname, "uploads")));

// data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// login
app.use(passport.initialize());
// login maintain
app.use(
  session({
    saveUninitialized: false,
    resave: false,
    secret: process.env.COOKIE_SECRET,
  })
);
app.use(passport.session());

app.use("/posts", postsRouter);
app.use("/post", postRouter);
app.use("/user", userRouter);
app.use("/hashtag", hashtagRouter);

// 에러처리 미들웨어(next())는 내부적으로 이 위치에 존재하게 된다.
// 다만 직접 적어주지 않아도 알아서 실행이 된다.
// 만약 에러 처리 미들웨러를 수정해주고 싶다면 req,res,next에 err을 추가로 작성해서 적어주면 된다.
// app.use((err, req, res, next) => {});

app.listen(3065, () => {
  console.log("서버 실행중!");
});
