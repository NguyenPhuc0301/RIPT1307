const Question = require('../models/Question');

// Lấy tất cả câu hỏi
const getAllQuestions = async (req, res) => {
  try {
    const questions = await Question.find();  // Lấy tất cả câu hỏi
    res.status(200).json({ questions });
  } catch (error) {
    res.status(500).json({ message: 'Đã xảy ra lỗi khi lấy danh sách câu hỏi', error: error.message });
  }
};

// Đăng bài mới
const postQuestion = async (req, res) => {
  const { title, content, tags, userId, username } = req.body;

  if (!title || !content || !tags || !userId || !username) {
    return res.status(400).json({ message: 'Vui lòng điền đầy đủ thông tin' });
  }

  try {
    const newQuestion = new Question({
      title,
      content,
      tags,
      username,
      userId,
    });

    await newQuestion.save();
    res.status(200).json({
      message: 'Đăng bài thành công',
      question: newQuestion,
    });
  } catch (error) {
    res.status(500).json({ message: 'Đã xảy ra lỗi khi đăng bài', error: error.message });
  }
};

// Lấy thông tin bài viết theo ID
const getQuestionById = async (req, res) => {
  const { id } = req.params;

  try {
    const question = await Question.findById(id);  // Tìm bài viết theo ID
    if (!question) {
      return res.status(404).json({ message: 'Bài viết không tồn tại' });
    }
    res.status(200).json({ question });
  } catch (error) {
    res.status(500).json({ message: 'Đã xảy ra lỗi khi lấy bài viết', error: error.message });
  }
};

module.exports = {
  postQuestion,
  getAllQuestions,  // Thêm hàm lấy tất cả câu hỏi
  getQuestionById,
};
