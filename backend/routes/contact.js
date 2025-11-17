const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");

router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message)
      return res.status(400).json({ message: "All fields required" });

    await Contact.create({ name, email, message });

    return res.json({ message: "Message received!" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
