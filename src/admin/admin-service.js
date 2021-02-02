const AdminService = {
  hasCategory(db, category){
    return db('category')
      .where({ category })
      .first()
      .then(category => !!category)
  },

  hasCategoryId(db, id){
    return db('category')
      .where({ id })
      .first()
      .then(id => !!id)
  },

  hasQuestionId(db, id){
    return db('question')
      .where({ id })
      .first()
      .then(id => !!id)
  },

  postCategory(db, category){
    return db
      .insert({ 'category': category })
      .into('category')
      .then(() => db('category')
        .select('*')
        .where('category', category))
  },

  deleteCategory(db, id) {
    return db('category')
      .delete()
      .where({id})
  },

  putCategory(db, data){
    return db('category')
      .update('category',data.category)
      .where('id', data.id)
  },

  postQuestion(db, question){
    return db('question')
      .insert(question)
  },

  deleteQuestion(db, id) {
    return db('question')
      .delete()
      .where({id})
  },

  putQuestion(db, data){
    return db('question')
      .update({
        'question': data.question,
        'answer1': data.answer1,
        'answer2': data.answer2,
        'answer3': data.answer3,
        'answer4': data.answer4,
        'correct': data.correct,
        'category_id': data.category_id
      })
      .where('id', data.id)
  },
}

module.exports = AdminService
