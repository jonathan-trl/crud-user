const express = require("express");
const router = express.Router();
const UserService = require("./app/controller/User");

router.get("/user", async (req, res) => {
  const response = await UserService.get();
  return res.json(response);
});

router.get("/user/:id", async (req, res) => {
  const id = req.params.id;
  const response = await UserService.findById(id);
  return res.json(response);
});

router.get("/user/username/:username", async (req, res) => {
  const username = req.params.username;
  const response = await UserService.findByUsername(username);
  return res.json(response);
});

router.post("/user", async (req, res) => {
  const data = req.body;
  const response = await UserService.store(data);
  return res.json(response);
});

router.put("/user/:id", async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  const response = await UserService.update(id, data);
  return res.json(response);
});

router.delete("/user/:id", async (req, res) => {
  const id = req.params.id;
  const response = await UserService.delete(id);
  return res.json(response);
});

module.exports = router;
