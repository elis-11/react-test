import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import { teachersRouter } from "./routes/teachers.router.js";
dotenv.config();

mongoose.connect(process.env.MONGO_URI);

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send(`
<h2>Welcome!</h2>
<div>Our routes:</div>
<div>Home: <a href="/">/</a></div>
<div>Teachers: <a href="/teachers">/teachers</a></div>
<div>Students: <a href="/students">/students</a></div>
    `);
});

app.use("/teachers", teachersRouter);

app.use((req, res, next) => {
  res.status(404).json({ error: `This route does not exist` });
});

const PORT = 5555 || process.env.PORT;
app.listen(PORT, () => {
  console.log(`App listenin at http://localhost:` + PORT);
});