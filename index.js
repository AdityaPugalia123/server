require("dotenv").config();
const express = require("express");
const cors = require("cors");

const mongoose = require("mongoose");
const port = process.env.PORT || 9000;
const app = express();
app.use(express.json());
app.use(cors());
mongoose
  .connect(process.env.URL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err);
  });

const User = require("./models/userModel");

app.get("/users/:id", async (req, res) => {
  try {
    const user = await User.findOne({ gameId: req.params.id });
    res.status(201).send(user);
  } catch {
    res.status(404);
    res.send({ error: "Client not found" });
  }
});

app.patch("/users/:id", async (req, res) => {
  try {
    const update = await User.findOneAndUpdate(
      { gameId: req.params.id },
      { $set: req.body }
    );
    res.status(201).send(update);
  } catch (err) {
    res.status(400).send("Error updating user");
    console.log(err);
  }
});
app.post("/users", async (req, res) => {
  try {
    const user = new User({
      player1: req.body.player1,
      player2: req.body.player2,
      randomArr: req.body.randomArr,
      gameStatus: req.body.gameStatus,
      gameId: req.body.gameId,
      winner: req.body.winner,
    });
    await user.save();
    res.status(201).send("User created");
  } catch (err) {
    res.status(500).send("Error creating user");
    console.log(err);
  }
});

app.listen(port, () => {
  console.log("Server is running on port 9000");
});
