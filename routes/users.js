const express = require("express");
const router = express.Router();
const users = require("../MOCK_DATA.json");

router.get("/", (req, res) => {
  return res.json(users);
});

router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const user = users.find((user) => {
    return user.id === id;
  });
  console.log(req.params.id);

  return res.json(user);
});

module.exports = router;
