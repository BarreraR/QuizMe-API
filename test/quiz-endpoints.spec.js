const app = require('../src/app')
const helpers = require('./test-helpers')

describe('Quiz Endpoints', function () {
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

  describe(`GET /api/quiz`, () => {
    beforeEach('get all quiz questions', () =>
      helpers.seedUCQA(
        db,
        testUsers,
        testCategories,
        testQuestions,
        testAnswers
      )
    )
      
    it(`responds with 200 and all quiz questions`, () => {
      return supertest(app)
        .get('/api/quiz')
        .set('Authorization', helpers.makeAuthHeader(testUser))
        .expect(200)
        .expect((res) => expect(res.body.quiz).to.eql(testQuestions))
    })
  })

  describe(`GET /api/quiz/category`, () => {
    beforeEach('get all categories', () =>
      helpers.seedUCQA(
        db,
        testUsers,
        testCategories,
        testQuestions,
        testAnswers
      )
    )
      
    it(`responds with 200 and all categories`, () => {
      return supertest(app)
        .get('/api/quiz/category')
        .set('Authorization', helpers.makeAuthHeader(testUser))
        .expect(200)
        .expect((res) => expect(res.body.categories).to.eql(testCategories))
    })
  })

  describe(`GET /api/quiz/category/:category`, () => {
    beforeEach('get all questions for a specific category', () =>
      helpers.seedUCQA(
        db,
        testUsers,
        testCategories,
        testQuestions,
        testAnswers
      )
    )
      
    it(`responds with 200 and all questions for a specific category`, () => {
      return supertest(app)
        .get('/api/quiz/category/hooks')
        .set('Authorization', helpers.makeAuthHeader(testUser))
        .expect(200)
        .expect((res) => expect(res.body.quiz).to.eql([testQuestions[0]]))
    })
  })

  describe(`POST /api/quiz`, () => {
    beforeEach('post answer', () =>
      helpers.seedUCQA(
        db,
        testUsers,
        testCategories,
        testQuestions,
        testAnswers
      )
    )
    
    const answered = {
      answer: 'Answer 1',
      category_id: 1,
      question_id: 1,
    }

    it(`responds with 200 and posts answer`, () => {
      return supertest(app)
        .post('/api/quiz')
        .set('Authorization', helpers.makeAuthHeader(testUser))
        .send({answered})
        .expect(200)
        .expect((res) => expect(res.body.correct).to.eql(true))
    })
  })

  describe(`GET /api/quiz/answers`, () => {
    beforeEach('get all answers', () =>
      helpers.seedUCQA(
        db,
        testUsers,
        testCategories,
        testQuestions,
        testAnswers
      )
    )

    it(`responds with 200 and gets all user specific answers`, () => {
      return supertest(app)
        .get('/api/quiz/answers')
        .set('Authorization', helpers.makeAuthHeader(testUser))
        .expect(200)
        .expect((res) => expect(res.body.answers).to.eql(testAnswers))
    })
  })

})
