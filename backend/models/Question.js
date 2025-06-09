const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  tags: { type: [String], required: true },
  username: { type: String, required: true },  // Thêm trường người đăng
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },  // Thêm ID người đăng
  date: { type: Date, default: Date.now },
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
