DROP DATABASE IF EXISTS study_buddy;
CREATE DATABASE study_buddy;

\c study_buddy;

CREATE TABLE users (
  ID SERIAL PRIMARY KEY,
  firstName VARCHAR,
  lastName VARCHAR,
  username VARCHAR,
  email VARCHAR
);

INSERT INTO users (firstName, lastName, username, email)
  VALUES ('Ryan', 'Ngai', 'rngai', 'iremain@gmail.com');
