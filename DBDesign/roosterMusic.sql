CREATE DATABASE  IF NOT EXISTS `roostermusic` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `roostermusic`;
-- MySQL dump 10.13  Distrib 8.0.20, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: roostermusic
-- ------------------------------------------------------
-- Server version	8.0.20

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `campaigns`
--

DROP TABLE IF EXISTS `campaigns`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `campaigns` (
  `id_campaign` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id_campaign`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `campaigns`
--

LOCK TABLES `campaigns` WRITE;
/*!40000 ALTER TABLE `campaigns` DISABLE KEYS */;
INSERT INTO `campaigns` VALUES (2,'Mas vistos'),(3,'Oferta'),(1,'Sin asignar');
/*!40000 ALTER TABLE `campaigns` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id_category` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id_category`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (6,'Audio'),(2,'Bajo'),(3,'Bateria'),(7,'Grabacion'),(1,'Guitarra'),(8,'Teclado'),(4,'Ukelele'),(5,'Viento');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `id_order` int NOT NULL AUTO_INCREMENT,
  `id_user` int NOT NULL,
  `id_product` int NOT NULL,
  `id_status` int NOT NULL,
  `last_modified` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_order`,`id_user`,`id_product`),
  KEY `fk_orders_users_idx` (`id_user`),
  KEY `fk_orders_products_idx` (`id_product`),
  KEY `fk_orders_status_idx` (`id_status`),
  CONSTRAINT `fk_orders_products` FOREIGN KEY (`id_product`) REFERENCES `products` (`id_product`),
  CONSTRAINT `fk_orders_status` FOREIGN KEY (`id_status`) REFERENCES `status` (`id_status`),
  CONSTRAINT `fk_orders_users` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`)
) ENGINE=InnoDB AUTO_INCREMENT=138 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (2,1,1,1,'2021-11-06 01:26:34'),(9,3,4,1,'2021-11-07 22:04:02'),(20,6,4,2,'2021-11-08 04:31:07'),(23,6,4,2,'2021-11-08 04:47:10'),(25,6,2,2,'2021-11-08 05:00:46'),(27,6,3,2,'2021-11-08 05:00:49'),(29,6,1,2,'2021-11-09 00:39:40'),(30,6,7,2,'2021-11-09 00:39:44'),(31,6,3,2,'2021-11-09 00:40:25'),(32,6,3,2,'2021-11-09 00:44:11'),(35,6,5,2,'2021-11-09 01:30:59'),(36,6,4,2,'2021-11-09 01:31:00'),(37,6,6,2,'2021-11-09 01:31:04'),(38,6,2,2,'2021-11-09 01:33:03'),(39,6,3,2,'2021-11-09 01:33:05'),(40,6,1,2,'2021-11-09 01:33:07'),(41,6,6,2,'2021-11-09 01:33:09'),(42,6,2,2,'2021-11-09 01:40:26'),(45,6,3,2,'2021-11-09 01:55:20'),(46,6,4,2,'2021-11-09 01:55:32'),(47,6,1,2,'2021-11-09 01:55:35'),(48,6,6,2,'2021-11-09 01:55:37'),(52,6,1,2,'2021-11-09 02:36:07'),(58,6,2,2,'2021-11-09 02:37:06'),(59,6,6,2,'2021-11-09 02:39:14'),(60,6,6,2,'2021-11-09 02:39:33'),(63,6,3,2,'2021-11-09 05:21:48'),(71,6,3,2,'2021-11-09 21:24:52'),(74,6,2,2,'2021-11-09 21:25:23'),(75,6,2,2,'2021-11-09 21:26:44'),(76,6,1,2,'2021-11-09 21:26:46'),(81,6,3,2,'2021-11-10 03:43:30'),(85,6,2,2,'2021-11-10 04:03:31'),(87,6,1,2,'2021-11-10 04:04:47'),(88,6,2,2,'2021-11-10 04:09:09'),(89,6,3,2,'2021-11-10 04:15:47'),(90,6,2,2,'2021-11-10 04:17:41'),(91,6,2,2,'2021-11-10 04:25:53'),(92,6,3,2,'2021-11-10 04:26:16'),(95,6,3,2,'2021-11-10 04:27:30'),(96,6,1,2,'2021-11-10 04:27:35'),(97,6,6,2,'2021-11-10 04:27:36'),(111,6,3,2,'2021-11-11 03:35:18'),(119,8,12,2,'2021-11-11 03:38:32'),(120,8,7,2,'2021-11-11 03:38:34'),(128,6,3,2,'2021-11-11 17:15:05'),(129,6,2,2,'2021-11-11 17:15:17'),(130,6,3,2,'2021-11-11 17:18:18'),(131,6,3,2,'2021-11-11 17:19:40'),(132,6,3,1,'2021-11-11 17:20:14'),(133,6,3,1,'2021-11-11 17:21:29'),(134,9,2,1,'2021-11-24 22:57:58'),(136,9,3,1,'2021-11-24 22:58:12'),(137,9,1,1,'2021-11-24 22:58:15');
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id_product` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `description` varchar(1000) NOT NULL,
  `price` decimal(9,2) NOT NULL,
  `image` varchar(45) NOT NULL,
  `brand` varchar(45) NOT NULL,
  `model` varchar(45) NOT NULL,
  `color` varchar(45) NOT NULL,
  `material` varchar(45) NOT NULL,
  `origin` varchar(45) NOT NULL,
  `year` year NOT NULL,
  `id_category` int NOT NULL,
  `availability` varchar(45) NOT NULL,
  `id_campaign` int NOT NULL,
  PRIMARY KEY (`id_product`),
  KEY `fk_products_categories_idx` (`id_category`) /*!80000 INVISIBLE */,
  KEY `fk_products_campaigns_idx` (`id_campaign`),
  CONSTRAINT `fk_products_campaigns` FOREIGN KEY (`id_campaign`) REFERENCES `campaigns` (`id_campaign`),
  CONSTRAINT `fk_products_categories` FOREIGN KEY (`id_category`) REFERENCES `categories` (`id_category`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Reproductor de Vinilos Winco','Escuchá música como siempre soñaste, la calidad de sonido del Wincofon es realmente inigualable. Además vestí tu casa de gala con el tocadiscos Winco.',100.00,'audio1.jpg','Winco','1000','Marron','Madera','China',2020,6,'En Stock',2),(2,'Guitarra Electrica','Guitarra ultimo modelo',500.00,'img-1636179042990-guitar5.jpg','Fender','2021','Blanco','Madera','China',2020,1,'En Stock',3),(3,'Bajo Eléctrico Femmto','El bajo eléctrico EB001 FEMMTO es la opción estética y económica que estabas necesitando para empezar a tocar.',199.95,'img-1636228186075-bass1.jpg','Femmto','2021','Marrón','Madera','España',2021,2,'En Stock',2),(4,'Bajo Eléctrico Ibanez','El GSR180 ofrece flexibilidad de sonido y buen manejo a un precio accesible! Con mango delgado y micrófonos potentes, los bajos de Ibanez no solo se ven geniales, sino que también suenan muy bien.',500.00,'img-1636228375977-bass2.jpg','Ibanez','2021','Marrón','Madera','Japón',2020,2,'En Stock',2),(5,'Bateria Peavey','Batería Taurus MFP 410/6 es una batería de 4 cuerpos , de medidas jazzeras construidas en 7 capas de maple ( arse ).',500.00,'img-1636228524721-drum1.jpg','Peavey','2018','Marrón','Madera','EEUU',2018,3,'En Stock',3),(6,'Platillos','Si lo que buscas es un plato con un precio asequible pero con un buen sonido, Zildjian pone a tu disposición esta serie diseñada y fabricada para este fin. Sin duda la mejor relación calidad-precio.',400.00,'img-1636228636097-drum2.jpg','Zildjian','Z-240','Dorado','Metal','Taiwan',2018,3,'En Stock',3),(7,'Teclado Casio','Teclado Portátil Casio CT-S100 61 Teclas USB MIDI. Con el CT-S100, puede disfrutar de la música en cualquier momento y lugar. Su tamaño compacto de 930 mm x 256 mm x 73 mm es un 30% más pequeño en volumen que los modelos CT-K1500 y CT-K1550, y su batería alcalina cuenta con aproximadamente 16 horas de duración*. Llevarlo es muy sencillo, gracias a un mango en la parte superior del teclado y un peso de solo 3,3 kg. El diseño incorpora bordes y esquinas redondeados, lo cual permite transportarlo con seguridad.El uso de altavoces ovalados de 13 cm x 6 cm con imanes reforzados ofrece un sonido sorprendentemente genial para un instrumento tan compacto. Una función adicional que optimiza el ecualizador en conjunto con el volumen proporciona un sonido equilibrado desde los tonos graves hasta los tonos altos, incluso a un volumen bajo. El CT-S100 incluye un conector USB micro B que le permite disfrutar fácilmente de la música, junto con su dispositivo inteligente o computadora.',146.00,'img-1636228744191-keyboard1.jpg','Casio','Kl.808','Blanco','Madera','España',2017,8,'En Stock',3),(12,'Test','Test',200.11,'img-1636426267364-guitar4.jpg','Test','Test','Test','Test','Test',2021,2,'Sin Stock',2),(13,'Jazz Guitar','Guitarra del legendario estilo Jazz Rock',1000.50,'img-1636438973551-guitar3.jpg','Fender','2021','Azúl','Madera','China',1998,1,'En Stock',2);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `status`
--

DROP TABLE IF EXISTS `status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `status` (
  `id_status` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id_status`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `status`
--

LOCK TABLES `status` WRITE;
/*!40000 ALTER TABLE `status` DISABLE KEYS */;
INSERT INTO `status` VALUES (2,'Comprado'),(1,'En carrito');
/*!40000 ALTER TABLE `status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id_user` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `surname` varchar(45) NOT NULL,
  `document` int NOT NULL,
  `country` varchar(45) NOT NULL,
  `address` varchar(45) NOT NULL,
  `birthdate` date NOT NULL,
  `email` varchar(45) NOT NULL,
  `password` varchar(100) NOT NULL,
  `img` varchar(45) NOT NULL,
  PRIMARY KEY (`id_user`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Alan','Victor',555555,'Argentina','Pavon 111','1993-01-20','alan@hotmail.com','123','img-sin-imagen-disponible.jpg'),(2,'Franco','Ruben',111111111,'Argentina','Pavon 1234','2021-10-14','franco1@hotmail.com','$2a$10$ilM7kG5GH/e6krfF8cPFCe7StsCL0wDMfnfxBlyfpg.9saMMXLR4i','img-1635727502231-avatar3.jpg'),(3,'Franco','Ruben',22222222,'Argentina','Pavon 1234','2021-10-13','franco2@hotmail.com','$2a$10$pAjruZRz0YrHZM.iIMf6Je8i1JAtZLOo6Q0uIQnT4Ul3GA/K7P.4C','img-1635727658850-avatar3.jpg'),(4,'Franco','Ruben',33333333,'Colombia','Pavon 1234','2021-10-05','franco3@hotmail.com','$2a$10$.Y/5JButww4HkjYqfqkOoOc7WBJPwk5vIrW4CHfifOc4VOCMvAwTC','img-1635727753237-avatar3.jpg'),(5,'Franco','Ruben',4444444,'Argentina','Pavon 1234','2021-10-13','franco4@hotmail.com','$2a$10$pWQEFGYbHfpRZvmtrtGzIeF3mV8s6ZQHzxJ1hqBTR.t03uv0gB8r2','img-1635729542155-avatar2.jpg'),(6,'Franco5','Ruben',5555555,'Argentina','Pavon 1234','2021-10-07','franco5@hotmail.com','$2a$10$Vw0sleik2Z577E5rapFlpuCsIIz/zF/O2174Fh5UBRd9EDirpG2lC','img-1635732015347-avatar4.jpg'),(8,'Alan','Victor',3778956,'Argentina','Torcuato de Alvear','2021-11-16','alan123@hotmail.com','$2a$10$GRsy8gFYK/hiyqwZsmwo5u91Ozl/ik3qHS6uL9OaM6tNX1Kacou/a','img-1636601861512-avatar1.jpg'),(9,'admin','admin',222222222,'Argentina','Alberdi 111','2021-11-22','admin@hotmail.com','$2a$10$Hj.JoUpXA5sX73kC20NOeeF3rzAE7mVbz22ijGeJgtGHkqspzjUwS','img-1637794649930-avatar2.jpg');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'roostermusic'
--

--
-- Dumping routines for database 'roostermusic'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-11-24 20:48:43
