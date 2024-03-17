// models/Response.js
const mongoose = require("mongoose");

const responseSchema = new mongoose.Schema({
  answer: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Response = mongoose.model("Response", responseSchema);

module.exports = Response;
