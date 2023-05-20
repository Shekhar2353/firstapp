const express = require("express");
const cors = require("cors");
const app = express();
const port = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: "*",
  })
);
app.use("/", (req, res) => {
  res.send("This is MyFirst App");
});
app.listen(port, () => {
  console.log("Server Running at", port);
});
