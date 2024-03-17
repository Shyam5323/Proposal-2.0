// server.js
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const Response = require("./models/Task");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
mongoose
  .connect(process.env.MONGO_URI, {
    dbName: "Proposal",
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

app.use(bodyParser.json());

app.post("/api/response", async (req, res) => {
  try {
    const { answer } = req.body;
    await Response.create({ answer });
    console.log(`Response saved successfully: ${answer}`);
    res.status(201).send("Response saved successfully.");
  } catch (error) {
    console.error("Error saving response:", error);
    res.status(500).send("Internal server error.");
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
