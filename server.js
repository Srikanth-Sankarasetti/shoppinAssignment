const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const app = require("./app");

port = process.env.PORT || 5000;
const DB = process.env.DATABASE.replace("<PASSWORD>", process.env.PASSWORD);
console.log(DB);

mongoose
  .connect(DB)
  .then(() => {
    console.log("connection succeful");
  })
  .catch((err) => {
    console.log(err.message);
  });

app.listen(port, () => {
  console.log(`app listening at port ${port}`);
});
