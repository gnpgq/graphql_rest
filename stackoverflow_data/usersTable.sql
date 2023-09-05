CREATE TABLE users (
  account_id bigint,
  is_employee boolean,
  reputation bigint,
  creation_date bigint,
  user_type varchar,
  id bigint PRIMARY KEY,
  accept_rate varchar,
  location varchar,
  website_url varchar,
  link varchar,
  profile_image varchar,
  display_name varchar
  )

  COPY users from '/Users/gnpgq/repos/private/stackoverflow_data/users.csv' DELIMITER ',' CSV 