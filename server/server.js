const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("Mongo error:", err));

// Schema
const jobSchema = new mongoose.Schema({
  title: String,
  salary: String,
  location: String,
  company: String,
  description: String,
});

const Job = mongoose.model("Job", jobSchema);

// GET /api
app.get("/api", async (req, res) => {
  const jobs = await Job.find();
  res.json(jobs);
});

// GET job by ID
app.get("/api/:id", async (req, res) => {
  const job = await Job.findById(req.params.id);
  if (!job) {
    return res.status(404).json({ message: "Job not found" });
  }
  res.json(job);
});

// POST /api
app.post("/api", async (req, res) => {
  const newJob = new Job(req.body);
  await newJob.save();
  res.status(201).json(newJob);
});

// PUT (Update) job by ID
app.put("/api/:id", async (req, res) => {
  const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!updatedJob) {
    return res.status(404).json({ message: "Job not found" });
  }
  res.json(updatedJob);
});

// DELETE job by ID
app.delete("/api/:id", async (req, res) => {
  const deletedJob = await Job.findByIdAndDelete(req.params.id);
  if (!deletedJob) {
    return res.status(404).json({ message: "Job not found" });
  }
  res.status(204).send();
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});

const User = require("./models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const SECRET = "your_jwt_secret"; // In production, use env vars

// Routes
app.use("/api/auth", authRoutes);

// Signup
app.post("/auth/signup", async (req, res) => {
  const { email, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  try {
    const user = await User.create({ email, password: hashed });
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: "User already exists" });
  }
});

// Login
app.post("/auth/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ error: "Invalid credentials" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ error: "Invalid credentials" });

  const token = jwt.sign({ userId: user._id }, SECRET, { expiresIn: "1h" });
  res.json({ token });
});
