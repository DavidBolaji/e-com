const express = require("express");
require("dotenv").config();

// model start

const app = express();
const PORT = process.env.PORT || 5000;
const userRouter = require("./routes/user");
const productRouter = require("./routes/product");
// const emailRouter = require('./routes/email')
const logoRouter = require("./routes/logo");
const cors = require("cors");
app.use(
  cors({
    origin: "*",
  })
);

// app use

app.use(express.json());
app.use(userRouter);
app.use(productRouter);
// app.use(emailRouter);
app.use(logoRouter);

app.listen(PORT, () => {
  console.log(`SERVER IS RUNNING ON PORT ${PORT}`);
});
