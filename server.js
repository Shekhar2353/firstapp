const express = require("express");
const cors = require("cors");
const mongoose = require('mongoose')
// const connectDB = require("./config/db");
const app = express();
const port = 3001;

// connectDB();
var url = "mongodb+srv://Calc:uYN5iw2S2a70TW76@cluster0.hlnpp.mongodb.net/firstapp";
// var url = "mongodb://Calc:uYN5iw2S2a70TW76@main-shard-00-00-03xkr.mongodb.net:27017,main-shard-00-01-03xkr.mongodb.net:27017,main-shard-00-02-03xkr.mongodb.net:27017/main?ssl=true&replicaSet=Main-shard-0&authSource=admin&retryWrites=true"
// var url = "mongodb://localhost:27017/farmtoconsumer"
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(url)

    console.log(`MongoDB Connected: ${conn.connection.host}`)
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

connectDB()

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: "*",
  })
);

// app.use("/", (req, res) => {
//   res.send("Server running");
// });

app.use("/api/user", require("./routes/userRoutes"));
app.listen(port, () => {
  console.log("Server Running at", port);
});
