const express = require("express");
const cors = require("cors");
const connectDB = require("./confiq/db");
const app = express();
const port = 3001;

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: "*",
  })
);

// app.use("/", (req, res) => {
//   res.send("This is MyFirst App");
// });

app.use("/api/user", require("./routes/userRoutes"));
app.listen(port, () => {
  console.log("Server Running at", port);
});
