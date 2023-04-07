const express = require("express");
const morgan = require("morgan");

// INTERNAL IMPORT
const nftsRouter = require("./routes/nftsRoute");
const usersRouter = require("./routes/usersRoute");

const app = express();
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/v1/nfts", nftsRouter);
app.use("/api/v1/users", usersRouter);

module.exports = app;
