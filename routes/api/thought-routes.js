const router = require("express").Router();
const req = require("express/lib/request");
const res = require("express/lib/response");
const { Thought, Reaction } = require("../../models");

//TODO: ROUTE TO GET ALL THOUGHTS
router.get("/", async (req, res) => {
  try {
    let thoughts = await Thought.find({}).populate("reactions");
    res.status(200).json(thoughts);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//TODO: ROUTE TO CREATE A NEW THOUGHT
router.post("/", async (req, res) => {
  try {
    let newThought = await Thought.create(req.body);
    console.log(newThought);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//TODO: ROUTE TO GET SINGLE THOUGHT BASED ON THOUGHT ID
router.get("/:thoughtId", async (req, res) => {
  try {
    let singleThought = await Thought.findOne({
      _id: req.params.thoughtId,
    }).populate("reactions");
    res.status(200).json(singleThought);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//TODO: ROUTE TO UPDATE A THOUGHT
router.put("/", async (req, res) => {
  try {
    let updatedThought = await Thought.findOneAndUpdate(
      { _id: req.body.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    );
    res.status(200).json(updatedThought);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//TODO: ROUTE TO DELETE A THOUGHT BASED ON THOUGHT ID
router.delete("/:thoughtId", async (req, res) => {
  try {
    let deletedThought = await Thought.findOneAndDelete({
      _id: req.params.thoughtId,});
    console.log(deletedThought);
    res.status(200).json(deletedThought);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//TODO: ROUTE TO ADD REACTION TO A THOUGHT
router.post("/:thoughtId/reactions", async (req, res) => {
  try {
    console.log(req.body, req.params.thoughtId);

    let newReaction = await Reaction.create(req.body);
    console.log(newReaction);

    let updatedThought = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $push: { reactions: newReaction._id },}
    );
    console.log(updatedThought);
    res.status(200).json(newReaction);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//TODO: ROUTE TO DELETE A REACTION ON A THOUGHT
router.delete("/:thoughtId/reactions/:reactionId", async (req, res) => {
  try {
    let deletedReaction = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: req.params.reactionId }},
      { runValidators: true, new: true}
    )
    console.log(deletedReaction)
    res.status(200).json(deletedReaction)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
})

module.exports = router
