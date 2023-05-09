const express = require("express");
const app = express();
const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
const http = require("http").createServer(app);
const routes = require("./routes");
const connect = require("./config/mongoConnection");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");
const initIo = require("./socket/initIo");
puppeteer.use(StealthPlugin());
const io = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:3001",
  },
});
const PORT = process.env.PORT || 3000;

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/dist/index.html"));
  });
} else {
  app.use(
    cors({
      origin: "http://localhost:3001",
      credentials: true,
    })
  );
}

connect()
  .then(async () => {
    const browser = await puppeteer.launch({
      defaultViewport: {
        width: 1280,
        height: 1024,
      },
      args: ["--no-sandbox"],
    });
    return browser;
  })
  .then(async (browser) => {
    await initIo(io, browser);
    http.listen(PORT, () => {
      console.log("listening on *:3000");
    });
  });
