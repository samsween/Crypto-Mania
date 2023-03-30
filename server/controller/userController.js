const User = require("../models/User");
const { signJwt } = require("../utils/jwt");

module.exports = {
  register: async (req, res) => {
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
  auth: async (req, res) => {
    await User.findById(req.user.id)
      .select("username money")
      .then((user) => res.json( user ));
  },
};
