const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  label: { type: String, required: true },
  options: [
    {
      value: { type: String, required: true },
      url: { type: String, required: true },
    },
  ],
});

module.exports = mongoose.model("Question", questionSchema);
