require("dotenv").config();

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
const app = express();
const server = require("http").createServer(app);
const corsOptions = { credentials: true, origin: process.env.ORIGIN };

app.use(cors(corsOptions));

const coreRoutes = require("./routes/core.routes");
const pool = require("./utils/db-connect");

const PORT = process.env.PORT || 5500;

// tell express to serve static files which are under dist
// app.use(express.static(path.resolve(process.cwd() + '/../../dist')))
app.use(express.static(path.join(__dirname, "uploads/")));
app.use(express.json({ limit: "10MB" }));
app.use(express.urlencoded({ extended: true, limit: "10MB" }));
app.use(cookieParser());

app.use("/api", coreRoutes);

app.get("/test", (req, res) => {
  pool.getConnection((err, con) => {
    if (err) {
      console.log("Conection Failed");
    } else {
      res.json({ message: "Connection established." });
    }
  });
});

// start server

server.listen(PORT, () => {
  console.log(`Express app listening on.........PORT :  ${PORT}`);
});
