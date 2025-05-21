require("dotenv").config(); // Must be the first line
const express = require("express");
const addMovie = require("./controllers/addMovie");
const {
  getAllMovie,
  getMovieById,
  getMovieByName,
} = require("./controllers/getMovie");
const updateMovie = require("./controllers/updateMovie");
const deleteMovie = require("./controllers/deleteMovie");
const getMovieRecommendations = require("./controllers/movieRecommendation");

const mongoose = require("mongoose");
//console.log("API Key Loaded:", process.env.OPENAI_API_KEY);
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;

//Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });
require("./models/movies.model");

//Routes...
app.post("/api/v1/movies", addMovie);
app.get("/api/v1/movies", getAllMovie);
app.get("/api/v1/movies/:id", getMovieById);
app.get("/api/v1/movies/title/:title", getMovieByName);
app.put("/api/v1/movies/:id", updateMovie);
app.delete("/api/v1/movies/:id", deleteMovie);

//Openai API movie recommendation
app.get("/api/v1/movies/openai/getRecommendations", getMovieRecommendations);
app.get("/", (_, res) => {
  res.send({
    status: "success",
    message: "Welcome to the Movie API",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
