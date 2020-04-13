const router = require("express").Router();
const db = require("../data/dbConfig.js");

router.get("/", (req, res, next) => {
  db.select("*")
    .from("account")
    .then((accounts) => {
      accounts.count > 0
        ? res.json(accounts)
        : res.status(404).send("no accounts yet");
    })
    .catch((err) => {
      console.error(err);
      next({ code: 500, message: "There was an error getting the accounts" });
    });
});

module.exports = router;
