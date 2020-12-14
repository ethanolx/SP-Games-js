-- populate with data --
USE spgames;

-- users table --
DELETE FROM users;

INSERT INTO users (username, email, type) VALUES
    ('ethan', 'ethan@gmail.com', 'Admin'),
    ('jsx', 'johnsmith@x.net', 'Customer'),
    ('xox', 'bobby@abc.mail', 'Customer');

-- categories table --
DELETE FROM categories;

INSERT INTO categories (catname, description) VALUES
    ('Puzzle', "Brain-racking and intriguing, these challenges are sure to elicit an 'Ah Ha!' from you"),
    ('First Person Shooter', 'You play from the perspective of the protagonist, fulfilling objectives to win');

-- games table --
DELETE FROM games;

INSERT INTO games (title, description, price, platforms, categoryid, year) VALUES
    ('Call of Duty', 'Call of Duty is a first-person shooter video game based on id Tech 3, and was released on October 29, 2003. The game was developed by Infinity Ward and published by Activision. The game simulates the infantry and combined arms warfare of World War II.', 26.99, 'PC,Mobile,Xbox', 2, 2003),
    ('Baba is You', 'Baba Is You is an award-winning puzzle game where you can change the rules by which you play. In every level, the rules themselves are present as blocks you can interact with; by manipulating them, you can change how the level works and cause surprising, unexpected interactions!', 5.60, 'PC', 1, 2019);

-- reviews table --
DELETE FROM reviews;

INSERT INTO reviews (userid, gameid, content, rating) VALUES
    (1, 2, 'While the rules are simple, the game is not.', 8.6),
    (1, 1, 'Great game, shame about the politics', 7.0),
    (2, 1, "Call of Duty (COD) is a shooter that you shouldn't miss. The excellent campaign and fun online modes guarantee hundreds of hours of entertainment and fun.", 8.0),
    (3, 2, "I don't really like Puzzle games, because I'm to dumb for them. But this Game is so awesome and cute and it's one of the best Games I've ever played.", 7.6);