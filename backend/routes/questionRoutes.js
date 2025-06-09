// ✅ Sửa lại như sau:
const express = require('express');
const router = express.Router();
const { postQuestion, getAllQuestions, getQuestionById } = require('../controllers/questionController');

router.post('/', postQuestion);
router.get('/', getAllQuestions);
router.get('/:id', getQuestionById);

module.exports = router;
