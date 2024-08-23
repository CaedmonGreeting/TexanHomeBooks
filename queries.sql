--Create table of books --
CREATE TABLE books (
  id SERIAL PRIMARY KEY,
  title VARCHAR(150),
  author VARCHAR(40),
  publishYear INT,
  isbn VARCHAR(13),
  amazon VARCHAR(200),
  openLibrary VARCHAR(200),
  acquired VARCHAR(7),
  whyKept VARCHAR(900)
);