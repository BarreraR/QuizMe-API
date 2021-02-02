module.exports = {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  DATABASE_URL: process.env.DATABASE_URL
    || 'postgresql://dunder_mifflin@localhost/quizme',
  TEST_DATABASE_URL: process.env.TETS_DATABASE_URL 
    || 'postgresql://dunder_mifflin@localchost/quizme_test',
  JWT_SECRET: process.env.JWT_SECRET || 'change-this-secret',
  JWT_EXPIRY: process.env.JWT_EXPIRY || '3h',
}
