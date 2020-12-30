# SP Games

|                   |   |                         |
|-------------------|---|-------------------------|
|   Author          | : |     Ethan Tan Wee En    |
|   Languages       | : |     JS, HTML, (CSS)     |
|   Date            | : |     December 2020       |

## Program

### General Setup

1. Install NodeJS locally (at least v14.0)
2. Ensure npm is installed too (run `npm --version`)
3. Navigate to 'SP Games' directory through command line

### Run Program

3. Run `npm start`

### Run Tests

3. Run `npm test`

## File Structure

    SP Games ---- assets ---- game-images
              |           |-- endpoints-supported.html
              |           `-- game-image-info.html
              |
              |-- docs ---- CA1 Brief.docx
              |         `-- table-schema.docx
              |
              |-- logs ---- error
              |         `-- history
              |
              |-- sql ---- data.sql
              |        |-- dump.sql
              |        |-- init.sql
              |        `-- reset.sql
              |
              |-- src ---- config ---- database.config.js
              |        |           `-- server.config.js
              |        |
              |        |-- controllers ---- routes ---- categories.js
              |        |                |           |-- games.js
              |        |                |           |-- other.js
              |        |                |           |-- reviews.js
              |        |                |           |-- root.js
              |        |                |           `-- users.js
              |        |                |
              |        |                `-- app.js
              |        |
              |        |-- models ---- associative ---- G_C.js
              |        |           |                `-- G_P.js
              |        |           |
              |        |           |-- Categories.js
              |        |           |-- Games.js
              |        |           |-- Platforms.js
              |        |           |-- Reviews.js
              |        |           `-- Users.js
              |        |
              |        |-- utils ---- callbacks.js
              |        |          |-- common-errors.js
              |        |          |-- compare-object-to-signature.js
              |        |          |-- get-current-date-and-time.js
              |        |          |-- image-upload-utilities
              |        |          |-- logs.js
              |        |          `-- query.js
              |        |
              |        `-- server.js
              |
              |-- tests ---- endpoints ---- 1.spec.js
              |          |              |-- 2.spec.js
              |          |              |-- 3.spec.js
              |          |              |-- 4.spec.js
              |          |              |-- 5.spec.js
              |          |              |-- 6.spec.js
              |          |              |-- 7.spec.js
              |          |              |-- 8.spec.js
              |          |              |-- 9.spec.js
              |          |              |-- 10.spec.js
              |          |              `-- 11.spec.js
              |          |
              |          |-- reset-database.js
              |          `-- test.spec.js
              |
              |-- jsconfig.json
              |-- nodemon.json
              |-- package.json
              |-- package-lock.json
              `-- README.md


## API Coverage
---
### Endpoints supported:
<br />

|   No. |   Method  |   Route                                       |   Body?   |   Code    |
|-------|-----------|-----------------------------------------------|-----------|-----------|
|   1   |   GET     |   /users                                      |   NO      |   200     |
|   2   |   POST    |   /users                                      |   YES     |   201     |
|   3   |   GET     |   /users/:id/                                 |   NO      |   200     |
|   4   |   POST    |   /category                                   |   YES     |   204     |
|   5   |   PUT     |   /category/:id/                              |   YES     |   204     |
|   6   |   POST    |   /game                                       |   YES     |   201     |
|   7   |   GET     |   /games/:platform                            |   NO      |   200     |
|   8   |   DELETE  |   /game/:id                                   |   NO      |   204     |
|   9   |   PUT     |   /game/:id                                   |   YES     |   204     |
|   10  |   POST    |   /user/:uid/game/:gid/review/                |   YES     |   201     |
|   11  |   GET     |   /game/:id/review                            |   NO      |   200     |
|   12  |   POST    |   <a id='post-img'></a>/game/:gid/image       |   YES     |   204     |
|   13  |   GET     |   <a id='get-img'></a>/game/:gid/image        |   NO      |   200     |
|   14  |   GET     |   <a id='get-info'></a>/game/:gid/image/info  |   NO      |   200     |

<br />

## Extra Features

1.  [Endpoint for upload of game images](#post-img)
2.  [Endpoint for retrieval of game images](#get-img)
3.  [Endpoint for detailed retrieval of game images](#get-info)
4.  Error logging { logs/error }
5.  Query logging { logs/history }
6.  Game-Category many-to-many relationship
7.  Game-Platform many-to-many relationship
8.  Program testing
9.  More specific error response codes (404, 415, 422, etc.)
10. Code organisation and JSDoc annotations

<br />

## See Also

    docs ---- CA1 Brief.docx        (assignment brief)
          `-- table-schema.docx     (MySQL table schema)
