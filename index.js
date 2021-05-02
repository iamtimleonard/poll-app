const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const session = require("express-session");
const connectStore = require("connect-mongo");

require("dotenv").config();
const port = process.env.PORT || 5000;

const uri = process.env.ATLAS_URI;
(async () => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    });
    console.log("#######MongoDB connected########");
    const app = express();
    const MongoStore = connectStore(session);
    app.disable("x-powered-by");
    app.use(
      cors({
        credentials: true,
      })
    );
    app.use(express.json());
    app.use(
      session({
        name: process.env.SESS_NAME,
        secret: process.env.SESS_SECRET,
        saveUninitialized: false,
        resave: false,
        store: new MongoStore({
          mongooseConnection: mongoose.connection,
          collection: "session",
          ttl: parseInt(process.env.SESS_LIFETIME) / 1000,
        }),
        cookie: {
          sameSite: true,
          maxAge: parseInt(process.env.SESS_LIFETIME),
        },
      })
    );

    const pollRouter = require("./routes/polls");
    const userRouter = require("./routes/users");

    app.use("/polls", pollRouter);
    app.use("/users", userRouter);

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (err) {
    console.log(err);
  }
})();
