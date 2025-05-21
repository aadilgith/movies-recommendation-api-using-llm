const mongoose = require("mongoose");
const updateMovie = async (req, res) => {
  const Movie = mongoose.model("movie");
  const { id } = req.params;
  const { title, info, director, releaseYear, genre, rating } = req.body;
  try {
    // Check if the movie already exists in the database
    // const movie = await Movie.findById(id);
    // if (!movie) throw new Error("Movie not found");

    // // Update the movie details
    // movie.title = title || movie.title;
    // movie.info = info || movie.info;
    // movie.director = director || movie.director;
    // movie.releaseYear = releaseYear || movie.releaseYear;
    // movie.genre = genre || movie.genre;
    // movie.rating = rating || movie.rating;

    // Save the updated movie
    //await movie.save();
    //update one record at a time
    const updatedMovie = await Movie.findByIdAndUpdate(
      id,
      { title, info, director, releaseYear, genre, rating },
      { new: true, runValidators: true }
    );
    if (!updatedMovie) throw new Error("Movie not found");
    res.status(200).json({
      status: "success",
      message: "Movie updated successfully",
      data: updatedMovie,
    });

    // res.status(200).json({
    //   status: "success",
    //   message: "Movie updated successfully",
    //   data: movie,
    // });
  } catch (error) {
    console.error("Error updating movie:", error);
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

module.exports = updateMovie;
