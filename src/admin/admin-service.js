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

  postCategory(db, category){
    return db
      .insert({ 'category': category })
      .into('category')
  },

  deleteCategory(db, id) {
    return db('category')
      .delete()
      .where({id})
  }
}

module.exports = AdminService
