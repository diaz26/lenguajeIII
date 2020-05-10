/*
SQLyog Community v8.71 
MySQL - 5.5.5-10.4.8-MariaDB : Database - proyecto_clase
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`proyecto_clase` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `proyecto_clase`;

/*Table structure for table `detalles_pedidos` */

DROP TABLE IF EXISTS `detalles_pedidos`;

CREATE TABLE `detalles_pedidos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pedido_id` int(11) NOT NULL,
  `producto_id` int(11) NOT NULL,
  `costo` decimal(15,5) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `total` decimal(15,5) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `detalles_pedidos` */

/*Table structure for table `listas_elementos` */

DROP TABLE IF EXISTS `listas_elementos`;

CREATE TABLE `listas_elementos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `codigo` varchar(50) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `tipo_lista_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

/*Data for the table `listas_elementos` */

insert  into `listas_elementos`(`id`,`codigo`,`nombre`,`tipo_lista_id`) values (1,'ADM','Administrador',1),(2,'CLI','Cliente',1),(3,'M','Masculino',2),(4,'F','Femenino',2),(5,'ENT','Entregado',3),(6,'PEN','Pendiente',3),(7,'ANUL','Anulado',3),(8,'RECH','Rechazado',3);

/*Table structure for table `pedidos` */

DROP TABLE IF EXISTS `pedidos`;

CREATE TABLE `pedidos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `usuario_id` int(11) NOT NULL,
  `referencia` varchar(45) NOT NULL,
  `fecha_pedido` datetime NOT NULL,
  `estado_id` int(11) NOT NULL,
  `fecha_entrega` datetime DEFAULT NULL,
  `total` decimal(15,5) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

/*Data for the table `pedidos` */

insert  into `pedidos`(`id`,`usuario_id`,`referencia`,`fecha_pedido`,`estado_id`,`fecha_entrega`,`total`) values (1,2,'PED1','2020-01-05 00:00:00',5,'2020-01-20 00:00:00','50.00000'),(2,3,'PED2','2020-02-01 00:00:00',6,NULL,'100.00000'),(3,4,'PED3','2020-03-01 00:00:00',7,NULL,'70.00000');

/*Table structure for table `productos` */

DROP TABLE IF EXISTS `productos`;

CREATE TABLE `productos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `codigo` varchar(45) NOT NULL,
  `nombre` varchar(45) NOT NULL,
  `costo` decimal(15,5) NOT NULL,
  `imagen` text DEFAULT NULL,
  `usuario_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

/*Data for the table `productos` */

insert  into `productos`(`id`,`codigo`,`nombre`,`costo`,`imagen`,`usuario_id`) values (1,'prod1','Cinta','30.00000','jeff.jpeg',1),(2,'prod2','Resma','20.00000','cart_1.jpg',2),(3,'prod3','Lapicero','10.00000','cart_1.jpg',NULL),(4,'prod4','Borrador','15.00000','cart_1.jpg',NULL),(5,'prod5','Marcador','43.00000','cart_1.jpg',NULL);

/*Table structure for table `roles` */

DROP TABLE IF EXISTS `roles`;

CREATE TABLE `roles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `roles` */

/*Table structure for table `tipos_listas` */

DROP TABLE IF EXISTS `tipos_listas`;

CREATE TABLE `tipos_listas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

/*Data for the table `tipos_listas` */

insert  into `tipos_listas`(`id`,`nombre`) values (1,'roles'),(2,'generos'),(3,'estados pedidos');

/*Table structure for table `usuarios` */

DROP TABLE IF EXISTS `usuarios`;

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombres` varchar(50) NOT NULL,
  `apellidos` varchar(50) NOT NULL,
  `identificacion` varchar(15) NOT NULL,
  `genero_id` int(11) NOT NULL,
  `rol_id` int(11) NOT NULL,
  `email` varchar(100) NOT NULL,
  `contrasena` varchar(250) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

/*Data for the table `usuarios` */

insert  into `usuarios`(`id`,`nombres`,`apellidos`,`identificacion`,`genero_id`,`rol_id`,`email`,`contrasena`) values (1,'admin','sistem','000000000',3,1,'admin@gmail.com','123'),(2,'Jeff','Diaz','1003810783',3,2,'jeff@gmail.com','123'),(3,'Leo','Jimenez','2110989212',3,2,'leo@gmail.com','123'),(4,'Mauricio','Diaz','7585027',3,2,'mao@gmail.com','123'),(5,'Camila','Gaviria','2182919090',4,2,'cami@gmail.com','123');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
