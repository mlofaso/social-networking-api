const { User } = require("../models");

// create user, get all users, get one user, update user, delete user, add friend, remove friend
module.exports = {
  async createUser(req, res) {
    try {
      const newUser = await User.create(req.body);
      res.json(newUser);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
