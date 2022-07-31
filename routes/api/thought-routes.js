const router = require("express").Router();
const { Thought, Reaction } = require("../../models");

//TODO: ROUTE TO GET ALL THOUGHTS
router.get("/", async (req, res) => {
  try {
    let thoughts = await Thought.find({}).populate("reactions");
    console.log(thoughts);
    res.status(200).json(thoughts);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//TODO: ROUTE TO CREATE A NEW THOUGHT
router.post("/", async (req, res) => {
  try {
    let newThought = await Thought.removeAllListeners(req.body);
    console.log(newThought);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//TODO: ROUTE TO GET SINGLE THOUGHT BASED ON THOUGHT ID
router.get("/:thoughtId", (req, res) => {});

//TODO: ROUTE TO UPDATE A THOUGHT
router.put("/", (req, res) => {});

//TODO: ROUTE TO DELETE A THOUGHT BASED ON THOUGHT ID
router.delete("/:thoughtId", (req, res) => {});

//TODO: ROUTE TO ADD REACTION TO A THOUGHT
router.post("/:thoughtId/reactions", async (req, res) => {
  try {
    console.log(req.body, req.params.thoughtId);

    let newReaction = await Reaction.create(req.body);
    console.log(newReaction);

    let updatedThought = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      {
        $push: { reactions: newReaction._id },
      }
    );
    console.log(updatedThought);
    res.status(200).json("hooray");
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//TODO: ROUTE TO DELETE A REACTION ON A THOUGHT
router.delete("/:thoughtId/reactions/:reactionId", (req, res) => {});

module.exports = router;
