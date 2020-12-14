-- database initialisation --
DROP DATABASE IF EXISTS spgames;

CREATE DATABASE spgames;

USE spgames;

-- temporary mysql user initialisation --
DROP USER IF EXISTS 'tmp' @'localhost';

CREATE USER 'tmp' @'localhost' IDENTIFIED BY '12435Abc';

GRANT ALL PRIVILEGES ON spgames.* TO 'tmp' @'localhost';

-- tables initialisation --
CREATE TABLE users (
    userid INT AUTO_INCREMENT UNIQUE NOT NULL,
    username VARCHAR(30) UNIQUE NOT NULL,
    email VARCHAR(45) UNIQUE NOT NULL,
    type ENUM('Customer', 'Admin') NOT NULL,
    profile_pic_url VARCHAR(80) NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (userid)
);

CREATE TABLE categories (
    id INT AUTO_INCREMENT UNIQUE NOT NULL,
    catname VARCHAR(20) UNIQUE NOT NULL,
    description TEXT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);

CREATE TABLE games (
    id INT AUTO_INCREMENT UNIQUE NOT NULL,
    title VARCHAR(25) UNIQUE NOT NULL,
    description TEXT NULL,
    price DECIMAL(5, 2) NOT NULL,
    platforms SET ('PC', 'Mobile', 'Xbox', 'Nintendo', 'PS') NOT NULL,
    categoryid INT NOT NULL,
    year INT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    FOREIGN KEY (categoryid) REFERENCES categories(id)
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