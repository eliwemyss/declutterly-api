const express = require("express");
const bodyParser = require("body-parser");

const { Inventory } = require("./models");

const router = express.Router();
const passport = require("passport");
const jwtAuth = passport.authenticate("jwt", { session: false });

const jsonParser = bodyParser.json();
const stringFields = [
  'item',
  'description',
  'location',
  'category',
  'decision'
];

router.get("/", jwtAuth, (req, res) => {
  let filter = req.query.status ? { status: req.query.status } : {};
  filter.user = req.user.id;
  console.log(filter);
  console.log(req.user);
  Inventory.find(filter)

    .then(inventory => {
      res.json(inventory.map(inventory => inventory.serialize()));
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: "something went terribly wrong" });
    });
});

router.get("/:id", (req, res) => {
  Inventory.findById(req.params.id)
    .then(inventory => res.json(inventory.serialize()))
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: "something went horribly awry" });
    });
});

router.post("/", jwtAuth, jsonParser, (req, res) => {
  const requiredFields = ['item', 'description', 'location', 'category', 'decision'];
  for (let i = 0; i < requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`;
      console.error(message);
      return res.status(400).send(message);
    }
  }
  Inventory.create({
    item: req.body.item,
    description: req.body.description,
    location: req.body.location,
    category: req.body.category,
    decision: req.body.decision,
    user: req.user.id
  })
    .then(inventory => res.status(201).json(inventory.serialize()))
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: "Something went wrong" });
    });
});

router.delete("/:id", (req, res) => {
  Inventory.findByIdAndRemove(req.params.id)
    .then(() => {
      res.status(204).json({ message: "success" });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: "something went terribly wrong" });
    });
});

router.put("/edit/:id", jsonParser, (req, res) => {
  if (!(req.params.id && req.body.id && req.params.id === req.body.id)) {
    res.status(400).json({
      error: "Request path id and request body id values must match"
    });
  }
  const updated = {};
  const updateableFields = [
    'item',
    'description',
    'location',
    'category',
    'decision'
  ];
  updateableFields.forEach(field => {
    if (field in req.body) {
      updated[field] = req.body[field];
    }
  });

  Inventory.findByIdAndUpdate(req.params.id, { $set: updated }, { new: true })
    .then(updatedInventory => res.status(204).end())
    .catch(err => res.status(500).json({ message: "Something went wrong" }));
});

router.delete("/:id", (req, res) => {
  Inventory.findByIdAndRemove(req.params.id).then(() => {
    console.log(`Deleted inventory with id \`${req.params.id}\``);
    res.status(204).end();
  });
});

module.exports = { router };