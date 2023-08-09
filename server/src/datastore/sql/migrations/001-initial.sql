CREATE TABLE users(
  id            VARCHAR PRIMARY KEY,
  firstName     VARCHAR NOT NULL,
  lastName      VARCHAR NOT NULL,
  userName      VARCHAR UNIQUE NOT NULL,
  email         VARCHAR UNIQUE NOT NULL ,
  password      VARCHAR NOT NULL,
  rouls         VARCHAR NOT NULL
);


CREATE TABLE filmes(
  id           VARCHAR PRIMARY KEY,
  originalName VARCHAR NOT NULL UNIQUE,
  name         VARCHAR NOT NULL,
  poster       VARCHAR NOT NULL,
  year         VARCHAR NOT NULL,
  url          VARCHAR NOT NULL,
  imdbRating   VARCHAR,
  list250      INTEGER 
);



