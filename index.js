// Import express, body-parser, and postgres.
import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

// Create an express app, set the port number, set the API URL address.
const app = express();
const port = 3000;
const API_URL = "https://covers.openlibrary.org/b";

//Create const for Postgres databasee.
const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "homeShelves",
  password: "123456789",
  port: 5432,
});
db.connect();

// Function to find current year.
const d = new Date();
let year = d.getFullYear();

// Use the public folder for static files, and use Body Parser.
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM books ORDER BY title ASC");
    let books = result.rows;
    let bookList = books[0];
    let title = bookList.title;
    let author = bookList.author;
    let publishYear = bookList.publishyear;
    let isbn = bookList.isbn;
    let amazon = bookList.amazon;
    let openLibrary = bookList.openlibrary;
    let acquired = bookList.acquired;
    let whyKept = bookList.whykept;

    res.render("index.ejs", {
      API_URL: API_URL,
      currentYear: year,
      books: books,
      title: title,
      author: author,
      publishYear: publishYear,
      isbn: isbn,
      amazon: amazon,
      openLibrary: openLibrary,
      acquired: acquired,
      whyKept: whyKept,
    });
  } catch (error) {
    res.status(404).send(error.message);
  }
});

app.get("/author", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM books ORDER BY author ASC");
    let books = result.rows;
    let bookList = books[0];
    let title = bookList.title;
    let author = bookList.author;
    let publishYear = bookList.publishyear;
    let isbn = bookList.isbn;
    let amazon = bookList.amazon;
    let openLibrary = bookList.openlibrary;
    let acquired = bookList.acquired;
    let whyKept = bookList.whykept;

    res.render("index.ejs", {
      API_URL: API_URL,
      currentYear: year,
      books: books,
      title: title,
      author: author,
      publishYear: publishYear,
      isbn: isbn,
      amazon: amazon,
      openLibrary: openLibrary,
      acquired: acquired,
      whyKept: whyKept,
    });
  } catch (error) {
    res.status(404).send(error.message);
  }
});

app.get("/year", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM books ORDER BY publishyear ASC");
    let books = result.rows;
    let bookList = books[0];
    let title = bookList.title;
    let author = bookList.author;
    let publishYear = bookList.publishyear;
    let isbn = bookList.isbn;
    let amazon = bookList.amazon;
    let openLibrary = bookList.openlibrary;
    let acquired = bookList.acquired;
    let whyKept = bookList.whykept;

    res.render("index.ejs", {
      API_URL: API_URL,
      currentYear: year,
      books: books,
      title: title,
      author: author,
      publishYear: publishYear,
      isbn: isbn,
      amazon: amazon,
      openLibrary: openLibrary,
      acquired: acquired,
      whyKept: whyKept,
    });
  } catch (error) {
    res.status(404).send(error.message);
  }
});

app.get("/newBook", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM books ORDER BY title ASC");
    let books = result.rows;
    let bookList = books[0];
    let title = bookList.title;
    let author = bookList.author;
    let publishYear = bookList.publishyear;
    let isbn = bookList.isbn;
    let amazon = bookList.amazon;
    let openLibrary = bookList.openlibrary;
    let acquired = bookList.acquired;
    let whyKept = bookList.whykept;
    let id = bookList.id;

    res.render("newBook.ejs", { 
      currentYear: year,
      books: books,
      id: id,
      title: title,
      author: author,
      publishYear: publishYear,
      isbn: isbn,
      amazon: amazon,
      openLibrary: openLibrary,
      acquired: acquired,
      whyKept: whyKept,
     });
  } catch (error) {
    res.status(404).send(error.message);
  }
});

app.post("/add", async (req, res) => {
  const title = req.body.newTitle;
  const author = req.body.newAuthor;
  const publishYear = req.body.newPublishYear;
  const isbn = req.body.newIsbn;
  const amazon = req.body.newAmazon;
  const openLibrary = req.body.newOpenLibrary;
  const acquired = req.body.newAcquired;
  const whyKept = req.body.newWhyKept;
  try {
    await db.query(
      "INSERT INTO books (title, author, publishYear, isbn, amazon, openLibrary, acquired, whyKept) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
      [title, author, publishYear, isbn, amazon, openLibrary, acquired, whyKept]
    );
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
});

app.post("/edit", async (req, res) => {
     const updatedBookTitle = req.body.updatedBookTitle;
     const updatedBookAuthor = req.body.updatedBookAuthor;
     const updatedBookPublishYear = req.body.updatedBookPublishYear;
     const updatedBookIsbn = req.body.updatedBookIsbn;
     const updatedBookAmazon = req.body.updatedBookAmazon;
     const updatedBookOpenLibrary = req.body.updatedBookOpenLibrary;
     const updatedBookAcquired = req.body.updatedBookAcquired;
     const updatedBookWhyKept = req.body.updatedBookWhyKept;
     const updatedBookId = req.body.updatedBookId;

     try{
    await db.query(
      "UPDATE books SET title = ($1), author = ($2), publishYear = ($3), isbn = ($4), amazon = ($5), openLibrary = ($6), acquired = ($7), whyKept = ($8) WHERE id = $9",
      [updatedBookTitle, updatedBookAuthor, updatedBookPublishYear, updatedBookIsbn, updatedBookAmazon, updatedBookOpenLibrary, updatedBookAcquired, updatedBookWhyKept, updatedBookId]
    );
    res.redirect("/");
  }catch (err) {
    console.log(err);
  }
});

app.get("/delete/:id", async (req, res) => {
  const deleteBookId = req.params.id;
  try{
  await db.query("DELETE FROM books WHERE id = $1", 
    [deleteBookId]);
  res.redirect("/");
} catch (err) {
  console.log(err);
}
  });

// Listens on predefined port and starts the server.
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
