import Question from "../models/Question.js";

export const getQuestions = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;

    const questions = await Question.find().limit(limit);

    res.json(questions);
  } catch (error) {
    console.error("Error fetching questions:", error);
    res.status(500).json({ message: "Server error" });
  }
};
