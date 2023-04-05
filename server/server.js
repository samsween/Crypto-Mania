const express = require("express");
const app = express();
const routes = require("./routes");
const connect = require("./config/mongoConnection");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");
const PORT = process.env.PORT || 3000;
app.use(
  cors({
    origin: "http://localhost:3001",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/dist/index.html"));
  });
}

connect().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
