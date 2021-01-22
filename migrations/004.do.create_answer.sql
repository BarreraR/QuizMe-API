CREATE TABLE "answer" (
  "id" SERIAL PRIMARY KEY,
  "question" TEXT NOT NULL,
  "answered" TEXT NOT NULL,
  "correct" BOOLEAN NOT NULL,
  "category_id" INTEGER REFERENCES "category"(id)
    ON DELETE CASCADE NOT NULL,
  "user_id" INTEGER REFERENCES "user"(id)
    ON DELETE CASCADE NOT NULL
);
