const QuizService = {
  getQuestions(db, user_id) {
    return db
      .from('questions')
      .select(
        'questions.question'
      )
      .where('language.user_id', user_id)
      .first()
  },

}

module.exports = LanguageService