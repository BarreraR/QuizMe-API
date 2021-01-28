const QuizService = {
  getQuiz(db) {
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

  getQuizWithCategory(db, category) {
    const category_id = db('category')
      .select('category.id')
      .where('category', category)
      .first()

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
      .where('question.category_id', category_id)
  },

}

module.exports = QuizService