const Question = require("../models/Question");


exports.addQuestion = async (req, res) => {
  try {
    const { label, options } = req.body;
    const newQuestion = new Question({ label, options });
    await newQuestion.save();
    res.status(201).json({ message: "Question added successfully", newQuestion });
  } catch (error) {
    res.status(500).json({ error: "Failed to add question", details: error.message });
  }
};


exports.getQuestions = async (req, res) => {
  try {
    const questions = await Question.find();
    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch questions", details: error.message });
  }
};


exports.getQuestionById = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    if (!question) return res.status(404).json({ error: "Question not found" });
    res.status(200).json(question);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch question", details: error.message });
  }
};


exports.updateQuestion = async (req, res) => {
  try {
    const { label, options } = req.body;
    const updatedQuestion = await Question.findByIdAndUpdate(
      req.params.id,
      { label, options },
      { new: true, runValidators: true }
    );
    if (!updatedQuestion) return res.status(404).json({ error: "Question not found" });
    res.status(200).json({ message: "Question updated successfully", updatedQuestion });
  } catch (error) {
    res.status(500).json({ error: "Failed to update question", details: error.message });
  }
};


exports.deleteQuestion = async (req, res) => {
  try {
    const deletedQuestion = await Question.findByIdAndDelete(req.params.id);
    if (!deletedQuestion) return res.status(404).json({ error: "Question not found" });
    res.status(200).json({ message: "Question deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete question", details: error.message });
  }
};


exports.deleteAllQuestions = async (req, res) => {
    try {
      const result = await Question.deleteMany({});
      res.status(200).json({ message: "All questions deleted successfully", deletedCount: result.deletedCount });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete all questions", details: error.message });
    }
  };
  
