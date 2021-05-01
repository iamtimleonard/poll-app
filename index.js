const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

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
    app.disable("x-powered-by");
    app.use(
      cors({
        credentials: true,
      })
    );
    app.use(express.json());

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
