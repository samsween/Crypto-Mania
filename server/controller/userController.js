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
      res.status(201).json({ message: "User created" });
    } catch (err) {
      res.status(500).json({ error: err.message });
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
      res.status(200).json({ message: "Login successful" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};
