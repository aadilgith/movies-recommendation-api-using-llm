const deleteMovie = async (req, res) => {
  const mongoose = require("mongoose");
  const Movie = mongoose.model("movie");
  const { id } = req.params;
  console.log({ id });
  // try {
  //   // Check if the movie already exists in the database
  //   const movie = await Movie.findById(id);
  //   console.log(movie);
  //   if (!movie) throw new Error("Movie not found");
  // } catch (error) {
  //   console.error("Error getting movie:", error);
  //   return res.status(404).json({
  //     status: "error",
  //     message: error.message,
  //   });
  // }
  // try {
  //   // Delete the movie
  //   await Movie.findByIdAndDelete(id);

  //   res.status(200).json({
  //     status: "success",
  //     message: "Movie deleted successfully",
  //     data: null,
  //   });
  // } catch (error) {
  //   console.error("Error deleting movie:", error);
  //   return res.status(500).json({
  //     status: "error",
  //     message: error.message,
  //   });
  // }

  // first get the movie by id
  try {
    const getMovie = await Movie.findOne({ _id: id });
    if (!getMovie) throw new Error("This movie does not exist");
  } catch (error) {
    console.error("Error getting movie:", error);
    return res.status(404).json({
      status: "error",
      message: error.message,
    });
  }
  try {
    await Movie.deleteOne({ _id: id });
  } catch (error) {
    console.error("Error deleting movie:", error);
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
  res.status(200).json({
    status: "success",
    message: "Movie deleted successfully",
  });
};

module.exports = deleteMovie;
