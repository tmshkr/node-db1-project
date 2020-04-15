const router = require("express").Router();
const db = require("../data/dbConfig.js");

router.get("/", (req, res, next) => {
  console.log(req.query);
  const { limit, sortby, sortdir } = req.query;
  db.select("*")
    .from("accounts")
    .orderBy(sortby || "id", sortdir || "ASC")
    .limit(limit)
    .then((accounts) => {
      accounts.length > 0
        ? res.json(accounts)
        : res.status(404).send("no accounts yet");
    })
    .catch((err) => {
      console.error(err);
      next({ code: 500, message: "There was an error getting the accounts" });
    });
});

router.get("/:id", (req, res, next) => {
  db("accounts")
    .where("id", req.params.id)
    .then((accounts) => {
      accounts.length > 0
        ? res.json(accounts)
        : res.status(404).send("account not found");
    })
    .catch((err) => {
      console.error(err);
      next({ code: 500, message: "There was an error retrieving the account" });
    });
});

router.post("/", (req, res, next) => {
  const { name, budget } = req.body;
  db("accounts")
    .insert({ name, budget })
    .then((ids) => {
      const id = ids[0];
      return db("accounts").where({ id });
    })
    .then((account) => res.status(201).json(account))
    .catch((err) => {
      console.error(err);
      next({ code: 500, message: "There was an error creating the account" });
    });
});

router.put("/:id", (req, res, next) => {
  const { name, budget } = req.body;
  db("accounts")
    .where("id", req.params.id)
    .update({ name, budget })
    .then((updates) => {
      updates > 0
        ? res.json(updates)
        : res.status(404).send("account not found");
    })
    .catch((err) => {
      console.error(err);
      next({ code: 500, message: "There was an error updating the account" });
    });
});

router.delete("/:id", (req, res, next) => {
  db("accounts")
    .where("id", req.params.id)
    .del()
    .then(() => res.status(204).send())
    .catch((err) => {
      console.error(err);
      next({ code: 500, message: "There was an error deleting the account" });
    });
});

module.exports = router;
