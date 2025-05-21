const mongoose = require("mongoose");

const addMovie = async (req, res) => {
  const Movie = mongoose.model("movie");
  console.log(req.body);
  // Validate the input data
  const { title, info, genre, releaseYear, rating } = req.body;
  // if (!title || !genre || !releaseYear || !rating) {
  //     return res.status(400).json({
  //     status: "fail",
  //     message: "All fields are required",
  //     });
  // }

  try {
    if (!title) throw new Error("Movie title is required");
    if (!info) throw new Error("Movie info is required");
    //if (!rating) throw new Error("Movie rating is required");
    if (rating < 0 || rating > 10)
      throw new Error("Movie rating must be between 0 and 10");
    // if (!genre) throw new Error("Movie genre is required");
    // if (!releaseYear) throw new Error("Movie release year is required");
    // if (releaseYear < 1900 || releaseYear > new Date().getFullYear())
    //   throw new Error("Movie release year must be a valid year");
  } catch (error) {
    console.error("Error adding movie:", error);
    return res.status(400).json({
      status: "error",
      message: error.message,
    });
  }

  try {
    // Check if the movie already exists in the database
    const existingMovie = await Movie.findOne({ title });
    if (existingMovie) throw new Error("Movie already exists");
    //Create a new movie object
    const newMovie = {
      title,
      info,
      director: req.body.director || "Unknown",
      genre,
      releaseYear,
      rating,
    };
    //Save the movie to the database
    const movie = await Movie.create(newMovie);
  } catch (error) {
    console.error("Error adding movie:", error);
    return res.status(500).json({
      status: "error",
      message: error.message,
      // "Movie creation failed, something went wrong, Internal server error!",
    });
  }
  res.status(200).json({
    status: "success",
    message: "Movie added successfully",
    data: [
      {
        title,
        info,
        genre,
        releaseYear,
        rating,
      },
    ],
    //movie: req.body
  });
};

module.exports = addMovie;
// This function is responsible for adding a new movie to the database.
// It will handle the request and response objects, validate the input data,
// and interact with the database to store the new movie information.
// It will also handle any errors that may occur during the process.
// The function will be exported for use in the main application file.
