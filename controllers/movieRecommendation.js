//const getMovieRecommendations = async (req, res) => {
//   const mongoose = require("mongoose");
//   const Movie = mongoose.model("movie");
//   const { genre, rating } = req.query;
//   console.log(genre, rating);
//   try {
//     // Validate the input data
//     if (!genre) throw new Error("Genre is required");
//     if (!rating) throw new Error("Rating is required");
//     if (rating < 0 || rating > 10)
//       throw new Error("Movie rating must be between 0 and 10");
//   } catch (error) {
//     console.error("Error getting movie recommendations:", error);
//     return res.status(400).json({
//       status: "error",
//       message: error.message,
//     });
//   }
//   try {
//     // Get the movies by genre and rating
//     const movies = await Movie.find({
//       genre: { $regex: genre, $options: "i" },
//       rating: { $gte: rating },
//     }).sort({ rating: -1 });
//     if (!movies || movies.length === 0)
//       throw new Error("No movies found for the given genre and rating");
//     res.status(200).json({
//       status: "success",
//       message: "Movies found successfully",
//       data: movies,
//     });
//   }
//   catch (error) {
//     console.error("Error getting movie recommendations:", error);
//     return res.status(500).json({
//       status: "error",
//       message: error.message,
//     });
//   }
//   res.status(200).json({
//     status: "success",
//     message: "Movie recommendations found successfully",
//     data: [
//       {
//         title: "Inception",
//         genre: "Sci-Fi",
//         rating: 8.8,
//       },
//       {
//         title: "The Dark Knight",
//         genre: "Action",
//         rating: 9.0,
//       },
//       {
//         title: "Interstellar",
//         genre: "Sci-Fi",
//         rating: 8.6,
//       },
//     ],
//   });
//const client = new OpenAI();
// const { data } = await client.chat.completions.create({
//     model: "gpt-4.1",
//     messages: [
//     {
//         role: "user",
//         content:
//         "Give me a list of 5 movies with their genre and rating, and a short description of each movie.",
//     },
//     ],
// });
//   console.log(data.choices[0].message.content);
//   res.status(200).json({
//     status: "success",
//     message: "Movie recommendations found successfully",
//     data: data.choices[0].message.content,
//   });

//openai API setup
// const { OpenAI } = require("openai");
// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });
// const getMovieRecommendations = async (req, res) => {
//   try {
//     const response = await openai.chat.completions.create({
//       model: "",
//       messages: [
//         {
//           role: "user",
//           content:
//             "Give me a list of 5 movies with their genre and rating, and a short description of each movie.",
//         },
//       ],
//     });
//     return response.choices[0].message.content.trim();
//   } catch (error) {
//     console.error("Error in OpenAI API request:", error.message);
//     throw new Error("Failed to get response from OpenAI.");
//   }
// };

//Google Gemini API setup old module:
const genAI = require("@google/generative-ai");

const getMovieRecommendations = async (req, res) => {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    const genAIClient = new genAI.GoogleGenerativeAI(apiKey);
    const model = genAIClient.getGenerativeModel({ model: "gemini-2.0-flash" });

    const userPrompt = `
Give me a list of 5 movies with their title genre and rating, and a short description of each movie and their release year in the following strict JSON format only:
[
  {
    "title": "Movie Title",
    "genre": "Genre",
    "rating": 8.5
  }
]
Do not include any explanations or markdown formatting.
    `;

    const result = await model.generateContent(userPrompt);
    const responseText = result.response.text();

    // Extract JSON block from response (in case it's wrapped in ```json or has extra text)
    const jsonMatch = responseText.match(
      /```json\s*([\s\S]*?)```|($begin:math:display$.*$end:math:display$)/
    );
    let rawJson = jsonMatch ? jsonMatch[1] || jsonMatch[2] : responseText;

    let movieData;
    try {
      movieData = JSON.parse(rawJson);
    } catch (parseError) {
      console.error("Failed to parse JSON from Gemini response:", rawJson);
      return res.status(500).json({
        status: "error",
        message: "Invalid JSON format received from Gemini.",
      });
    }

    return res.status(200).json({
      status: "success",
      message: "Movie recommendations found successfully",
      data: movieData,
    });
  } catch (error) {
    console.error("Error in Google Gemini API request:", error.message);
    return res.status(500).json({
      status: "error",
      message: "Failed to get response from Google Gemini.",
    });
  }
};
module.exports = getMovieRecommendations;
