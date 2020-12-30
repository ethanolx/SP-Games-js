DROP DATABASE IF EXISTS spgames;

CREATE DATABASE spgames;

USE spgames;

CREATE TABLE users (
    userid INT AUTO_INCREMENT UNIQUE NOT NULL,
    username VARCHAR(30) UNIQUE NOT NULL,
    email VARCHAR(45) UNIQUE NOT NULL,
    `type` ENUM('Customer', 'Admin') NOT NULL,
    profile_pic_url VARCHAR(80) NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (userid)
);

CREATE TABLE categories (
    id INT AUTO_INCREMENT UNIQUE NOT NULL,
    catname VARCHAR(20) UNIQUE NOT NULL,
    `description` TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);

CREATE TABLE platforms (
    id INT AUTO_INCREMENT UNIQUE NOT NULL,
    platform VARCHAR(15) NOT NULL,
    `version` VARCHAR(20) DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);

CREATE TABLE games (
    id INT AUTO_INCREMENT UNIQUE NOT NULL,
    title VARCHAR(25) UNIQUE NOT NULL,
    `description` TEXT NOT NULL,
    price DECIMAL(5, 2) NOT NULL,
    year INT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);

CREATE TABLE reviews (
    reviewid INT AUTO_INCREMENT UNIQUE NOT NULL,
    userid INT NOT NULL,
    gameid INT NOT NULL,
    content TEXT NOT NULL,
    rating DECIMAL(3, 1) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (reviewid),
    FOREIGN KEY (userid) REFERENCES users(userid),
    FOREIGN KEY (gameid) REFERENCES games(id) ON DELETE CASCADE
);

CREATE TABLE game_platform_asc (
    id INT AUTO_INCREMENT UNIQUE NOT NULL,
    gameid INT NOT NULL,
    platformid INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (gameid) REFERENCES games(id) ON DELETE CASCADE,
    FOREIGN KEY (platformid) REFERENCES platforms(id) ON DELETE CASCADE
);

CREATE TABLE game_category_asc (
    id INT AUTO_INCREMENT UNIQUE NOT NULL,
    gameid INT NOT NULL,
    categoryid INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (gameid) REFERENCES games(id) ON DELETE CASCADE,
    FOREIGN KEY (categoryid) REFERENCES categories(id) ON DELETE CASCADE
);

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

DELETE FROM
    game_category_asc;

INSERT INTO
    game_category_asc (gameid, categoryid)
VALUES
    (1, 2),
    (2, 1);