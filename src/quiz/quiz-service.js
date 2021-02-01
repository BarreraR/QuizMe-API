const QuizService = {
  getQuiz(db) {
    return db
      .from('question')
      .select('*')
  },

  getCategories(db) {
    return db
      .from('category')
      .select('*')
  },

  getQuizWithCategory(db, category) {
    const category_id = db('category')
      .select('category.id')
      .where('category', category)
      .first()

    return db
      .from('question')
      .select('*')
      .where('question.category_id', category_id)
  },

  postAnswer(db, user_id, answered) {
    return db
      .insert({
        'answered': answered.answer,
        'user_id': user_id,
        'category_id': answered.category_id,
        'question_id': answered.question_id,
        'correct': answered.correct
      })
      .into('answer')
  },

  getCorrectAnswer(db, question_id){
    return db
      .from('question')
      .select('question.correct')
      .where('question.id', question_id)
      .first()
  },

}

module.exports = QuizService