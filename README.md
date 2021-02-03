# Quiz Me API Server

Live Link: https://capstone3-quizme.herokuapp.com/api

---
## Description:

API for [QuizMe](https://quizme.vercel.app/) application. The API stores quiz categories, questions, and user answers to collect data and allow administrators of the web page to create informed decisions about their teaching practices based on student's responses.  User registration and login required. Once logged in, token is provided which contains user information and whether a user is an admin. Without the token, an unauthorized request message will be returned.

---
## Stack Used:

Node, PostgreSQL, Express

---
## API Documentation: 

BASE URL: https://capstone3-quizme.herokuapp.com/api

### GET /quiz

*Responds with an array of all quiz questions.*

Example request:
```
GET https://capstone3-quizme.herokuapp.com/api/quiz
  HEADERS: 
    {
      'content-type': 'application/json',
      'authorization': `bearer YOUR_LOGIN_TOKEN`,
    }
```
Example response: 
```
STATUS: 200 OK
{
  quiz: [
    {
      'id': 1,
      'question': 'First Question',
      'answer1': 'First Answer',
      'answer2': 'Second Answer',
      'answer3': 'Third Answer',
      'answer4': 'Fourth Answer',
      'correct': 'First Answer',
      'category_id': 1
    },
    ...
  ]
}
```

---
### GET /quiz/category

*Responds with an array of all quiz categories.*

Example request:
```
GET https://capstone3-quizme.herokuapp.com/api/quiz/category
  HEADERS: 
    {
      'content-type': 'application/json',
      'authorization': `bearer YOUR_LOGIN_TOKEN`,
    }
```

Example response: 
```
STATUS: 200 OK
{
  categories: [
    {
      'id': 1,
      'category': 'hooks'
    },
    ...
  ]
}
```

---
### GET /quiz/category/:category

*Responds with an array of category specific quiz questions. Must provide desired category as parameter.*

Example request:
```
GET https://capstone3-quizme.herokuapp.com/api/quiz/category/hooks
  HEADERS: 
    {
      'content-type': 'application/json',
      'authorization': `bearer YOUR_LOGIN_TOKEN`,
    }
```

Example response:
```
STATUS: 200 OK
{
  quiz: [
    {
      'id': 1,
      'question': 'First Question',
      'answer1': 'First Answer',
      'answer2': 'Second Answer',
      'answer3': 'Third Answer',
      'answer4': 'Fourth Answer',
      'correct': 'First Answer',
      'category_id': 1
    },
    ...
  ]
}
```

---
### GET /quiz/answers

*Responds with an array of logged in user's answers.*

Example request:
```
GET https://capstone3-quizme.herokuapp.com/api/quiz/answers
  HEADERS: 
    {
      'content-type': 'application/json',
      'authorization': `bearer YOUR_LOGIN_TOKEN`,
    }
```

Example response:
```
STATUS: 200 OK
{
  answers: [
    {
      'id': 1,
      'answered': 'First Answer',
      'correct': true,
      'question_id': 1,
      'category_id': 1,
      'user_id': 1,
    },
    ...
  ]
}
```

---
### POST /quiz

*Responds true or false based.*

Example request: 
```
POST https://capstone3-quizme.herokuapp.com/api/quiz
  HEADERS: 
    {
      'content-type': 'application/json',
      'authorization': `bearer YOUR_LOGIN_TOKEN`,
    },
  REQ BODY: 
    {
      'answer': 'First Answer',
      'category_id': 1,
      'question_id': 1 
    }
```
Example response: 
```
STATUS: 200 OK
{ 
  'correct': true 
}
```

---
### POST /admin/category

*Responds with new table row data.*

Example request: 
```
POST https://capstone3-quizme.herokuapp.com/api/admin/category
  HEADERS: 
    {
      'content-type': 'application/json',
      'authorization': `bearer YOUR_LOGIN_TOKEN`,
    },
  REQ BODY: 
    {
      'category': 'state'
    }
```
Example response: 
```
STATUS: 200 OK
{
  'id': 3,
  'category': 'state'
}
```

---
### DELETE /admin/category

*Responds with success string.*

Example request: 
```
POST https://capstone3-quizme.herokuapp.com/api/admin/category
  HEADERS: 
    {
      'content-type': 'application/json',
      'authorization': `bearer YOUR_LOGIN_TOKEN`,
    },
  REQ BODY: 
    {
      'id': '1'
    }
```
Example response: 
```
STATUS: 200 OK
{
  'status': `Category with id '1' deleted`
}
```

---
### POST /admin/question

*Responds with new table row data.*

Example request: 
```
POST https://capstone3-quizme.herokuapp.com/api/admin/question
  HEADERS: 
    {
      'content-type': 'application/json',
      'authorization': `bearer YOUR_LOGIN_TOKEN`,
    },
  REQ BODY: 
    {
      'question': 'Question 3',
      'answer1': 'First Answer',
      'answer2': 'Second Answer',
      'answer3': 'Third Answer',
      'answer4': 'Fourth Answer',
      'correct': 'First Answer',
      'category_id': 1
    }
```
Example response: 
```
STATUS: 200 OK
{
  'id': 3,
  'question': 'Question 3',
    'answer1': 'First Answer',
    'answer2': 'Second Answer',
    'answer3': 'Third Answer',
    'answer4': 'Fourth Answer',
    'correct': 'First Answer',
    'category_id': 1
}
```

---
### DELETE /admin/question

*Responds with success string.*

Example request: 
```
POST https://capstone3-quizme.herokuapp.com/api/admin/question
  HEADERS: 
    {
      'content-type': 'application/json',
      'authorization': `bearer YOUR_LOGIN_TOKEN`,
    },
  REQ BODY: 
    {
      'id': '1'
    }
```
Example response: 
```
STATUS: 200 OK
{
  'status': `Question with id '1' deleted`
}
```

---
### POST /auth/login

*Responds with the created token after successfully logging in. This token is required for most CRUD functions.*

Example request:
```
POST https://capstone3-quizme.herokuapp.com/api/auth/login
  HEADERS: 
    {
      'content-type': 'application/json',
    },
  REQ BODY: 
    {
      'username': 'User1',
      'password': 'Password@1'
    }
```
Example response:
```
STATUS: 200 OK
{
  "authToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImZpcnN0X25hbWUiOiJUZXN0IiwibGFzdF9uYW1lIjoiVXNlciIsImlhdCI6MTYwNzM3MDYyOSwic3ViIjoiVXNlcjEifQ.TIezoUW8z7cku11lsr4sazYk7Bpc3OwCUggNf1c4Puk"
}
```

---
### POST /users

*Responds with user if successfully created.*

Example request:
```
POST https://capstone3-quizme.herokuapp.com/api/users
  HEADERS: 
    {
      'content-type': 'application/json',
    },
  REQ BODY: 
    {
      'first_name': 'First',
      'last_name': 'Last',
      'username': 'Username1',
      'password': 'Password@1'
    }
```
Example response:
```
STATUS: 201 Created
{
  'id': 2,
  'first_name': 'First',
  'last_name': 'Last',
  'username': 'Username1',
}
```