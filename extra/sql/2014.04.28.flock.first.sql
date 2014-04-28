-- MySQL dump 10.13  Distrib 5.5.28, for osx10.6 (i386)
--
-- Host: localhost    Database: flock
-- ------------------------------------------------------
-- Server version	5.5.28

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `authorizations`
--

DROP TABLE IF EXISTS `authorizations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `authorizations` (
  `id` smallint(6) NOT NULL AUTO_INCREMENT,
  `user_id` smallint(6) NOT NULL,
  `activity` varchar(64) CHARACTER SET latin1 COLLATE latin1_general_ci NOT NULL,
  `writable` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `authorizations`
--

LOCK TABLES `authorizations` WRITE;
/*!40000 ALTER TABLE `authorizations` DISABLE KEYS */;
INSERT INTO `authorizations` VALUES (5,1,'calendar:list',1),(4,1,'liturgy:list',1),(3,1,'liturgy:save',1),(2,1,'liturgy:delete',1),(1,1,'song:list',1),(6,1,'song:edit',1),(7,1,'composer:edit',1);
/*!40000 ALTER TABLE `authorizations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `liturgies`
--

DROP TABLE IF EXISTS `liturgies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `liturgies` (
  `id` smallint(6) NOT NULL AUTO_INCREMENT,
  `title` varchar(64) NOT NULL,
  `date` datetime NOT NULL,
  `location` varchar(64) CHARACTER SET utf16 NOT NULL,
  `enable` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `liturgies`
--

LOCK TABLES `liturgies` WRITE;
/*!40000 ALTER TABLE `liturgies` DISABLE KEYS */;
INSERT INTO `liturgies` VALUES (2,'Second Sunday of Easter (Divine Mercy)','2014-04-27 20:30:00','',1),(1,'Easter Sunday','2014-04-20 20:30:00','',1);
/*!40000 ALTER TABLE `liturgies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `liturgy_part`
--

DROP TABLE IF EXISTS `liturgy_part`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `liturgy_part` (
  `liturgy_id` smallint(6) NOT NULL,
  `part_id` smallint(6) NOT NULL,
  `song_id` smallint(6) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `liturgy_part`
--

LOCK TABLES `liturgy_part` WRITE;
/*!40000 ALTER TABLE `liturgy_part` DISABLE KEYS */;
INSERT INTO `liturgy_part` VALUES (2,19,122),(1,15,588),(1,14,347),(1,13,119),(2,15,510),(2,13,153),(2,12,534),(2,11,534),(2,10,534),(2,9,534),(2,8,486),(2,6,534),(2,5,116),(2,4,534),(2,2,252),(1,12,534),(1,11,534),(1,10,534),(1,9,534),(1,8,442),(1,6,534),(1,16,542),(1,5,111),(1,4,534),(1,19,122),(1,2,252);
/*!40000 ALTER TABLE `liturgy_part` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` smallint(6) NOT NULL AUTO_INCREMENT,
  `fbid` bigint(20) unsigned NOT NULL,
  `fbname` varchar(32) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,100001375442228,'Joe Tran'),(2,831733193,'Hoan Tran');
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

-- Dump completed on 2014-04-28 16:57:17
