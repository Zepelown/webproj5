const express = require("express");
const app = express();
const port = 8080;

app.use(express.static("static"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/static/main.html");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
