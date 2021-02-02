const app = require('../src/app')
const helpers = require('./test-helpers')

describe('Admin Endpoints', function () {
  let db

  const testUsers = helpers.makeUsersArray()
  const testUser = testUsers[0]
  const [testCategories, testQuestions, testAnswers] = helpers.makeCQA(testUser)

  before('make knex instance', () => {
    db = helpers.makeKnexInstance()
    app.set('db', db)
  })

  after('disconnect from db', () => db.destroy())

  before('cleanup', () => helpers.cleanTables(db))

  afterEach('cleanup', () => helpers.cleanTables(db))

  describe(`POST /api/admin/category`, () => {
    beforeEach('post category', () =>
      helpers.seedUCQA(
        db,
        testUsers,
        testCategories,
        testQuestions,
        testAnswers
      )
    )
      
    it(`responds with 200 and new category row`, () => {
      return supertest(app)
        .post('/api/admin/category')
        .set('Authorization', helpers.makeAuthHeader(testUser))
        .send({category: 'apples'})
        .expect(200)
        .expect((res) => expect(res.body.category).to.eql({ id: 3, category: 'apples' }))
    })
  })

  describe(`DELETE /api/admin/category`, () => {
    beforeEach('delete a category', () =>
      helpers.seedUCQA(
        db,
        testUsers,
        testCategories,
        testQuestions,
        testAnswers
      )
    )
      
    it(`responds with 200 and deletes a category`, () => {
      return supertest(app)
        .delete('/api/admin/category')
        .set('Authorization', helpers.makeAuthHeader(testUser))
        .send({id: 1})
        .expect(200)
        .expect((res) => expect(res.body.status)
          .to.eql(`Category with id '1' deleted`))
    })
  })

  describe(`POST /api/admin/question`, () => {
    beforeEach('create new question', () =>
      helpers.seedUCQA(
        db,
        testUsers,
        testCategories,
        testQuestions,
        testAnswers
      )
    )
    
    const newQuestion = { 
      question: "New Question", 
      answer1: "Answer 1", 
      answer2: "Answer 2", 
      answer3: "Answer 3", 
      answer4: "Answer 4", 
      correct: "Answer 1", 
      category_id: 2 
    }

    it(`responds with 200 and new question row`, () => {
      return supertest(app)
        .post('/api/admin/question')
        .set('Authorization', helpers.makeAuthHeader(testUser))
        .send(newQuestion)
        .expect(200)
        .expect((res) => expect(res.body.question).to.eql({...newQuestion, id: 3}))
    })
  })

  describe(`DELETE /api/admin/question`, () => {
    beforeEach('delete a question', () =>
      helpers.seedUCQA(
        db,
        testUsers,
        testCategories,
        testQuestions,
        testAnswers
      )
    )

    it(`responds with 200 and deletes a question`, () => {
      return supertest(app)
        .delete('/api/admin/question')
        .set('Authorization', helpers.makeAuthHeader(testUser))
        .send({id: 1})
        .expect(200)
        .expect((res) => expect(res.body.status)
          .to.eql(`Question with id '1' deleted`))
    })
  })
})
