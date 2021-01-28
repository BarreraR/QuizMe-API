const QuizService = {
  getQuestions(db) {
    return db
      .from('question')
      .select(
        'question.question',
        'question.answer1',
        'question.answer2',
        'question.answer3',
        'question.answer4',
        'question.correct',
        'question.category_id',
      )
  },

}

module.exports = QuizService