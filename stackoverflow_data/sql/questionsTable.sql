CREATE TABLE question (
  id varchar PRIMARY KEY,
  owner_id varchar,
  view_count bigint,
  score bigint,
  title varchar,
  is_answered boolean,
  answer_count integer,
  last_activity_date timestamp,
  creation_date timestamp,
  last_edit_date timestamp,
  content_license varchar,
  link varchar,
  body text,
  CONSTRAINT fk_owner_id FOREIGN KEY(owner_id) REFERENCES stack_user(id) ON DELETE NO ACTION
  )
