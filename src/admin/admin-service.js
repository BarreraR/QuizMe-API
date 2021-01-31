const AdminService = {
  postCategory(db, category){
    console.log(category)
    return db
      .insert({ 'category': category })
      .into('category')
  },
}

module.exports = AdminService
