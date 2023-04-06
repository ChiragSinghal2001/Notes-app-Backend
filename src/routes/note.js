const express = require('express');
const router = express.Router();
const Note = require('../models/note');

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

  module.exports = router;