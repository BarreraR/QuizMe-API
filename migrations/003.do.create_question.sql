CREATE TABLE "question" (
  "id" SERIAL PRIMARY KEY,
  "question" TEXT NOT NULL,
  "answer1" TEXT NOT NULL,
  "answer2" TEXT NOT NULL,
  "answer3" TEXT NOT NULL,
  "answer4" TEXT NOT NULL,
  "correct" TEXT NOT NULL,
  "category_id" INTEGER REFERENCES "category"(id)
    ON DELETE CASCADE NOT NULL
);
