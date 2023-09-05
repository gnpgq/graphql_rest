CREATE TABLE questions (
  owner_id bigint,
  is_answered boolean,
  view_count bigint,
  accepted_answer_id bigint,
  answer_count bigint,
  score bigint,
  last_activity_date bigint,
  creation_date bigint,
  last_edit_date bigint,
  id bigint,
  content_license varchar,
  link varchar,
  title varchar
  )

  COPY questions from '/Users/gnpgq/repos/private/stackoverflow_data/questions.csv' DELIMITER ',' CSV 