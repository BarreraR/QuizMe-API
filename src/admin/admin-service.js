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
}

module.exports = AdminService
