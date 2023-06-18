-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema hotel
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema hotel
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `hotel` DEFAULT CHARACTER SET utf8 ;
USE `hotel` ;

-- -----------------------------------------------------
-- Table `hotel`.`tipoHabitacion`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `hotel`.`tipoHabitacion` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `tipoHabitacion` ENUM('Individual', 'Doble', 'Cuadruple', 'Familiar', 'Suite de lujo') NOT NULL,
  `descripcion` VARCHAR(200) NOT NULL,
  `precio` DOUBLE NOT NULL,
  `imagen` VARCHAR(250) NOT NULL,
  `estado` ENUM('Activo', 'Inactivo') NULL DEFAULT 'Activo',
  PRIMARY KEY (`id`),
  UNIQUE INDEX `tipoHabitacion_UNIQUE` (`tipoHabitacion` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `hotel`.`piso`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `hotel`.`piso` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `numPiso` INT NOT NULL,
  `capacidad` INT NOT NULL,
  `estado` ENUM('Activo', 'Inactivo') NULL DEFAULT 'Activo',
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `hotel`.`habitacion`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `hotel`.`habitacion` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `idTipo` INT NOT NULL,
  `idPiso` INT NOT NULL,
  `estado` ENUM('Disponible', 'Fuera de servicio') NOT NULL DEFAULT 'Disponible',
  PRIMARY KEY (`id`),
  INDEX `idTipo_idx` (`idTipo` ASC) VISIBLE,
  INDEX `idPiso_idx` (`idPiso` ASC) VISIBLE,
  CONSTRAINT `idTipo`
    FOREIGN KEY (`idTipo`)
    REFERENCES `hotel`.`tipoHabitacion` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `idPiso`
    FOREIGN KEY (`idPiso`)
    REFERENCES `hotel`.`piso` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `hotel`.`tipoUsuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `hotel`.`tipoUsuario` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `tipoUsuario` ENUM('Cliente', 'Empleado', 'Administrador') NOT NULL,
  `estado` ENUM('Activo', 'Inactivo') NULL DEFAULT 'Activo',
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `hotel`.`usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `hotel`.`usuario` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `usuario` VARCHAR(45) NOT NULL,
  `contrasenia` VARCHAR(255) NOT NULL,
  `idTipo` INT NOT NULL,
  `estado` ENUM('Habilitado', 'Inhabilitado') NULL DEFAULT 'Habilitado',
  UNIQUE INDEX `usuario_UNIQUE` (`usuario` ASC) VISIBLE,
  PRIMARY KEY (`id`),
  INDEX `idTipo_idx` (`idTipo` ASC) VISIBLE,
  CONSTRAINT `idTipo2`
    FOREIGN KEY (`idTipo`)
    REFERENCES `hotel`.`tipoUsuario` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `hotel`.`cliente`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `hotel`.`cliente` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `identidad` VARCHAR(13) NOT NULL,
  `nombres` VARCHAR(100) NOT NULL,
  `apellidos` VARCHAR(100) NOT NULL,
  `telefono` VARCHAR(15) NULL,
  `correo` VARCHAR(45) NULL,
  `direccion` VARCHAR(255) NOT NULL,
  `idUsuario` INT NOT NULL,
  `estado` ENUM('Activo', 'Inactivo') NOT NULL DEFAULT 'Activo',
  PRIMARY KEY (`id`),
  UNIQUE INDEX `identidad_UNIQUE` (`identidad` ASC) VISIBLE,
  INDEX `idUsuario_idx` (`idUsuario` ASC) VISIBLE,
  CONSTRAINT `idUsuario`
    FOREIGN KEY (`idUsuario`)
    REFERENCES `hotel`.`usuario` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `hotel`.`reservacion`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `hotel`.`reservacion` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `idCliente` INT NOT NULL,
  `fechaEntrada` DATE NOT NULL,
  `fechaSalida` DATE NOT NULL,
  `impuesto` DOUBLE NOT NULL,
  `observacion` VARCHAR(255) NULL,
  `estado` ENUM('En proceso','Pagado','Cancelado') NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `idCliente_idx` (`idCliente` ASC) VISIBLE,
  CONSTRAINT `idCliente`
    FOREIGN KEY (`idCliente`)
    REFERENCES `hotel`.`cliente` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `hotel`.`servicio`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `hotel`.`servicio` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `servicio` VARCHAR(120) NOT NULL DEFAULT 'Sin servicio',
  `descripcion` VARCHAR(255) NOT NULL,
  `precio` DOUBLE NOT NULL,
  `estado` ENUM('Activo', 'Inactivo') NULL DEFAULT 'Activo',
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `hotel`.`empleado`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `hotel`.`empleado` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `identidad` VARCHAR(13) NOT NULL,
  `nombres` VARCHAR(45) NOT NULL,
  `apellidos` VARCHAR(45) NOT NULL,
  `telefono` VARCHAR(10) NOT NULL,
  `correo` VARCHAR(45) NOT NULL,
  `fechaNacimiento` DATE NOT NULL,
  `idUsuario` INT NOT NULL,
  `estado` ENUM('Activo', 'Inactivo') NOT NULL DEFAULT 'Activo',
  PRIMARY KEY (`id`),
  UNIQUE INDEX `identidad_UNIQUE` (`identidad` ASC) VISIBLE,
  INDEX `idUsuario_idx` (`idUsuario` ASC) VISIBLE,
  CONSTRAINT `idUsuario2`
    FOREIGN KEY (`idUsuario`)
    REFERENCES `hotel`.`usuario` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `hotel`.`detalleHabitaciones`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `hotel`.`detalleHabitaciones` (
  `idReservacion` INT NOT NULL,
  `idHabitacion` INT NOT NULL,
  PRIMARY KEY (`idReservacion`, `idHabitacion`),
  INDEX `idHabitacion_idx` (`idHabitacion` ASC) VISIBLE,
  CONSTRAINT `idReservacion`
    FOREIGN KEY (`idReservacion`)
    REFERENCES `hotel`.`reservacion` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `idHabitacion`
    FOREIGN KEY (`idHabitacion`)
    REFERENCES `hotel`.`habitacion` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `hotel`.`detalleServicio`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `hotel`.`detalleServicio` (
  `idHabitacion` INT NOT NULL,
  `idServicio` INT NOT NULL,
  PRIMARY KEY (`idHabitacion`, `idServicio`),
  INDEX `idServicio_idx` (`idServicio` ASC) VISIBLE,
  CONSTRAINT `idHabitacion2`
    FOREIGN KEY (`idHabitacion`)
    REFERENCES `hotel`.`habitacion` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `idServicio2`
    FOREIGN KEY (`idServicio`)
    REFERENCES `hotel`.`servicio` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `hotel`.`tipoPago`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `hotel`.`tipoPago` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `tipoPago` ENUM('Efectivo', 'Tarjeta') NOT NULL,
  `estado` ENUM('Activo', 'Inactivo') NULL DEFAULT 'Activo',
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `hotel`.`factura`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `hotel`.`factura` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `idReservacion` INT NOT NULL,
  `idTipoPago` INT NOT NULL,
  `estado` ENUM('Activo', 'Inactivo') NULL DEFAULT 'Activo',
  PRIMARY KEY (`id`),
  INDEX `idReservacion_idx` (`idReservacion` ASC) VISIBLE,
  INDEX `idTipoPago_idx` (`idTipoPago` ASC) VISIBLE,
  CONSTRAINT `idReservacion2`
    FOREIGN KEY (`idReservacion`)
    REFERENCES `hotel`.`reservacion` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `idTipoPago`
    FOREIGN KEY (`idTipoPago`)
    REFERENCES `hotel`.`tipoPago` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

CREATE 
VIEW `hotel`.`empleadosvista` AS
    SELECT 
        `e`.`id` AS `id`,
        `e`.`identidad` AS `identidad`,
        `e`.`nombres` AS `nombres`,
        `e`.`apellidos` AS `apellidos`,
        `e`.`telefono` AS `telefono`,
        `e`.`correo` AS `correo`,
        `e`.`fechaNacimiento` AS `fechaNacimiento`,
        `e`.`estado` AS `estado`,
        `e`.`idUsuario` AS `idUsuario`,
        `u`.`usuario` AS `usuario`
    FROM
        (`empleado` `e`
        JOIN `usuario` `u` ON ((`e`.`idUsuario` = `u`.`id`)));
        
        
CREATE 
VIEW `hotel`.`usuariosvista` AS
    SELECT 
        `u`.`id` AS `id`,
        `u`.`usuario` AS `usuario`,
        `u`.`contrasenia` AS `contrasenia`,
        `t`.`tipoUsuario` AS `tipoUsuario`,
        `u`.`estado` AS `estado`
    FROM
        (`hotel`.`usuario` `u`
        JOIN `hotel`.`tipousuario` `t` ON ((`u`.`idTipo` = `t`.`id`)));
        
CREATE OR REPLACE
VIEW `facturavista` AS
      SELECT 
        `f`.`id` AS `id`,
        `c`.`identidad` AS `identidad`,
        CONCAT(`c`.`nombres`, ' ', `c`.`apellidos`) AS `nombreCliente`,
        `c`.`telefono` AS `telefono`,
        `r`.`id` AS `idReservacion`,
        `r`.`fechaEntrada` AS `fechaEntrada`,
        `r`.`fechaSalida` AS `fechaSalida`,
        ((SELECT 
                SUM(`th`.`precio`)
            FROM
                ((((`reservacion` `re`
                JOIN `cliente` `c` ON ((`c`.`id` = `re`.`idCliente`)))
                JOIN `detallehabitaciones` `dh` ON ((`dh`.`idReservacion` = `re`.`id`)))
                JOIN `habitacion` `h` ON ((`h`.`id` = `dh`.`idHabitacion`)))
                JOIN `tipohabitacion` `th` ON ((`th`.`id` = `h`.`idTipo`)))
            WHERE
                (`re`.`id` = `r`.`id`)) + (SELECT 
                SUM(`s`.`precio`)
            FROM
                ((((((`reservacion` `res`
                JOIN `cliente` `c` ON ((`c`.`id` = `res`.`idCliente`)))
                JOIN `detallehabitaciones` `dh` ON ((`dh`.`idReservacion` = `res`.`id`)))
                JOIN `habitacion` `h` ON ((`h`.`id` = `dh`.`idHabitacion`)))
                JOIN `tipohabitacion` `th` ON ((`th`.`id` = `h`.`idTipo`)))
                JOIN `detalleservicio` `ds` ON ((`ds`.`idHabitacion` = `h`.`id`)))
                JOIN `servicio` `s` ON ((`s`.`id` = `ds`.`idServicio`)))
            WHERE
                (`res`.`id` = `r`.`id`))) AS `SubTotal`,
        `r`.`impuesto` AS `impuesto`,
        `tp`.`id` AS `idTipoPago`, 
        `tp`.`tipoPago` AS `tipoPago`,
        `r`.`observacion` AS `observacion`,
        `f`.`estado` AS `estado`
    FROM
        ((((((((`factura` `f`
        JOIN `reservacion` `r` ON ((`f`.`idReservacion` = `r`.`id`)))
        JOIN `cliente` `c` ON ((`c`.`id` = `r`.`idCliente`)))
        JOIN `detallehabitaciones` `dh` ON ((`dh`.`idReservacion` = `r`.`id`)))
        JOIN `habitacion` `h` ON ((`h`.`id` = `dh`.`idHabitacion`)))
        JOIN `tipohabitacion` `th` ON ((`th`.`id` = `h`.`idTipo`)))
        JOIN `detalleservicio` `ds` ON ((`ds`.`idHabitacion` = `h`.`id`)))
        JOIN `servicio` `s` ON ((`s`.`id` = `ds`.`idServicio`)))
        JOIN `tipopago` `tp` ON ((`tp`.`id` = `f`.`idTipoPago`)))
        GROUP BY F.id;


CREATE OR REPLACE VIEW `vistaDetalleReservacion` AS 
select R.id,R.fechaEntrada,R.fechaSalida,DH.idHabitacion
from reservacion R INNER JOIN detalleHabitaciones DH on DH.idReservacion = R.id;


CREATE OR REPLACE VIEW `reservacionvista` AS
    SELECT `r`.`id` AS `id`,
    c.id 'idCliente',
	  c.identidad,
        CONCAT(`c`.`nombres`, ' ', `c`.`apellidos`) AS `nombreCliente`,
        `c`.`telefono` AS `telefono`,
        `r`.`fechaEntrada` AS `fechaEntrada`,
        `r`.`fechaSalida` AS `fechaSalida`,
         (SELECT 
         SUM(th.precio)
    FROM
        ((((`reservacion` `re`
        JOIN `cliente` `c` ON ((`c`.`id` = `re`.`idCliente`)))
        JOIN `detallehabitaciones` `dh` ON ((`dh`.`idReservacion` = `re`.`id`)))
        JOIN `habitacion` `h` ON ((`h`.`id` = `dh`.`idHabitacion`)))
        JOIN `tipohabitacion` `th` ON ((`th`.`id` = `h`.`idTipo`))
        )
        where re.id = r.id) + (SELECT SUM(s.precio)
         
    FROM
        ((((((`reservacion` `res`
        JOIN `cliente` `c` ON ((`c`.`id` = `res`.`idCliente`)))
        JOIN `detallehabitaciones` `dh` ON ((`dh`.`idReservacion` = `res`.`id`)))
        JOIN `habitacion` `h` ON ((`h`.`id` = `dh`.`idHabitacion`)))
        JOIN `tipohabitacion` `th` ON ((`th`.`id` = `h`.`idTipo`)))
        JOIN `detalleservicio` `ds` ON ((`ds`.`idHabitacion` = `h`.`id`)))
        JOIN `servicio` `s` ON ((`s`.`id` = `ds`.`idServicio`)))
        WHERE res.id = r.id) SubTotal,
        `r`.`impuesto` AS `impuesto`,
        `r`.`observacion` AS `observacion`,
        `r`.`estado` AS `estado`
         
    FROM
        ((((((`reservacion` `r`
        JOIN `cliente` `c` ON ((`c`.`id` = `r`.`idCliente`)))
        JOIN `detallehabitaciones` `dh` ON ((`dh`.`idReservacion` = `r`.`id`)))
        JOIN `habitacion` `h` ON ((`h`.`id` = `dh`.`idHabitacion`)))
        JOIN `tipohabitacion` `th` ON ((`th`.`id` = `h`.`idTipo`)))
        JOIN `detalleservicio` `ds` ON ((`ds`.`idHabitacion` = `h`.`id`)))
        JOIN `servicio` `s` ON ((`s`.`id` = `ds`.`idServicio`)))
        GROUP by r.id;


CREATE 
VIEW `hotel`.`vista_habitacion` AS
    SELECT 
        `h`.`id` AS `id`,
        `t`.`tipoHabitacion` AS `tipoHabitacion`,
        `t`.`descripcion` AS `descripcion`,
        `t`.`precio` AS `precio`,
        `t`.`imagen` AS `imagen`,
        `P`.`numPiso` AS `numPiso`,
        `h`.`estado` AS `estado`,
	    p.id as idPiso,
        t.id as idTipo
    FROM
        ((`hotel`.`habitacion` `h`
        JOIN `hotel`.`tipoHabitacion` `t` ON ((`h`.`idTipo` = `t`.`id`)))
        JOIN `hotel`.`piso` `P` ON ((`h`.`idPiso` = `P`.`id`)));


CREATE 
VIEW `hotel`.`vista_servicio` AS
    SELECT 
        `d`.`idHabitacion` AS `idHabitacion`,
        `s`.`servicio` AS `servicio`
    FROM
        (`hotel`.`detalleServicio` `d`
        JOIN `hotel`.`servicio` `s` ON ((`d`.`idServicio` = `s`.`id`)));

CREATE  OR REPLACE VIEW `obtenerIdUsuario` AS
select U.id from usuario U 
ORDER BY U.id desc
Limit 1;


CREATE VIEW clienteVista
AS
SELECT 
        `C`.`id` AS `id`,
        `C`.`identidad` AS `identidad`,
        `C`.`nombres` AS `nombres`,
        `C`.`apellidos` AS `apellidos`,
        `C`.`telefono` AS `telefono`,
        `C`.`correo` AS `correo`,
        `C`.`direccion` AS `direccion`,
        `C`.`idUsuario` AS `idUsuario`,
        `C`.`estado` AS `estado`,
        `U`.`usuario` AS `usuario`
    FROM
        (`cliente` `C`
        JOIN `usuario` `U` ON ((`C`.`idUsuario` = `U`.`id`)));   

CREATE  OR REPLACE VIEW `vistaSevicioHabitaciones` AS
select DS.idHabitacion,S.id, S.servicio, S.descripcion, S.precio from detalleservicio DS INNER JOIN servicio S ON S.id = DS.idServicio;

CREATE  OR REPLACE VIEW `ultimareservacion` AS
select R.id from reservacion R 
ORDER BY R.id desc
Limit 1;




CREATE VIEW  habiacionesXReservacion
AS
SELECT R.id,  H.id idHabitacion, TH.tipoHabitacion, TH.descripcion, TH.precio,TH.imagen, P.numPiso
	 FROM detallehabitaciones DH INNER JOIN habitacion H 
	 ON H.id = DH.idHabitacion
	INNER JOIN tipohabitacion TH 
	ON TH.id = H.idTipo
	INNER JOIN piso P 
	ON P.id = H.idPiso
	INNER JOIN reservacion R 
	ON R.id = DH.idReservacion;
  

CREATE OR replace VIEW servicioshabitacionv 
AS
SELECT 
    `ds`.`idHabitacion` AS `idHabitacion`,
    `ds`.`idServicio` AS `idServicio`,
    `s`.`id` AS `id`,
    `s`.`servicio` AS `servicio`,
    `s`.`descripcion` AS `descripcion`,
    `s`.`precio` AS `precio`,
    `s`.`estado` AS `estado`
FROM
    (`hotel`.`detalleservicio` `ds`
    JOIN `hotel`.`servicio` `s` ON ((`s`.`id` = `ds`.`idServicio`)));



insert into tipoUsuario (tipoUsuario) Values ("Cliente"); 
insert into tipoUsuario (tipoUsuario) Values ("Empleado");
insert into tipoUsuario (tipoUsuario) Values ("Administrador");
INSERT INTO piso (`id`,`numPiso`,`capacidad`) VALUES (1,1,20);
INSERT INTO tipohabitacion (`id`,`tipoHabitacion`,`descripcion`,`precio`,`imagen`) VALUES (1,'Individual','Comoda',3000,'img-1646067722236-951865934image.jpeg');
INSERT INTO habitacion (`id`,`idTipo`,`idPiso`,`estado`) VALUES (1,1,1,'Disponible');
INSERT INTO habitacion (`id`,`idTipo`,`idPiso`,`estado`) VALUES (2,1,1,'Disponible');
INSERT INTO `servicio` (`id`,`servicio`,`descripcion`,`precio`,`estado`) VALUES (1,'Bar','Acceso al bar',500,'Activo');
INSERT INTO `servicio` (`id`,`servicio`,`descripcion`,`precio`,`estado`) VALUES (2,'Piscina','Acceso a la piscina',150,'Activo');
INSERT INTO `servicio` (`id`,`servicio`,`descripcion`,`precio`,`estado`) VALUES (3,'Lavanderia','Acceso a la lavanderia',150,'Activo');
INSERT INTO `servicio` (`id`,`servicio`,`descripcion`,`precio`,`estado`) VALUES (4,'Aire acondicionado','El dormitorio cuenta con aire acondicionado',400,'Activo');
INSERT INTO `servicio` (`id`,`servicio`,`descripcion`,`precio`,`estado`) VALUES (5,'Wi-Fi','Acceso a internet',150,'Activo');
INSERT INTO detalleservicio (`idHabitacion`,`idServicio`) VALUES (1,1);



DELIMITER //
CREATE PROCEDURE GetHabitacionesDisponibles(
	IN fechaEntrada DATE,
    IN fechaSalida DATE
)
BEGIN
	SELECT H.id, TH.tipoHabitacion, TH.descripcion, TH.precio,TH.imagen, P.numPiso
	 FROM detallehabitaciones DH INNER JOIN habitacion H 
	 ON H.id = DH.idHabitacion
	INNER JOIN tipohabitacion TH 
	ON TH.id = H.idTipo
	INNER JOIN piso P 
	ON P.id = H.idPiso
	INNER JOIN reservacion R 
	ON R.id = DH.idReservacion
	WHERE NOT EXISTS(SELECT * 
	FROM detallehabitaciones
	WHERE fechaEntrada <= R.fechaSalida
		 AND fechaSalida >= R.fechaEntrada) 
	UNION
	SELECT H.id, TH.tipoHabitacion, TH.descripcion, TH.precio,TH.imagen, P.numPiso
	from  habitacion H INNER JOIN tipohabitacion TH 
	ON TH.id = H.idTipo
	INNER JOIN piso P 
	ON P.id = H.idPiso
	 WHERE H.id not in(SELECT idHabitacion
	 FROM detallehabitaciones);
 END //
 DELIMITER ;


 
DELIMITER //
CREATE PROCEDURE serviciosDisponibles(
  IN idh INT
)
BEGIN
  select * from servicio where id NOT IN(select idServicio from detalleServicio where idHabitacion = idh);
 END //
 DELIMITER ;

 DELIMITER $$
CREATE TRIGGER CambiarEstadoPagadoIns after INSERT on factura
for each row
BEGIN
	UPDATE reservacion SET estado = "Pagado" where id = (new.idReservacion);
    
END$$
DELIMITER ;

DELIMITER $$
CREATE TRIGGER CambiarEstadoPagadoUPD after UPDATE on factura
for each row
BEGIN
	if(new.idReservacion != old.idReservacion) THEN
		BEGIN
			UPDATE reservacion SET estado = "Pagado" where id = (new.idReservacion);
			UPDATE reservacion SET estado = "En proceso" where id = (old.idReservacion);
	END;
    END IF;
END$$


DELIMITER ;

