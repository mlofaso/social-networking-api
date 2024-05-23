const { Thought, User } = require("../models");

module.exports = {
  async createThought(req, res) {
    try {
      const newThought = await Thought.create(req.body);

      const updatedUser = await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $push: { thoughts: newThought._id } },
        { new: true }
      );

      if (!updatedUser) {
        return res.status(404).json({ message: "No user with that ID" });
      }
      res.json(updatedUser);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  async getAllThoughts(req, res) {
    try {
      const allThoughts = await Thought.find();
      res.json(allThoughts);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  async getOneThought(req, res) {
    try {
      const singleThought = await Thought.findOne({
        _id: req.params.thoughtId,
      });
      if (!singleThought) {
        return res.status(404).json({ message: "No thought with that ID!" });
      }
      res.json(singleThought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async updateThought(req, res) {
    try {
      const updatedThought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!updatedThought) {
        return res.status(404).json({ message: "No thought with that ID!" });
      }

      res.json(updatedThought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async deleteThought(req, res) {
    try {
      const deletedThought = await Thought.findOneAndDelete({
        _id: req.params.thoughtId,
      });

      if (!deletedThought) {
        return res.status(404).json({ message: "No thought with that ID!" });
      }

      res.json(deletedThought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async addReaction(req, res) {
    try {
      const newReaction = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $push: { reactions: req.body } },
        { runValidators: true, new: true }
      );

      if (!newReaction) {
        return res.status(404).json({ message: "No thought with that ID!" });
      }

      res.json(newReaction);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async removeReaction(req, res) {
    try {
      const deletedReaction = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { runValidators: true, new: true }
      );

      if (!deletedReaction) {
        return res.status(404).json({ message: "No thought with that ID!" });
      }

      res.json(deletedReaction);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
