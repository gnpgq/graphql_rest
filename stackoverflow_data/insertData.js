import { generateData } from "../stackoverflow_data/dataGenerator.js";
import pgPromise from "pg-promise";

const config = {
  host: "localhost",
  port: 5432,
  database: "stackoverflow_db",
  user: "gnpgq",
  max: 30, // use up to 30 connections
};

const pgp = pgPromise({ capSQL: true });

export const answerColumns = new pgp.helpers.ColumnSet(
  ["id",
  "question_id",
  "body",
  "user_id",
  "accepted",
  "score",
  "status",
  "created_at"
],
  {
    table: "answer",
  }
);

export const questionColumns = new pgp.helpers.ColumnSet(
  ["id",
  "owner_id",
  "view_count",
  "score",
  "title",
  "is_answered",
  "answer_count",
  "last_activity_date",
  "creation_date",
  "last_edit_date",
  "content_license",
  "link",
  "body"
],
  {
    table: "question",
  }
);

export const userColumns = new pgp.helpers.ColumnSet(
  ["id",
  "is_employee",
  "accept_rate",
  "location",
  "display_name",
  "reputation",
  "creation_date",
  "user_type",
  "website_url",
  "link",
  "profile_image"
],
  {
    table: "stack_user",
  }
);

const insertData = async () => {
  const { questions, users, answers } = generateData();
  const userQueries = pgp.helpers.insert(users, userColumns);
  const questionQueries = pgp.helpers.insert(questions, questionColumns);
  const answerQueries = pgp.helpers.insert(answers, answerColumns);

  const db = pgp(config);

  const q = await Promise.all(
    [userQueries, questionQueries, answerQueries].map((q) => db.none(q))
  );

  db.$pool.end;
};

insertData();
