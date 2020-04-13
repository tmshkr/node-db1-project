const router = require("express").Router();
const db = require("../data/dbConfig.js");

router.get("/", (req, res, next) => {
  db.select("*")
    .from("accounts")
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

router.get("/:id", (req, res) => {
  db("accounts")
    .where("id", req.params.id)
    .then((accounts) => {
      accounts.count > 0
        ? res.json(accounts)
        : res.status(404).send("account not found");
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("There was an error retrieving the account");
    });
});

module.exports = router;
