const router = require("express").Router();
const { User } = require("../../models");

//TODO - ROUTE THAT GETS ALL THE USERS, include friends?
router.get("/", async (req, res) => {
  try {
    let allUsers = await User.find({}).populate("friends");
    res.status(200).json(allUsers);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//TODO - ROUTE THAT CREATES A NEW USER
router.post("/", async (req, res) => {
  try {
    let newUser = await User.create(req.body);
    res.status(200).json(newUser);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//TODO - ROUTE THAT GETS A SINGLE USER BASED ON USER ID
router.get("/:userId", async (req, res) => {
  try {
    let singleUser = await User.findOne({ _id: req.params.userId });
    res.status(200).json(singleUser);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//TODO - ROUTE THAT UPDATES A SINGLE USER
router.put("/:userId", async (req, res) => {
  try {
    let updatedUser = await User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//TODO - ROUTE THAT DELETES A SINGLE USER BASED ON USER ID
router.delete("/:userId", async (req, res) => {
  try {
    let deletedUser = await User.findOneAndDelete({ _id: req.params.userId 
    });
    res.status(200).json(deletedUser);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//TODO - ROUTE THAT ADDS A FRIEND TO A USER
router.put("/:userId/friends/:friendId", async (req, res) => {
  try {
    let newFriend = await User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    );
    res.status(200).json(newFreind);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//TODO - ROUTE THAT DELETES A FRIEND FROM A USER'S FRIENDS, DONT DELETE THE FRIEND AS A USER THOUGH!
router.delete("/:userId/friends/:friendId", async (req, res) => {
  try {
    let deletedFriend = await User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    );
    res.status(200).json(deletedFriend);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
