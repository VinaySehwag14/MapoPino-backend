const express = require("express");
const router = express.Router();
const Pin = require("../models/Pin");

//*create a pin
router.post("/", async (req, res) => {
  const newPin = new Pin(req.body);
  console.log(newPin);

  try {
    const savedPin = await newPin.save();
    return res.status(200).json(savedPin);
  } catch (err) {
    return res.status(500).json(err);
  }
});

//*get all pin
router.get("/", async (req, res) => {
  try {
    const pins = await Pin.find();
    console.log(pins);
    return res.status(200).json(pins);
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;
