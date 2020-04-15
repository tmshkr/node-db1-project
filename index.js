const express = require("express");
const server = express();
const accountsRouter = require("./api/accounts");

server.use(logger);
server.use(express.json());
server.use("/api/accounts", accountsRouter);
server.use(errorHandler);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`listening on port ${PORT}...`);
});

function errorHandler(err, req, res, next) {
  res.status(err.code).send(err.message);
}

function logger(req, res, next) {
  console.log(
    `${new Date().toLocaleTimeString()}: ${req.method} ${req.originalUrl}`
  );
  next();
}
