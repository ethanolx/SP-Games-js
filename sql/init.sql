-- database initialisation --
DROP DATABASE IF EXISTS spgames;

CREATE DATABASE spgames;

USE DATABASE spgames;

-- mysql user initialisation --
DROP USER IF EXISTS 'ethan' @'localhost';

CREATE USER 'ethan' @'localhost' IDENTIFIED BY '12435Abc';

GRANT ALL PRIVILEGES ON spgames.* TO 'ethan' @'localhost';

-- tables initialisation --
CREATE TABLE users (
    userid INT AUTO_INCREMENT UNIQUE NOT NULL,
    username VARCHAR(30) UNIQUE NOT NULL,
    email VARCHAR(45) UNIQUE NOT NULL,
    usertype ENUM('Customer', 'Admin') NOT NULL,
    profile_pic_url VARCHAR(80) NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (userid)
);

CREATE TABLE categories (
    id INT AUTO_INCREMENT UNIQUE NOT NULL,
    catname VARCHAR(20) UNIQUE NOT NULL,
    description VARCHAR(100) NULL,
    PRIMARY KEY (catid)
);

CREATE TABLE games (
    id INT AUTO_INCREMENT UNIQUE NOT NULL,
    title VARCHAR(25) UNIQUE NOT NULL,
    description VARCHAR(100) NULL,
    price FLOAT NOT NULL,
    platform VARCHAR(12) NOT NULL,
    categoryid INT NOT NULL,
    year DATE NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    FOREIGN KEY (categoryid) REFERENCES categories(id)
);

CREATE TABLE reviews (
    id INT AUTO_INCREMENT UNIQUE NOT NULL,
    userid INT NOT NULL,
    gameid INT NOT NULL,
    content TEXT NOT NULL,
    rating FLOAT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (userid) REFERENCES users(id),
    FOREIGN KEY (gameid) REFERENCES games(id)
);