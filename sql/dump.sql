-- MySQL dump 10.13  Distrib 8.0.22, for Win64 (x86_64)
--
-- Host: localhost    Database: spgames
-- ------------------------------------------------------
-- Server version	8.0.22

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `catname` varchar(20) NOT NULL,
  `description` text NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  UNIQUE KEY `catname` (`catname`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Puzzle','Brain-racking and intriguing, these challenges are sure to elicit an \'Ah Ha!\' from you','2020-12-30 13:46:37'),(2,'First Person Shooter','You play from the perspective of the protagonist, fulfilling objectives to win','2020-12-30 13:46:37'),(3,'E-Sports','Get a workout without having to leave your house!','2020-12-30 13:46:37'),(4,'Text Adventures','Origin of all games to date. The original, if you will.','2020-12-30 13:46:37');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `game_category_asc`
--

DROP TABLE IF EXISTS `game_category_asc`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `game_category_asc` (
  `id` int NOT NULL AUTO_INCREMENT,
  `gameid` int NOT NULL,
  `categoryid` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `gameid` (`gameid`),
  KEY `categoryid` (`categoryid`),
  CONSTRAINT `game_category_asc_ibfk_1` FOREIGN KEY (`gameid`) REFERENCES `games` (`id`) ON DELETE CASCADE,
  CONSTRAINT `game_category_asc_ibfk_2` FOREIGN KEY (`categoryid`) REFERENCES `categories` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `game_category_asc`
--

LOCK TABLES `game_category_asc` WRITE;
/*!40000 ALTER TABLE `game_category_asc` DISABLE KEYS */;
INSERT INTO `game_category_asc` VALUES (1,1,2),(2,2,1);
/*!40000 ALTER TABLE `game_category_asc` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `game_platform_asc`
--

DROP TABLE IF EXISTS `game_platform_asc`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `game_platform_asc` (
  `id` int NOT NULL AUTO_INCREMENT,
  `gameid` int NOT NULL,
  `platformid` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `gameid` (`gameid`),
  KEY `platformid` (`platformid`),
  CONSTRAINT `game_platform_asc_ibfk_1` FOREIGN KEY (`gameid`) REFERENCES `games` (`id`) ON DELETE CASCADE,
  CONSTRAINT `game_platform_asc_ibfk_2` FOREIGN KEY (`platformid`) REFERENCES `platforms` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `game_platform_asc`
--

LOCK TABLES `game_platform_asc` WRITE;
/*!40000 ALTER TABLE `game_platform_asc` DISABLE KEYS */;
INSERT INTO `game_platform_asc` VALUES (1,1,1),(2,1,2),(3,1,3),(4,1,4),(5,2,1),(6,2,2);
/*!40000 ALTER TABLE `game_platform_asc` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `games`
--

DROP TABLE IF EXISTS `games`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `games` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(25) NOT NULL,
  `description` text NOT NULL,
  `price` decimal(5,2) NOT NULL,
  `year` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  UNIQUE KEY `title` (`title`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `games`
--

LOCK TABLES `games` WRITE;
/*!40000 ALTER TABLE `games` DISABLE KEYS */;
INSERT INTO `games` VALUES (1,'Call of Duty','Call of Duty is a first-person shooter video game based on id Tech 3, and was released on October 29, 2003. The game was developed by Infinity Ward and published by Activision. The game simulates the infantry and combined arms warfare of World War II.',26.99,2003,'2020-12-30 13:46:37'),(2,'Baba is You','Baba Is You is an award-winning puzzle game where you can change the rules by which you play. In every level, the rules themselves are present as blocks you can interact with; by manipulating them, you can change how the level works and cause surprising, unexpected interactions!',5.60,2019,'2020-12-30 13:46:37');
/*!40000 ALTER TABLE `games` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `platforms`
--

DROP TABLE IF EXISTS `platforms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `platforms` (
  `id` int NOT NULL AUTO_INCREMENT,
  `platform` varchar(15) NOT NULL,
  `version` varchar(20) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `platforms`
--

LOCK TABLES `platforms` WRITE;
/*!40000 ALTER TABLE `platforms` DISABLE KEYS */;
INSERT INTO `platforms` VALUES (1,'PC','macOS','2020-12-30 13:46:37'),(2,'PC','Windows','2020-12-30 13:46:37'),(3,'Mobile','Android','2020-12-30 13:46:37'),(4,'Mobile','iOS','2020-12-30 13:46:37'),(5,'Xbox','360','2020-12-30 13:46:37'),(6,'Xbox','One','2020-12-30 13:46:37'),(7,'Playstation','1','2020-12-30 13:46:37'),(8,'Playstation','2','2020-12-30 13:46:37'),(9,'Playstation','3','2020-12-30 13:46:37'),(10,'Playstation','4','2020-12-30 13:46:37'),(11,'Playstation','5','2020-12-30 13:46:37'),(12,'Playstation','Portable','2020-12-30 13:46:37'),(13,'Nintendo','3DS','2020-12-30 13:46:37'),(14,'Nintendo','Game Boy','2020-12-30 13:46:37'),(15,'Nintendo','Switch','2020-12-30 13:46:37'),(16,'Nintendo','Wii','2020-12-30 13:46:37');
/*!40000 ALTER TABLE `platforms` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reviews`
--

DROP TABLE IF EXISTS `reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reviews` (
  `reviewid` int NOT NULL AUTO_INCREMENT,
  `userid` int NOT NULL,
  `gameid` int NOT NULL,
  `content` text NOT NULL,
  `rating` decimal(3,1) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`reviewid`),
  UNIQUE KEY `reviewid` (`reviewid`),
  KEY `userid` (`userid`),
  KEY `gameid` (`gameid`),
  CONSTRAINT `reviews_ibfk_1` FOREIGN KEY (`userid`) REFERENCES `users` (`userid`),
  CONSTRAINT `reviews_ibfk_2` FOREIGN KEY (`gameid`) REFERENCES `games` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reviews`
--

LOCK TABLES `reviews` WRITE;
/*!40000 ALTER TABLE `reviews` DISABLE KEYS */;
INSERT INTO `reviews` VALUES (1,1,2,'While the rules are simple, the game is not.',8.6,'2020-12-30 13:46:37'),(2,1,1,'Great game, shame about the politics',7.0,'2020-12-30 13:46:37'),(3,3,1,'Call of Duty (COD) is a shooter that you shouldn\'t miss. The excellent campaign and fun online modes guarantee hundreds of hours of entertainment and fun.',8.0,'2020-12-30 13:46:37'),(4,4,2,'I don\'t really like Puzzle games, because I\'m to dumb for them. But this Game is so awesome and cute and it\'s one of the best Games I\'ve ever played.',7.6,'2020-12-30 13:46:37');
/*!40000 ALTER TABLE `reviews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `userid` int NOT NULL AUTO_INCREMENT,
  `username` varchar(30) NOT NULL,
  `email` varchar(45) NOT NULL,
  `type` enum('Customer','Admin') NOT NULL,
  `profile_pic_url` varchar(80) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`userid`),
  UNIQUE KEY `userid` (`userid`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'ethanolx','ethan@gmail.com','Admin',NULL,'2020-12-30 13:46:37'),(2,'Mary101','m101@yahoo.com.sg','Customer',NULL,'2020-12-30 13:46:37'),(3,'JSmith','johnsmith@x.net','Customer',NULL,'2020-12-30 13:46:37'),(4,'Jane Smithsonian','jsx@abc.mail','Customer',NULL,'2020-12-30 13:46:37'),(5,'F00D4L1F3','joel@git.git','Admin',NULL,'2020-12-30 13:46:37');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-12-30 21:48:02
