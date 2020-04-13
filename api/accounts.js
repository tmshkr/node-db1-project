const router = require("express").Router();
const db = require("../data/dbConfig.js");

router.get("/", (req, res) => {
  db.select("*")
    .from("accounts")
    .then((accounts) => {
      accounts.count > 0
        ? res.json(accounts)
        : res.status(404).send("no accounts yet");
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("There was an error getting the accounts");
    });
});

module.exports = router;
