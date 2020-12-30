-- populate with data --
-- USE spgames;
-- users table --
DELETE FROM
    users;

INSERT INTO
    users (username, email, `type`)
VALUES
    ('ethanolx', 'ethan@gmail.com', 'Admin'),
    ('Mary101', 'm101@yahoo.com.sg', 'Customer'),
    ('JSmith', 'johnsmith@x.net', 'Customer'),
    ('Jane Smithsonian', 'jsx@abc.mail', 'Customer'),
    ('F00D4L1F3', 'joel@git.git', 'Admin');

-- categories table --
DELETE FROM
    categories;

INSERT INTO
    categories (catname, `description`)
VALUES
    (
        'Puzzle',
        "Brain-racking and intriguing, these challenges are sure to elicit an 'Ah Ha!' from you"
    ),
    (
        'First Person Shooter',
        'You play from the perspective of the protagonist, fulfilling objectives to win'
    ),
    (
        'E-Sports',
        'Get a workout without having to leave your house!'
    ),
    (
        'Text Adventures',
        'Origin of all games to date. The original, if you will.'
    );

-- platforms table --
DELETE FROM
    platforms;

INSERT INTO
    platforms (platform, `version`)
VALUES
    ('PC', 'macOS'),
    ('PC', 'Windows'),
    ('Mobile', 'Android'),
    ('Mobile', 'iOS'),
    ('Xbox', '360'),
    ('Xbox', 'One'),
    ('Playstation', '1'),
    ('Playstation', '2'),
    ('Playstation', '3'),
    ('Playstation', '4'),
    ('Playstation', '5'),
    ('Playstation', 'Portable'),
    ('Nintendo', '3DS'),
    ('Nintendo', 'Game Boy'),
    ('Nintendo', 'Switch'),
    ('Nintendo', 'Wii');

-- games table --
DELETE FROM
    games;

INSERT INTO
    games (title, `description`, price, `year`)
VALUES
    (
        'Call of Duty',
        'Call of Duty is a first-person shooter video game based on id Tech 3, and was released on October 29, 2003. The game was developed by Infinity Ward and published by Activision. The game simulates the infantry and combined arms warfare of World War II.',
        26.99,
        2003
    ),
    (
        'Baba is You',
        'Baba Is You is an award-winning puzzle game where you can change the rules by which you play. In every level, the rules themselves are present as blocks you can interact with; by manipulating them, you can change how the level works and cause surprising, unexpected interactions!',
        5.60,
        2019
    );

-- reviews table --
DELETE FROM
    reviews;

INSERT INTO
    reviews (userid, gameid, content, rating)
VALUES
    (
        1,
        2,
        'While the rules are simple, the game is not.',
        8.6
    ),
    (
        1,
        1,
        'Great game, shame about the politics',
        7.0
    ),
    (
        3,
        1,
        "Call of Duty (COD) is a shooter that you shouldn't miss. The excellent campaign and fun online modes guarantee hundreds of hours of entertainment and fun.",
        8.0
    ),
    (
        4,
        2,
        "I don't really like Puzzle games, because I'm to dumb for them. But this Game is so awesome and cute and it's one of the best Games I've ever played.",
        7.6
    );

-- game_platform_asc table --
DELETE FROM
    game_platform_asc;

INSERT INTO
    game_platform_asc (gameid, platformid)
VALUES
    (1, 1),
    (1, 2),
    (1, 3),
    (1, 4),
    (2, 1),
    (2, 2);

-- game_category_asc table --
DELETE FROM
    game_category_asc;

INSERT INTO
    game_category_asc (gameid, categoryid)
VALUES
    (1, 2),
    (2, 1);