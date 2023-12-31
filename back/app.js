const express = require("express");
const fileUpload = require("express-fileupload")
const cookieParser = require("cookie-parser")
const path = require("path");
const http = require("http");

const {routesInit} = require("./routes/configRoutes");
require("./db/mongoConnect");

const app = express();

app.use(express.json());
app.use(cookieParser()); 
app.use(fileUpload())

app.use(express.static(path.join(__dirname, "public")));
routesInit(app);

app.use((error, req, res, next) => {
    if (process.env.NODE_ENV === "development") {
      console.error(error);
    }
    next(error);
  });
app.use((error, req, res, next) => {
    if (process.env.NODE_ENV === "application") {
      res.status(500).json({
        message: error.message,
        stack: error.stack,
      });
    } else {
        res.status(500).json({
           message: error.message, 
        })
    }
  });


const server = http.createServer(app);
const port = process.env.PORT || 5000;
server.listen(port);