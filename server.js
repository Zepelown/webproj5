const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/user-routes");
const config = require("./config");

const app = express();

app.use(express.static("static"));
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.use("/api", userRoutes.routes);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/static/main.html");
});

app.listen(config.port, () =>
  console.log("App is Listening on url http://localhost:" + config.port)
);
