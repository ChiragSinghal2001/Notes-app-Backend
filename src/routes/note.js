const express = require('express');
const router = express.Router();
const Note = require('../models/note');
const User = require('../models/sch');

router.use(express.json());

router.post("/lists", async function(req, res) {
    try {
      const notes = await Note.find({userid: req.body.userid});
      res.json(notes);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  router.post("/add", async function(req, res) {
    try {
           await Note.deleteOne({id: req.body.id});

      const newNote = new Note({
        id: req.body.id,
        userid: req.body.userid,
        title: req.body.title,
        content: req.body.content
      });
      await newNote.save();
      res.json({ message: "New note created!", note: newNote });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  router.post("/delete", async function(req, res) {
    try {
           await Note.deleteOne({id: req.body.id});
           const response = { message: "Note Deleted!" + 'id: ${req.body.id}' };
      res.json(response);

    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  });



// Signup route
router.post('/signup', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create a new user
    const newUser = new User({ email, password });
    await newUser.save();

    res.status(201).json({ message: 'Signup successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Login route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Compare the passwords (as plain text)
    if (password !== user.password) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});


  module.exports = router;