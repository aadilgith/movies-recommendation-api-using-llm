const mongoose = require("mongoose");

exports.getAllMovie = async (req, res) => {
  const Movie = mongoose.model("movie");
  try {
    // Get all movies from the database
    const movies = await Movie.find({ rating: { $gt: 1 } }).sort({
      rating: -1,
    });
    if (!movies || movies.length === 0) throw new Error("No movies found");
    res.status(200).json({
      status: "success",
      message: "Movies found successfully",
      data: movies,
    });
  } catch (error) {
    console.error("Error getting movies:", error);
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

exports.getMovieById = async (req, res) => {
  const Movie = mongoose.model("movie");
  const { id } = req.params;
  console.log(id);
  try {
    // Check if the movie already exists in the database
    const movie = await Movie.findById(id);
    if (!movie) throw new Error("Movie not found");
    res.status(200).json({
      status: "success",
      message: "Movie found successfully",
      data: movie,
    });
  } catch (error) {
    console.error("Error getting movie:", error);
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

exports.getMovieByName = async (req, res) => {
  const Movie = mongoose.model("movie");
  const { title } = req.params;
  console.log("name: ", title);
  try {
    // Check if the movie already exists in the database
    const movie = await Movie.findOne({ title });
    if (!movie) throw new Error("Movie not found");
    res.status(200).json({
      status: "success",
      message: "Movie found successfully",
      data: movie,
    });
  } catch (error) {
    console.error("Error getting movie:", error);
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};
//module.exports = [getAllMovie, getMovieById, getMovieByName];
