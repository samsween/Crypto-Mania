const User = require("../models/User");
const { signJwt } = require("../utils/jwt");

module.exports = {
  register: async (req, res) => {
    const { username, email, password } = req.body;
    const userExists = await User.findOne({ username });
    if (userExists) {
      return res.status(406).json({ error: "Username already exists" });
    }
    try {
      const newUser = new User({
        username,
        email,
        password,
      });
      await newUser.save();
      res
        .status(201)
        .cookie(
          "token",
          signJwt({ id: newUser._id, username: newUser.username }),
          { httpOnly: false, secure: false }
        )
        .json({ user: { username: newUser.username, money: newUser.money } });
    } catch (err) {
      res.status(500).json({ error: "Server error" });
    }
  },
  login: async (req, res) => {
    const { username, password } = req.body;
    try {
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(400).json({ error: "Invalid username or password" });
      }
      const isValidPassword = await user.comparePassword(password);
      if (!isValidPassword) {
        return res.status(400).json({ error: "Invalid username or password" });
      }
      return res
        .status(201)
        .cookie("token", signJwt({ id: user._id, username: user.username }), {
          httpOnly: false,
          secure: false,
        })
        .json({ user: { username: user.username, money: user.money } });
    } catch (err) {
      res.status(500).json({ error: "Server error" });
    }
  },
  logout: async (req, res) => {
    res.clearCookie("token").json({ message: "Logged out" });
  },
  auth: async (req, res) => {
    await User.findById(req.user.id)
      .select("username money")
      .then((user) => res.json(user));
  },
  info: async (req, res) => {
    await User.findById(req.user.id)
      .select("-password -_id -__v")
      .then((user) => res.json(user))
      .catch((err) => res.status(404).json({ error: "Server erro" }));
  },
  update: async (req, res) => {
    const user = await User.findById(req.user.id);
    const isValid = await user.comparePassword(req.body.password);
    if (!isValid) {
      return res.status(400).json({ error: "Invalid password" });
    }
    await user
      .updateOne(
        { $set: { username: req.body.username, email: req.body.email } },
        { new: true }
      )
      .select("-password -_id -__v")
      .then((user) => res.json(user))
      .catch((err) => res.status(404).json({ error: "Server erro" }));
  },
};
