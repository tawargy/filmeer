CREATE TABLE mywatched(
  userId       VARCHAR NOT NULL,
  filmeId      VARCHAR NOT NULL,
  FOREIGN KEY (userId) REFERENCES users (id),
  FOREIGN KEY (filmeId) REFERENCES filmes (id)
);

CREATE TABLE mylibrary(
  userId       VARCHAR NOT NULL,
  filmeId      VARCHAR NOT NULL,
  FOREIGN KEY (userId) REFERENCES users (id),
  FOREIGN KEY (filmeId) REFERENCES filmes (id)
);

