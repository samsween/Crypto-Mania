const express = require("express");
const app = express();
const routes = require("./routes");
const connect = require("./config/mongoConnection");
const cookieParser = require("cookie-parser");

const PORT = process.env.PORT || 3000;
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

connect().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
