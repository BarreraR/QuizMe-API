const knex = require('knex')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

/**
 * create a knex instance connected to postgres
 * @returns {knex instance}
 */
function makeKnexInstance() {
  return knex({
    client: 'pg',
    connection: process.env.TEST_DATABASE_URL,
  })
}

/**
 * create a knex instance connected to postgres
 * @returns {array} of user objects
 */
function makeUsersArray() {
  return [
    {
      id: 1,
      username: 'test-user-1',
      password: 'password',
      admin: true,
    },
    {
      id: 2,
      username: 'test-user-2',
      password: 'password',
      admin: false,
    },
  ]
}

/**
 * make a bearer token with jwt for authorization header
 * @param {object} user - contains `id`, `username`
 * @param {string} secret - used to create the JWT
 * @returns {string} - for HTTP authorization header
 */
function makeAuthHeader(user, secret = process.env.JWT_SECRET) {
  const token = jwt.sign({ user_id: user.id, admin: user.admin }, secret, {
    subject: user.username,
    expiresIn: process.env.JWT_EXPIRY,
    algorithm: 'HS256',
  })
  return `Bearer ${token}`
}

/**
 * remove data from tables and reset sequences for SERIAL id fields
 * @param {knex instance} db
 * @returns {Promise} - when tables are cleared
 */
function cleanTables(db) {
  return db.transaction(trx =>
    trx.raw(
      `TRUNCATE
        "answer",
        "question",
        "category",
        "user"`
      )
      .then(() =>
        Promise.all([
          trx.raw(`ALTER SEQUENCE answer_id_seq minvalue 0 START WITH 1`),
          trx.raw(`ALTER SEQUENCE question_id_seq minvalue 0 START WITH 1`),
          trx.raw(`ALTER SEQUENCE category_id_seq minvalue 0 START WITH 1`),
          trx.raw(`ALTER SEQUENCE user_id_seq minvalue 0 START WITH 1`),
          trx.raw(`SELECT setval('answer_id_seq', 0)`),
          trx.raw(`SELECT setval('question_id_seq', 0)`),
          trx.raw(`SELECT setval('category_id_seq', 0)`),
          trx.raw(`SELECT setval('user_id_seq', 0)`),
        ])
      )
  )
}

/**
 * insert users into db with bcrypted passwords and update sequence
 * @param {knex instance} db
 * @param {array} users - array of user objects for insertion
 * @returns {Promise} - when users table seeded
 */
function seedUsers(db, users) {
  const preppedUsers = users.map(user => ({
    ...user,
    password: bcrypt.hashSync(user.password, 1)
  }))
  return db.transaction(async trx => {
    await trx.into('user').insert(preppedUsers)

    await trx.raw(
      `SELECT setval('user_id_seq', ?)`,
      [users[users.length - 1].id],
    )
  })
}

/**
 * generate fixtures of categories and questions 
 * @param {object} user - contains `id` property
 * @returns {Array(questions, categories, answers)} - arrays of languages and words
 */
function makeCQA(user) {
  const categories = [
    {
      id: 1,
      category: 'hooks'
    },
    {
      id: 2,
      category: 'state'
    },
  ]

  // "id", "question", "answer1", "answer2", "answer3", "answer4", "correct", "category_id"
  const questions = [
    {
      id: 1, 
      question: 'Question 1',
      answer1: 'Answer 1',
      answer2: 'Answer 2',
      answer3: 'Answer 3',
      answer4: 'Answer 4',
      correct: 'Answer 1',
      category_id: 1
    },
    {
      id: 2, 
      question: 'Question 2',
      answer1: 'Answer 1',
      answer2: 'Answer 2',
      answer3: 'Answer 3',
      answer4: 'Answer 4',
      correct: 'Answer 3',
      category_id: 2
    },
  ]

  // "id", "answered", "correct", "question_id", "category_id", "user_id"
  const answers = [
    {
      id: 1,
      answered: 'Answer 1',
      correct: true,
      question_id: 1,
      category_id: 1,
      user_id: user.id
    },
    {
      id: 2,
      answered: 'Answer 1',
      correct: false,
      question_id: 1,
      category_id: 1,
      user_id: user.id
    },
  ]
  
  return [categories, questions, answers]
}

async function seedUCQA(db, users, categories, questions, answers) {
  await seedUsers(db, users)

  await db.transaction(async trx => {
    await trx.into('category').insert(categories)
    await trx.into('question').insert(questions)
    await trx.into('answer').insert(answers)

    await Promise.all([
      trx.raw(
        `SELECT setval('category_id_seq', ?)`,
        [categories[categories.length - 1].id],
      ),
      trx.raw(
        `SELECT setval('question_id_seq', ?)`,
        [questions[questions.length - 1].id],
      ),
      trx.raw(
        `SELECT setval('answer_id_seq', ?)`,
        [answers[answers.length - 1].id],
      ),
    ])
  })
}

module.exports = {
  makeKnexInstance,
  makeUsersArray,
  makeCQA,
  makeAuthHeader,
  cleanTables,
  seedUsers,
  seedUCQA,
}
