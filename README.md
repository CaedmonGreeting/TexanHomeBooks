# TexanHomeBooks
A site that lists my books using a Postgres database and gets information from Open Library's Book Covers API.

![image](https://github.com/user-attachments/assets/dced60fe-33cf-4aba-856d-2fc743bcdf15)

## How to Use:
1. Clone this project: https://github.com/CaedmonGreeting/TexanHomeBooks.git
2. Make sure that you have node.js installed on your computer. You can find your applicable installer at https://nodejs.org/
3. Make sure that you have PostgreSQL installed on your computer. https://www.postgresql.org/
   * Create a database in Postgres named "homeShelves".
   * Create a table called "books" using the code in the "queries.sql" file.
   * Import the books.csv file into the books table.

## In Visual Studio Code: 
1. Install the necessary dependencies using "npm i".
2. In the index.js file, change the password for Postgres from "123456789" to your Postgres password.
3. Use node to run the server using "node index.js'.

## Type http://localhost:3000/ into your web browser's address bar.
The page for editing the database is http://localhost:3000/newBook.
There is not a link to this page from the homepage because it should only be used by the site owner. Ideally, this page would be password protected.

![image](https://github.com/user-attachments/assets/b1ae6c0b-6c5a-46b5-bcc4-aceb67fafbb6)

