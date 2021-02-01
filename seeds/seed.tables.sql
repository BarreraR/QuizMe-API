BEGIN;

TRUNCATE
  "answer",
  "question",
  "category",
  "user";

INSERT INTO "user" ("id", "username", "password", "admin")
VALUES
  (
    1,
    'admin',
    -- password = "pass"
    '$2a$10$fCWkaGbt7ZErxaxclioLteLUgg4Q3Rp09WW0s/wSLxDKYsaGYUpjG',
    TRUE
  );

INSERT INTO "category" ("id", "category")
VALUES
  (1, 'router'),
  (2, 'state'),
  (3, 'context'),
  (4, 'hooks');

INSERT INTO "question" ("id", "question", "answer1", "answer2", "answer3", "answer4", "correct", "category_id")
VALUES
  (1, 'question 1', 'a', 'b', 'c', 'd', 'c', 1),
  (2, 'question 2', 'first answer', 'second answer', 'third answer', 'fourth answer', 'first answer', 1),
  (3, 'question 3', 'e', 'f', 'g', 'h', 'h', 1),
  (4, 'question 4', 'first answer', 'second answer', 'third answer', 'fourth answer', 'first answer', 1),
  (5, 'question 5', 'first answer', 'second answer', 'third answer', 'fourth answer', 'first answer', 1),
  (6, 'question 6', 'first answer', 'second answer', 'third answer', 'fourth answer', 'first answer', 2),
  (7, 'question 7', 'first answer', 'second answer', 'third answer', 'fourth answer', 'first answer', 2),
  (8, 'question 8', 'first answer', 'second answer', 'third answer', 'fourth answer', 'first answer', 2),
  (9, 'question 9', 'first answer', 'second answer', 'third answer', 'fourth answer', 'first answer', 2),
  (10, 'question 10', 'first answer', 'second answer', 'third answer', 'fourth answer', 'first answer', 2),
  (11, 'question 11', 'first answer', 'second answer', 'third answer', 'fourth answer', 'first answer', 3),
  (12, 'question 12', 'first answer', 'second answer', 'third answer', 'fourth answer', 'first answer', 3),
  (13, 'question 13', 'first answer', 'second answer', 'third answer', 'fourth answer', 'first answer', 3),
  (14, 'question 14', 'first answer', 'second answer', 'third answer', 'fourth answer', 'first answer', 3),
  (15, 'question 15', 'first answer', 'second answer', 'third answer', 'fourth answer', 'first answer', 3),
  (16, 'question 16', 'first answer', 'second answer', 'third answer', 'fourth answer', 'first answer', 4),
  (17, 'question 17', 'first answer', 'second answer', 'third answer', 'fourth answer', 'first answer', 4),
  (18, 'question 18', 'first answer', 'second answer', 'third answer', 'fourth answer', 'first answer', 4),
  (19, 'question 19', 'first answer', 'second answer', 'third answer', 'fourth answer', 'first answer', 4),
  (20, 'question 20', 'first answer', 'second answer', 'third answer', 'fourth answer', 'first answer', 4);

INSERT INTO "answer" ("id", "answered", "correct", "question_id", "category_id", "user_id")
VALUES 
  (1, 'first answer', TRUE, 1, 1, 1);

-- because we explicitly set the id fields
-- update the sequencer for future automatic id setting
SELECT setval('question_id_seq', (SELECT MAX(id) from "question"));
SELECT setval('category_id_seq', (SELECT MAX(id) from "category"));
SELECT setval('user_id_seq', (SELECT MAX(id) from "user"));
SELECT setval('answer_id_seq', (SELECT MAX(id) from "answer"));

COMMIT;
