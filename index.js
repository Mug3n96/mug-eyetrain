const path = require("path");
const express = require("express");
const app = express();

// .env load
require("dotenv").config();
const { PORT } = process.env;

// serve static files
app.use("/static", express.static(path.resolve(__dirname, "public", "static")));

// server index file to every path
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`App listening on PORT ${PORT}`);
});
