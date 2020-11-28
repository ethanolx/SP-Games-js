-- database initialisation --
DROP DATABASE IF EXISTS spgames;

CREATE DATABASE spgames;

USE DATABASE spgames;

-- mysql user initialisation --
DROP USER IF EXISTS 'ethan' @'localhost';

CREATE USER 'ethan' @'localhost' IDENTIFIED BY '12435Abc';

GRANT ALL PRIVILEGES ON spgames.* TO 'ethan' @'localhost';

-- tables initialisation --
CREATE TABLE users (id int);