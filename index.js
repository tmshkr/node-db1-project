const express = require("express");
const server = express();
const accountsRouter = require("./api/accounts");

server.use(express.json());
server.use("/api/accounts", accountsRouter);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`listening on port ${PORT}...`);
});
