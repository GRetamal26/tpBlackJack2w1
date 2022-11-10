CREATE DATABASE `blackjack` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

use blackjack;
CREATE TABLE `usuario` (
  `idusuario` int NOT NULL AUTO_INCREMENT,
  `nom_usuario` varchar(45) NOT NULL,
  `contrasenia` varchar(45) NOT NULL,
  PRIMARY KEY (`idusuario`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `sesion` (
  `idsesion` int NOT NULL AUTO_INCREMENT,
  `idusuario` int DEFAULT NULL,
  `enjuego` bit(1) DEFAULT b'0',
  `victoriasJugador` int DEFAULT NULL,
  `blackjackJugador` int DEFAULT NULL,
  `blackjackCrupier` int DEFAULT NULL,
  `totalDePartidas` int DEFAULT NULL,
  `sePasoDe21` int DEFAULT NULL,
  PRIMARY KEY (`idsesion`),
  KEY `fk_usuario_idx` (`idusuario`),
  CONSTRAINT `fk_usuario` FOREIGN KEY (`idusuario`) REFERENCES `usuario` (`idusuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `mano_jugador` (
  `idmj` int NOT NULL AUTO_INCREMENT,
  `idsesion` int DEFAULT NULL,
  `palo` varchar(1) DEFAULT NULL,
  `valor` int DEFAULT NULL,
  `esAs` bit(1) DEFAULT NULL,
  PRIMARY KEY (`idmj`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `mano_crupier` (
  `idmc` int NOT NULL AUTO_INCREMENT,
  `idsesion` int DEFAULT NULL,
  `palo` varchar(1) DEFAULT NULL,
  `valor` int DEFAULT NULL,
  `esAs` bit(1) DEFAULT NULL,
  PRIMARY KEY (`idmc`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `cartas_sin_jugar` (
  `idsj` int NOT NULL AUTO_INCREMENT,
  `idsesion` int DEFAULT NULL,
  `palo` varchar(1) DEFAULT NULL,
  `valor` int DEFAULT NULL,
  `esAs` bit(1) DEFAULT NULL,
  PRIMARY KEY (`idsj`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `cartas_jugadas` (
  `idcj` int NOT NULL AUTO_INCREMENT,
  `idsesion` int DEFAULT NULL,
  `palo` varchar(1) DEFAULT NULL,
  `valor` int DEFAULT NULL,
  `esAs` bit(1) DEFAULT NULL,
  PRIMARY KEY (`idcj`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `carta` (
  `palo` varchar(1) DEFAULT NULL,
  `valor` int DEFAULT NULL,
  `esAs` bit(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;



insert into carta (`palo`, `valor`, `esAs`) values ('p',1,1);
insert into carta (`palo`, `valor`, `esAs`) values ('p',2,0);
insert into carta (`palo`, `valor`, `esAs`) values ('p',3,0);
insert into carta (`palo`, `valor`, `esAs`) values ('p',4,0);
insert into carta (`palo`, `valor`, `esAs`) values ('p',5,0);
insert into carta (`palo`, `valor`, `esAs`) values ('p',6,0);
insert into carta (`palo`, `valor`, `esAs`) values ('p',7,0);
insert into carta (`palo`, `valor`, `esAs`) values ('p',8,0);
insert into carta (`palo`, `valor`, `esAs`) values ('p',9,0);
insert into carta (`palo`, `valor`, `esAs`) values ('p',10,0);
insert into carta (`palo`, `valor`, `esAs`) values ('p',11,0);
insert into carta (`palo`, `valor`, `esAs`) values ('p',12,0);
insert into carta (`palo`, `valor`, `esAs`) values ('p',13,0);

insert into carta (`palo`, `valor`, `esAs`) values ('t',1,1);
insert into carta (`palo`, `valor`, `esAs`) values ('t',2,0);
insert into carta (`palo`, `valor`, `esAs`) values ('t',3,0);
insert into carta (`palo`, `valor`, `esAs`) values ('t',4,0);
insert into carta (`palo`, `valor`, `esAs`) values ('t',5,0);
insert into carta (`palo`, `valor`, `esAs`) values ('t',6,0);
insert into carta (`palo`, `valor`, `esAs`) values ('t',7,0);
insert into carta (`palo`, `valor`, `esAs`) values ('t',8,0);
insert into carta (`palo`, `valor`, `esAs`) values ('t',9,0);
insert into carta (`palo`, `valor`, `esAs`) values ('t',10,0);
insert into carta (`palo`, `valor`, `esAs`) values ('t',11,0);
insert into carta (`palo`, `valor`, `esAs`) values ('t',12,0);
insert into carta (`palo`, `valor`, `esAs`) values ('t',13,0);

insert into carta (`palo`, `valor`, `esAs`) values ('c',1,1);
insert into carta (`palo`, `valor`, `esAs`) values ('c',2,0);
insert into carta (`palo`, `valor`, `esAs`) values ('c',3,0);
insert into carta (`palo`, `valor`, `esAs`) values ('c',4,0);
insert into carta (`palo`, `valor`, `esAs`) values ('c',5,0);
insert into carta (`palo`, `valor`, `esAs`) values ('c',6,0);
insert into carta (`palo`, `valor`, `esAs`) values ('c',7,0);
insert into carta (`palo`, `valor`, `esAs`) values ('c',8,0);
insert into carta (`palo`, `valor`, `esAs`) values ('c',9,0);
insert into carta (`palo`, `valor`, `esAs`) values ('c',10,0);
insert into carta (`palo`, `valor`, `esAs`) values ('c',11,0);
insert into carta (`palo`, `valor`, `esAs`) values ('c',12,0);
insert into carta (`palo`, `valor`, `esAs`) values ('c',13,0);

insert into carta (`palo`, `valor`, `esAs`) values ('d',1,1);
insert into carta (`palo`, `valor`, `esAs`) values ('d',2,0);
insert into carta (`palo`, `valor`, `esAs`) values ('d',3,0);
insert into carta (`palo`, `valor`, `esAs`) values ('d',4,0);
insert into carta (`palo`, `valor`, `esAs`) values ('d',5,0);
insert into carta (`palo`, `valor`, `esAs`) values ('d',6,0);
insert into carta (`palo`, `valor`, `esAs`) values ('d',7,0);
insert into carta (`palo`, `valor`, `esAs`) values ('d',8,0);
insert into carta (`palo`, `valor`, `esAs`) values ('d',9,0);
insert into carta (`palo`, `valor`, `esAs`) values ('d',10,0);
insert into carta (`palo`, `valor`, `esAs`) values ('d',11,0);
insert into carta (`palo`, `valor`, `esAs`) values ('d',12,0);
insert into carta (`palo`, `valor`, `esAs`) values ('d',13,0);

insert into carta (`palo`, `valor`, `esAs`) values ('p',1,1);
insert into carta (`palo`, `valor`, `esAs`) values ('p',2,0);
insert into carta (`palo`, `valor`, `esAs`) values ('p',3,0);
insert into carta (`palo`, `valor`, `esAs`) values ('p',4,0);
insert into carta (`palo`, `valor`, `esAs`) values ('p',5,0);
insert into carta (`palo`, `valor`, `esAs`) values ('p',6,0);
insert into carta (`palo`, `valor`, `esAs`) values ('p',7,0);
insert into carta (`palo`, `valor`, `esAs`) values ('p',8,0);
insert into carta (`palo`, `valor`, `esAs`) values ('p',9,0);
insert into carta (`palo`, `valor`, `esAs`) values ('p',10,0);
insert into carta (`palo`, `valor`, `esAs`) values ('p',11,0);
insert into carta (`palo`, `valor`, `esAs`) values ('p',12,0);
insert into carta (`palo`, `valor`, `esAs`) values ('p',13,0);

insert into carta (`palo`, `valor`, `esAs`) values ('t',1,1);
insert into carta (`palo`, `valor`, `esAs`) values ('t',2,0);
insert into carta (`palo`, `valor`, `esAs`) values ('t',3,0);
insert into carta (`palo`, `valor`, `esAs`) values ('t',4,0);
insert into carta (`palo`, `valor`, `esAs`) values ('t',5,0);
insert into carta (`palo`, `valor`, `esAs`) values ('t',6,0);
insert into carta (`palo`, `valor`, `esAs`) values ('t',7,0);
insert into carta (`palo`, `valor`, `esAs`) values ('t',8,0);
insert into carta (`palo`, `valor`, `esAs`) values ('t',9,0);
insert into carta (`palo`, `valor`, `esAs`) values ('t',10,0);
insert into carta (`palo`, `valor`, `esAs`) values ('t',11,0);
insert into carta (`palo`, `valor`, `esAs`) values ('t',12,0);
insert into carta (`palo`, `valor`, `esAs`) values ('t',13,0);

insert into carta (`palo`, `valor`, `esAs`) values ('c',1,1);
insert into carta (`palo`, `valor`, `esAs`) values ('c',2,0);
insert into carta (`palo`, `valor`, `esAs`) values ('c',3,0);
insert into carta (`palo`, `valor`, `esAs`) values ('c',4,0);
insert into carta (`palo`, `valor`, `esAs`) values ('c',5,0);
insert into carta (`palo`, `valor`, `esAs`) values ('c',6,0);
insert into carta (`palo`, `valor`, `esAs`) values ('c',7,0);
insert into carta (`palo`, `valor`, `esAs`) values ('c',8,0);
insert into carta (`palo`, `valor`, `esAs`) values ('c',9,0);
insert into carta (`palo`, `valor`, `esAs`) values ('c',10,0);
insert into carta (`palo`, `valor`, `esAs`) values ('c',11,0);
insert into carta (`palo`, `valor`, `esAs`) values ('c',12,0);
insert into carta (`palo`, `valor`, `esAs`) values ('c',13,0);

insert into carta (`palo`, `valor`, `esAs`) values ('d',1,1);
insert into carta (`palo`, `valor`, `esAs`) values ('d',2,0);
insert into carta (`palo`, `valor`, `esAs`) values ('d',3,0);
insert into carta (`palo`, `valor`, `esAs`) values ('d',4,0);
insert into carta (`palo`, `valor`, `esAs`) values ('d',5,0);
insert into carta (`palo`, `valor`, `esAs`) values ('d',6,0);
insert into carta (`palo`, `valor`, `esAs`) values ('d',7,0);
insert into carta (`palo`, `valor`, `esAs`) values ('d',8,0);
insert into carta (`palo`, `valor`, `esAs`) values ('d',9,0);
insert into carta (`palo`, `valor`, `esAs`) values ('d',10,0);
insert into carta (`palo`, `valor`, `esAs`) values ('d',11,0);
insert into carta (`palo`, `valor`, `esAs`) values ('d',12,0);
insert into carta (`palo`, `valor`, `esAs`) values ('d',13,0);

create view vistaReportesGlobal as
select sum(victoriasJugador) as Victorias, sum(totalDePartidas) as Partidas, sum(blackjackJugador) as BJugador, sum(blackjackCrupier) as BCrupier, sum(sePasoDe21) as MasDe21 from sesion;

create view vistaReportesJugador as
select idusuario as Usuario, sum(victoriasJugador) as Victorias, sum(totalDePartidas) as Partidas, sum(blackjackJugador) as BJugador, sum(blackjackCrupier) as BCrupier, sum(sePasoDe21) as MasDe21 from sesion group by idusuario;

create view vistaUsuariosConMas21 as
select u.nom_usuario as Usuario, sum(s.sePasoDe21) as MasDe21 from sesion s join usuario u on u.idusuario = s.idusuario group by nom_usuario order by MasDe21 desc limit 3