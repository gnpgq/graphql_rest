CREATE TABLE answer (
  id varchar PRIMARY KEY,
  question_id varchar,
  body text,
  user_id varchar,
  accepted boolean,
  score bigint,
  status varchar,
  created_at timestamp,
  CONSTRAINT fk_question_id FOREIGN KEY(question_id) REFERENCES question(id) ON DELETE NO ACTION,
  CONSTRAINT fk_user_id FOREIGN KEY(user_id) REFERENCES stack_user(id) ON DELETE NO ACTION
  )
