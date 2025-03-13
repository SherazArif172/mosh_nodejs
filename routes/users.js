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

router.post("/", (req, res) => {
  const user = {
    id: users.length + 1,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    gender: req.body.gender,
  };

  users.push(user);
  res.send(user);
});

router.delete("/:id", (req, res) => {
  const user = users.find((user) => {
    return user.id === parseInt(req.params.id);
  });

  const index = users.indexOf(user);
  users.splice(index, 1);
  res.send(user);
});

router.put("/:id", (req, res) => {
  try {
    const user = users.find((user) => user.id === parseInt(req.params.id));

    if (!user) {
      return res.status(404).send("User not found");
    }

    // Update user properties
    user.last_name = req.body.last_name || user.last_name;
    user.first_name = req.body.first_name || user.first_name;
    user.email = req.body.email || user.email;
    user.gender = req.body.gender || user.gender;

    res.send(user);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
