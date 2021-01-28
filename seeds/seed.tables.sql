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
  (1, 'question', 'first answer', 'second answer', 'third answer', 'fourth answer', 'first answer', 1),
  (2, 'question', 'first answer', 'second answer', 'third answer', 'fourth answer', 'first answer', 1),
  (3, 'question', 'first answer', 'second answer', 'third answer', 'fourth answer', 'first answer', 1),
  (4, 'question', 'first answer', 'second answer', 'third answer', 'fourth answer', 'first answer', 1),
  (5, 'question', 'first answer', 'second answer', 'third answer', 'fourth answer', 'first answer', 1),
  (6, 'question', 'first answer', 'second answer', 'third answer', 'fourth answer', 'first answer', 2),
  (7, 'question', 'first answer', 'second answer', 'third answer', 'fourth answer', 'first answer', 2),
  (8, 'question', 'first answer', 'second answer', 'third answer', 'fourth answer', 'first answer', 2),
  (9, 'question', 'first answer', 'second answer', 'third answer', 'fourth answer', 'first answer', 2),
  (10, 'question', 'first answer', 'second answer', 'third answer', 'fourth answer', 'first answer', 2),
  (11, 'question', 'first answer', 'second answer', 'third answer', 'fourth answer', 'first answer', 3),
  (12, 'question', 'first answer', 'second answer', 'third answer', 'fourth answer', 'first answer', 3),
  (13, 'question', 'first answer', 'second answer', 'third answer', 'fourth answer', 'first answer', 3),
  (14, 'question', 'first answer', 'second answer', 'third answer', 'fourth answer', 'first answer', 3),
  (15, 'question', 'first answer', 'second answer', 'third answer', 'fourth answer', 'first answer', 3),
  (16, 'question', 'first answer', 'second answer', 'third answer', 'fourth answer', 'first answer', 4),
  (17, 'question', 'first answer', 'second answer', 'third answer', 'fourth answer', 'first answer', 4),
  (18, 'question', 'first answer', 'second answer', 'third answer', 'fourth answer', 'first answer', 4),
  (19, 'question', 'first answer', 'second answer', 'third answer', 'fourth answer', 'first answer', 4),
  (20, 'question', 'first answer', 'second answer', 'third answer', 'fourth answer', 'first answer', 4);

-- because we explicitly set the id fields
-- update the sequencer for future automatic id setting
SELECT setval('question_id_seq', (SELECT MAX(id) from "question"));
SELECT setval('category_id_seq', (SELECT MAX(id) from "category"));
SELECT setval('user_id_seq', (SELECT MAX(id) from "user"));

COMMIT;
