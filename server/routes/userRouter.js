const router = require("express").Router();
const User = require("../models/User");

router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  const userExists = await User.findOne({ username });
  if (userExists) {
    return res.status(400).json({ error: "Username already exists" });
  }
  try {
    const newUser = new User({
      username,
      email,
      password,
    });
    await newUser.save();
    res.status(201).json({ message: "User created" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
