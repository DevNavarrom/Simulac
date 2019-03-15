-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Mar 12, 2019 at 05:14 PM
-- Server version: 10.3.13-MariaDB
-- PHP Version: 7.3.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `id6941905_secudb`
--
CREATE DATABASE IF NOT EXISTS `secudb` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `secudb`;

DELIMITER $$
--
-- Procedures
--
DROP PROCEDURE IF EXISTS `registrarEstudiante`$$
CREATE DEFINER=`root`@`%` PROCEDURE `registrarEstudiante` (IN `_id` VARCHAR(11), IN `_nombre` VARCHAR(100), IN `_user` VARCHAR(45), IN `_password` VARCHAR(100))  NO SQL
BEGIN

IF NOT EXISTS (SELECT user FROM usuario WHERE user= _user)THEN


IF NOT EXISTS (SELECT user FROM estudiantes WHERE user= _user)THEN
INSERT INTO estudiantes(id_estudiante,nombre,user,password) VALUES(_id,_nombre,_user,_password);
select "USUARIO REGISTRADO" as resultado;
ELSE select "El usuario ya se encuentra registrado" as resultado;
end IF;
ELSE select "El usuario ya se encuentra registrado" as resultado;
end IF;





ENd$$

DROP PROCEDURE IF EXISTS `spBuscarEstudiante`$$
CREATE DEFINER=`root`@`%` PROCEDURE `spBuscarEstudiante` (IN `dato` VARCHAR(50))  NO SQL
BEGIN
select * from estudiantes
where id_estudiante like dato or nombre like dato or programa like dato 
order by nombre;

END$$

DROP PROCEDURE IF EXISTS `spBuscarExamen`$$
CREATE DEFINER=`root`@`%` PROCEDURE `spBuscarExamen` (IN `dato` VARCHAR(45))  NO SQL
BEGIN
SELECT id_examen AS id, desc_examen, tem.desc_tema, are.desc_area, (SELECT COUNT(id_pregunta) FROM detalle_examen WHERE id_examen = id) AS cantidad FROM examen AS exa INNER JOIN tema AS tem ON tem.id_tema = exa.id_tema INNER JOIN area AS are ON are.id_area = tem.id_area
where id_examen like dato or desc_examen like dato or tem.desc_tema like dato or are.desc_area like dato ORDER by id_examen DESC limit 6;

END$$

DROP PROCEDURE IF EXISTS `spBuscarPreguntas`$$
CREATE DEFINER=`root`@`%` PROCEDURE `spBuscarPreguntas` (IN `idtema` VARCHAR(10))  NO SQL
BEGIN

select * from preguntas where id_tema LIKE idtema;

END$$

DROP PROCEDURE IF EXISTS `spBuscarSimulacro`$$
CREATE DEFINER=`root`@`%` PROCEDURE `spBuscarSimulacro` (IN `dato` VARCHAR(50))  BEGIN
select id_simulacro, DATE_FORMAT(fecha,'%d/%m/%Y') as fecha, responsable, grupo,desc_area,desc_tema,id_examen,desc_examen,estado  from simulacro natural join examen natural join tema natural join area
where id_simulacro like dato or fecha like dato or responsable like dato or grupo like dato;

END$$

DROP PROCEDURE IF EXISTS `spBuscarSimulacros`$$
CREATE DEFINER=`root`@`%` PROCEDURE `spBuscarSimulacros` (IN `dato` VARCHAR(45), IN `_estado` VARCHAR(15), IN `_fecha` VARCHAR(15), IN `_idExamen` VARCHAR(10))  NO SQL
BEGIN
SELECT id_simulacro,id_examen,desc_examen,DATE_FORMAT(fecha,'%d/%m/%Y') as fecha,responsable,grupo,estado,
(select count(id_estudiante) as participantes from detalle_simulacro where detalle_simulacro.id_simulacro=sm.id_simulacro) as participantes ,
(select SUM(calificacion) as participantes from detalle_simulacro where detalle_simulacro.id_simulacro=sm.id_simulacro) as promedio 
FROM  simulacro as sm  NATURAL JOIN examen
where (id_simulacro like dato or responsable like dato or grupo like dato) and (estado like _estado and fecha like _fecha and id_examen LIKE _idExamen )
order by sm.fecha DESC limit 30;
END$$

DROP PROCEDURE IF EXISTS `spCalificarSimulacro`$$
CREATE DEFINER=`root`@`%` PROCEDURE `spCalificarSimulacro` (`id_simu` VARCHAR(10), `id_est` INT)  BEGIN

SELECT count(id_simulacro),(
select count(correcta) FROM simulacro_respuestas  natural join respuestas
where id_simulacro=id_simu and id_estudiante=id_est and correcta=1
)  into @pre_totales,@correctas FROM simulacro_respuestas  natural join respuestas
where id_simulacro=id_simu and id_estudiante=id_est;

insert into  detalle_simulacro (id_simulacro,id_estudiante,calificacion,
fecha_presentacion,preguntas_totales,preguntas_correctas) values(
 id_simu,id_est,(5/@pre_totales)*@correctas,now(),@pre_totales,@correctas);
END$$

DROP PROCEDURE IF EXISTS `spEliminarArea`$$
CREATE DEFINER=`root`@`%` PROCEDURE `spEliminarArea` (`id` VARCHAR(10))  BEGIN
DELETE FROM tema where id_area=id;
DELETE FROM area where id_area=id;
END$$

DROP PROCEDURE IF EXISTS `spEliminarSimulacro`$$
CREATE DEFINER=`root`@`%` PROCEDURE `spEliminarSimulacro` (`id` VARCHAR(10))  BEGIN

delete from simulacro_respuestas where id_simulacro=id;
delete from detalle_simulacro where id_simulacro=id;
delete from simulacro where id_simulacro=id;

END$$

DROP PROCEDURE IF EXISTS `spExtraerPreguntas`$$
CREATE DEFINER=`root`@`%` PROCEDURE `spExtraerPreguntas` (IN `area` VARCHAR(20), IN `tema` VARCHAR(20), IN `dato` VARCHAR(40))  NO SQL
BEGIN

SELECT id_pregunta, desc_pregunta,imagen,tema.id_area,tema.id_tema FROM preguntas AS preg NATURAL JOIN tema NATURAL JOIN area WHERE (tema.id_tema LIKE tema and area.id_area like area)
and (preg.id_pregunta like dato or preg.desc_pregunta like dato) limit 10;

END$$

DROP PROCEDURE IF EXISTS `spExtraerRespuestas`$$
CREATE DEFINER=`root`@`%` PROCEDURE `spExtraerRespuestas` (IN `idpreg` INT)  NO SQL
BEGIN

SELECT id_respuesta, desc_respuesta, correcta FROM respuestas WHERE id_pregunta = idpreg;

END$$

DROP PROCEDURE IF EXISTS `spGuardarDetalleExamen`$$
CREATE DEFINER=`root`@`%` PROCEDURE `spGuardarDetalleExamen` (IN `idexa` INT(5), IN `idpre` INT(6))  NO SQL
BEGIN

INSERT INTO detalle_examen(id_examen, id_pregunta) VALUES(idexa,idpre);

END$$

DROP PROCEDURE IF EXISTS `spGuardarExamen`$$
CREATE DEFINER=`root`@`%` PROCEDURE `spGuardarExamen` (IN `idtema` VARCHAR(10), IN `descexa` VARCHAR(100), IN `idexa` INT(5))  NO SQL
BEGIN

IF NOT EXISTS(SELECT desc_examen from examen WHERE id_examen = idexa) THEN
INSERT INTO examen(id_tema, desc_examen) VALUES(idtema,descexa);

SELECT id_examen FROM examen WHERE id_tema = idtema AND desc_examen = descexa;

ELSE

	UPDATE examen SET id_tema=idtema, desc_examen=descexa WHERE id_examen = idexa;

END IF;

END$$

DROP PROCEDURE IF EXISTS `spGuardarPregunta`$$
CREATE DEFINER=`root`@`%` PROCEDURE `spGuardarPregunta` (IN `idtema` VARCHAR(10), IN `desc_pre` VARCHAR(400), IN `imag` VARCHAR(100), IN `idpreg` INT(6))  NO SQL
BEGIN

IF(idpreg = 0) THEN
    INSERT INTO preguntas(id_tema, desc_pregunta, imagen) VALUES(idtema,desc_pre,imag);
ELSE
	UPDATE preguntas SET id_tema = idtema, desc_pregunta = desc_pre, imagen = imag WHERE id_pregunta = idpreg;
end IF;

SELECT id_pregunta FROM preguntas WHERE desc_pregunta = desc_pre;

END$$

DROP PROCEDURE IF EXISTS `spGuardarRespuesta`$$
CREATE DEFINER=`root`@`%` PROCEDURE `spGuardarRespuesta` (IN `idpre` INT(6), IN `idres` VARCHAR(10), IN `descres` VARCHAR(400), IN `corr` INT(1))  NO SQL
BEGIN


IF NOT EXISTS(SELECT id_respuesta from respuestas WHERE id_pregunta = idpre AND id_respuesta = idres) THEN
	INSERT INTO respuestas(id_pregunta, id_respuesta, desc_respuesta, correcta) VALUES(idpre,idres,descres, corr);
ELSE
	UPDATE respuestas SET id_pregunta=idpre, desc_respuesta=descres, correcta=corr WHERE id_pregunta=idpre AND id_respuesta=idres;
END IF;


END$$

DROP PROCEDURE IF EXISTS `spLogin`$$
CREATE DEFINER=`root`@`%` PROCEDURE `spLogin` (IN `_user` VARCHAR(45))  BEGIN

IF EXISTS  (select  * from  estudiantes where user=_user) THEN
select "ESTUDIANTE" as rol ,id_estudiante,nombre,user,password from estudiantes WHERE user=_user;

ELSE 
IF EXISTS  (select  * from  usuario where user=_user) THEN
select "DOCENTE" as rol,id_usuario,nombres,user,password from usuario WHERE user=_user;

ELSE SELECT "No encontrado" as rol;
END IF;
END IF;


END$$

DROP PROCEDURE IF EXISTS `spMostrarExamenes`$$
CREATE DEFINER=`root`@`%` PROCEDURE `spMostrarExamenes` ()  NO SQL
BEGIN

SELECT id_examen AS id, desc_examen, tem.desc_tema, are.desc_area, (SELECT COUNT(id_pregunta) FROM detalle_examen WHERE id_examen = id) AS cantidad FROM examen AS exa INNER JOIN tema AS tem ON tem.id_tema = exa.id_tema INNER JOIN area AS are ON are.id_area = tem.id_area;


END$$

DROP PROCEDURE IF EXISTS `spMostrarPreguntas`$$
CREATE DEFINER=`root`@`%` PROCEDURE `spMostrarPreguntas` (IN `idexa` INT(5))  NO SQL
BEGIN

SELECT id_pregunta, desc_pregunta FROM preguntas AS preg NATURAL JOIN detalle_examen as detalle WHERE detalle.id_examen = idexa limit 10;

END$$

DROP PROCEDURE IF EXISTS `spPreguntasExamen`$$
CREATE DEFINER=`root`@`%` PROCEDURE `spPreguntasExamen` (IN `id` INT)  BEGIN
SELECT id_pregunta,id_examen,id_tema,desc_pregunta,imagen,id_respuesta,desc_respuesta,correcta,(SELECT COUNT(id_pregunta) from detalle_examen where id_examen=id) as numero_preguntas, (SELECT COUNT(id_respuesta) from respuestas where respuestas.id_pregunta= detalle.id_pregunta) as numero_respuestas FROM detalle_examen  as detalle natural join preguntas natural join respuestas 
where id_examen=id
order by desc_pregunta;
END$$

DROP PROCEDURE IF EXISTS `spRegistrarDocente`$$
CREATE DEFINER=`root`@`%` PROCEDURE `spRegistrarDocente` (IN `_id` VARCHAR(11), IN `_nombres` VARCHAR(100), IN `_user` VARCHAR(45), IN `_pass` VARCHAR(100), IN `_clave` INT(10))  NO SQL
BEGIN

IF EXISTS (SELECT clave_doc from parametros  as p WHERE p.clave_doc= _clave)THEN

IF NOT EXISTS (SELECT user FROM usuario WHERE user= _user)THEN


IF NOT EXISTS (SELECT user FROM estudiantes WHERE user= _user)THEN


INSERT INTO usuario(id_usuario,nombres,user,password) VALUES(_id,_nombres,_user,_pass);
select "USUARIO REGISTRADO" as resultado;


ELSE select "El usuario ya se encuentra registrado" as resultado;
end IF;
ELSE select "El usuario ya se encuentra registrado" as resultado;
end IF;

ELSE select "Clave de registro incorrecta" as resultado;

END IF;

END$$

DROP PROCEDURE IF EXISTS `spSimulacrosActivos`$$
CREATE DEFINER=`root`@`%` PROCEDURE `spSimulacrosActivos` (IN `id` INT)  NO SQL
BEGIN
SELECT desc_area,desc_tema,id_simulacro,id_examen,desc_examen,DATE_FORMAT(fecha,'%d/%m/%Y') as fecha , responsable,grupo FROM simulacro  as s NATURAL JOIN examen NATURAL JOIN tema
NATURAL JOIN area
 where  estado= 'ACTIVO' and id_simulacro NOT IN (SELECT id_simulacro from detalle_simulacro where id_estudiante=id and id_simulacro=s.id_simulacro) ;
END$$

DROP PROCEDURE IF EXISTS `spVerDetalleSimulacro`$$
CREATE DEFINER=`root`@`%` PROCEDURE `spVerDetalleSimulacro` (IN `id` VARCHAR(10), IN `dato` VARCHAR(100))  NO SQL
BEGIN
SELECT id_estudiante,nombre,DATE_FORMAT(fecha_presentacion,'%d/%m/%Y') as fecha,preguntas_correctas,preguntas_totales,
 ROUND(calificacion, 2) as calificacion FROM `detalle_simulacro` NATURAL JOIN estudiantes 
 where id_simulacro = id and (id_estudiante like dato or nombre like dato)
 order by fecha ;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `area`
--

DROP TABLE IF EXISTS `area`;
CREATE TABLE IF NOT EXISTS `area` (
  `id_area` varchar(10) NOT NULL,
  `desc_area` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `area`
--

INSERT INTO `area` (`id_area`, `desc_area`) VALUES
('A23', 'TELEMATICA'),
('LOG12', 'LÓGICA MATEMATICA'),
('PRO1', 'PROGRAMACION 1');

-- --------------------------------------------------------

--
-- Table structure for table `detalle_examen`
--

DROP TABLE IF EXISTS `detalle_examen`;
CREATE TABLE IF NOT EXISTS `detalle_examen` (
  `id_examen` int(5) UNSIGNED ZEROFILL NOT NULL,
  `id_pregunta` int(6) UNSIGNED ZEROFILL NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `detalle_examen`
--

INSERT INTO `detalle_examen` (`id_examen`, `id_pregunta`) VALUES
(00001, 000001),
(00001, 000002),
(00003, 000002),
(00004, 000002),
(00001, 000003),
(00002, 000003),
(00003, 000003),
(00002, 000004),
(00003, 000004),
(00004, 000004),
(00002, 000005),
(00002, 000006),
(00002, 000007),
(00002, 000008),
(00002, 000009),
(00002, 000010),
(00003, 000023),
(00003, 000025),
(00000, 000001),
(00000, 000006),
(00000, 000004),
(00000, 000007),
(00000, 000010),
(00000, 000009),
(00000, 000021);

-- --------------------------------------------------------

--
-- Table structure for table `detalle_simulacro`
--

DROP TABLE IF EXISTS `detalle_simulacro`;
CREATE TABLE IF NOT EXISTS `detalle_simulacro` (
  `id_simulacro` varchar(10) NOT NULL,
  `id_estudiante` varchar(11) NOT NULL,
  `calificacion` double NOT NULL,
  `fecha_presentacion` datetime NOT NULL,
  `preguntas_correctas` int(11) NOT NULL,
  `preguntas_totales` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `detalle_simulacro`
--

INSERT INTO `detalle_simulacro` (`id_simulacro`, `id_estudiante`, `calificacion`, `fecha_presentacion`, `preguntas_correctas`, `preguntas_totales`) VALUES
('SV023', '1003404925', 2.5, '2019-02-22 12:06:27', 1, 2),
('S12', '1003404925', 2.5, '2019-03-06 15:25:49', 1, 2),
('SM13', '1067917149', 4.999999998, '2019-03-12 16:45:01', 7, 7),
('SM13', '1067947103', 3.57142857, '2019-03-12 16:48:11', 5, 7),
('SM12', '1067123456', 4.375, '2019-03-12 17:06:37', 7, 8);

-- --------------------------------------------------------

--
-- Table structure for table `estudiantes`
--

DROP TABLE IF EXISTS `estudiantes`;
CREATE TABLE IF NOT EXISTS `estudiantes` (
  `id_estudiante` varchar(11) NOT NULL,
  `nombre` varchar(30) NOT NULL,
  `user` varchar(45) NOT NULL,
  `password` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `estudiantes`
--

INSERT INTO `estudiantes` (`id_estudiante`, `nombre`, `user`, `password`) VALUES
('1067917149', 'DEIMER NAVARRO MARTINEZ', 'deimer', '$2y$10$02J.FRuPrzWG8OcZtRcN2u4jvjgrbO17vcCqPLmcVNKCk8kQtDcwq'),
('1067947103', 'WENDY NAVARRO MARTINEZ', 'wendy', '$2y$10$SqvrqV3Q4megfXma0c.8sOx1J9yJUOil6.rngjbmYLVFcAGZfQrBi'),
('1067123456', 'CARLOS ARBELAEZ TORDECILLA', 'carlos', '$2y$10$nyQk5CA0JsKTv0p934Kgp.P2Kd2jwrQ5BFGR1MHPNtyVG3gkUN7Xe');

-- --------------------------------------------------------

--
-- Table structure for table `examen`
--

DROP TABLE IF EXISTS `examen`;
CREATE TABLE IF NOT EXISTS `examen` (
  `id_examen` int(5) UNSIGNED ZEROFILL NOT NULL,
  `id_tema` varchar(10) NOT NULL,
  `desc_examen` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `examen`
--

INSERT INTO `examen` (`id_examen`, `id_tema`, `desc_examen`) VALUES
(00002, 'PGEN', 'DEFINICIÓN DE CLASES Y OBJETOS'),
(00003, 'VEC', 'Examen de práctica para parcial final'),
(00000, 'PGEN', 'Clases y Vectores');

-- --------------------------------------------------------

--
-- Table structure for table `parametros`
--

DROP TABLE IF EXISTS `parametros`;
CREATE TABLE IF NOT EXISTS `parametros` (
  `clave_doc` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `parametros`
--

INSERT INTO `parametros` (`clave_doc`) VALUES
(2504);

-- --------------------------------------------------------

--
-- Table structure for table `preguntas`
--

DROP TABLE IF EXISTS `preguntas`;
CREATE TABLE IF NOT EXISTS `preguntas` (
  `id_pregunta` int(6) UNSIGNED ZEROFILL NOT NULL,
  `id_tema` varchar(10) NOT NULL,
  `desc_pregunta` varchar(400) NOT NULL,
  `imagen` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `preguntas`
--

INSERT INTO `preguntas` (`id_pregunta`, `id_tema`, `desc_pregunta`, `imagen`) VALUES
(000001, 'PGEN', '¿Cual es el primer indice de un vector?', ''),
(000002, 'VEC', '¿Un vector es unidimensional?', ''),
(000003, 'VEC', '¿Cual es el valor de este vector en index=3?', 'vector.png'),
(000004, 'VEC', '¿Qué es un vector?', ''),
(000005, 'VEC', '¿Cuál es la descripción que crees que define mejor el concepto \'clase\' en la programación orientada a objetos?', ''),
(000006, 'PGEN', '¿Qué elementos crees que definen a un objeto?', ''),
(000007, 'PGEN', '¿Qué código de los siguientes tiene que ver con la herencia?', ''),
(000008, 'PGEN', '¿Qué significa instanciar una clase?', ''),
(000009, 'PGEN', 'En Java, ¿a qué nos estamos refiriendo si hablamos de \'Swing\'?', ''),
(000010, 'PGEN', '¿Qué significa sobrecargar (overload) un método?', ''),
(000021, 'PGEN', '¿Como se instancia un objeto?', 'IMG-20180708-WA0014.jpg'),
(000022, 'PGEN', 'En una clase abstracta...', '10.png'),
(000023, 'VEC', '¿A los vectores de varias dimensiones se les conoce como?', '12.png'),
(000024, 'PGEN', '¿Existen las clases abstractas?', '24.png'),
(000025, 'VEC', '¿Como se llama el atributo publico mediante el cual se obtiene el tamaño de un array?', '1.png');

-- --------------------------------------------------------

--
-- Table structure for table `respuestas`
--

DROP TABLE IF EXISTS `respuestas`;
CREATE TABLE IF NOT EXISTS `respuestas` (
  `id_pregunta` int(6) UNSIGNED ZEROFILL NOT NULL,
  `id_respuesta` varchar(10) NOT NULL,
  `desc_respuesta` varchar(400) NOT NULL,
  `correcta` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `respuestas`
--

INSERT INTO `respuestas` (`id_pregunta`, `id_respuesta`, `desc_respuesta`, `correcta`) VALUES
(000010, '10R1', 'Editarlo para modificar su comportamiento', 0),
(000010, '10R2', 'Cambiarle el nombre dejándolo con la misma funcionalidad', 0),
(000010, '10R3', 'Crear un método con el mismo nombre pero diferentes argumentos', 1),
(000010, '10R4', 'Añadirle funcionalidades a un método', 0),
(000001, '1R1', '5', 0),
(000001, '1R2', '1', 0),
(000001, '1R3', '0', 1),
(000021, '21R1', 'NombreClase NombreObjeto;', 1),
(000021, '21R2', 'NombreObjeto: NombreClase;', 0),
(000021, '21R3', 'Objeto Clase*;', 0),
(000022, '22R1', 'todos sus metodos deben ser abstractos.', 1),
(000022, '22R2', 'Solo su construtor debe ser abstracto.', 0),
(000022, '22R3', 'Sus metodos no son abstractos.', 0),
(000023, '23R1', 'Matrices', 1),
(000023, '23R2', 'Array', 0),
(000024, '24R1', 'Si', 1),
(000024, '24R2', 'No', 0),
(000025, '25R1', 'count', 0),
(000025, '25R2', 'length', 1),
(000025, '25R3', 'max', 0),
(000002, '2R1', 'NO', 0),
(000002, '2R2', 'SI', 1),
(000003, '3R1', '22', 0),
(000003, '3R2', '4', 1),
(000003, '3R3', '9', 0),
(000004, '4R1', 'Un espacio de memoria que\r\npermite almacenar una colección de elementos', 1),
(000004, '4R2', 'Es un conjunto de números o expresiones que aparecen distribuidos ordenadamente en forma rectangular', 0),
(000004, '4R3', 'Es un arreglo bidimensional de números.', 0),
(000005, '5R1', 'Es un concepto similar al de \'array\'', 0),
(000005, '5R2', 'Es un tipo particular de variable', 0),
(000005, '5R3', 'Es un modelo o plantilla a partir de la cual creamos objetos', 1),
(000005, '5R4', 'Es una categoría de datos ordenada secuencialmente', 0),
(000006, '6R1', 'Sus cardinalidad y su tipo', 0),
(000006, '6R2', 'Sus atributos y sus métodos', 1),
(000006, '6R3', 'La forma en que establece comunicación e intercambia mensajes', 0),
(000006, '6R4', 'Su interfaz y los eventos asociados', 0),
(000007, '7R1', 'public class Componente extends Producto', 1),
(000007, '7R2', 'public class Componente inherit Producto', 0),
(000007, '7R3', 'public class Componente implements Producto', 0),
(000007, '7R4', 'public class Componente belong to Producto', 0),
(000008, '8R1', 'Duplicar una clase', 0),
(000008, '8R2', 'Eliminar una clase', 0),
(000008, '8R3', 'Crear un objeto a partir de la clase', 1),
(000008, '8R4', 'Conectar dos clases entre sí', 0),
(000009, '9R1', 'Una función utilizada para intercambiar valores', 0),
(000009, '9R2', 'Es el sobrenombre de la versión 1.3 del JDK', 0),
(000009, '9R3', 'Una librería para construir interfaces gráficas', 1),
(000009, '9R4', 'Un framework específico para Android', 0),
(000009, '9R5', 'Un IDE para desarrollar aplicacione', 0),
(000000, '0R1', 'for (int i = 0; i <n; i++) {}', 1),
(000000, '0R2', 'for (int i = 1; i = n; i++) {}', 0),
(000000, '0R3', 'for (int i = 0; i <= n+1; ++i) {}', 0),
(000000, '0R4', 'n-1', 0);

-- --------------------------------------------------------

--
-- Table structure for table `simulacro`
--

DROP TABLE IF EXISTS `simulacro`;
CREATE TABLE IF NOT EXISTS `simulacro` (
  `id_simulacro` varchar(10) NOT NULL,
  `id_examen` int(5) UNSIGNED ZEROFILL NOT NULL,
  `fecha` date NOT NULL,
  `responsable` varchar(30) NOT NULL,
  `grupo` varchar(20) NOT NULL,
  `estado` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `simulacro`
--

INSERT INTO `simulacro` (`id_simulacro`, `id_examen`, `fecha`, `responsable`, `grupo`, `estado`) VALUES
('S015', 00001, '2018-11-01', 'HAROLD BULA', 'GM1', 'FINALIZADO'),
('SM12', 00002, '2018-11-04', 'JUAN MARTINEZ', 'GMS2', 'FINALIZADO'),
('SV023', 00004, '2019-02-22', 'JUAN MARTINEZ', 'GM1B', 'ACTIVO'),
('S12', 00004, '2019-03-06', 'LARRY', '1A', 'ACTIVO'),
('SM13', 00000, '2019-03-12', 'LARRY PACHECO', 'GM1', 'ACTIVO');

-- --------------------------------------------------------

--
-- Table structure for table `simulacro_respuestas`
--

DROP TABLE IF EXISTS `simulacro_respuestas`;
CREATE TABLE IF NOT EXISTS `simulacro_respuestas` (
  `id_simulacro` varchar(10) NOT NULL,
  `id_estudiante` varchar(11) NOT NULL,
  `id_respuesta` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `simulacro_respuestas`
--

INSERT INTO `simulacro_respuestas` (`id_simulacro`, `id_estudiante`, `id_respuesta`) VALUES
('SV023', '1003404925', '2R2'),
('SV023', '1003404925', '4R3'),
('S12', '1003404925', '4R1'),
('S12', '1003404925', '2R1'),
('SM13', '1067917149', '9R3'),
('SM13', '1067917149', '21R1'),
('SM13', '1067917149', '1R3'),
('SM13', '1067917149', '7R1'),
('SM13', '1067917149', '6R2'),
('SM13', '1067917149', '4R1'),
('SM13', '1067917149', '10R3'),
('SM13', '1067947103', '9R3'),
('SM13', '1067947103', '21R2'),
('SM13', '1067947103', '1R3'),
('SM13', '1067947103', '7R2'),
('SM13', '1067947103', '6R2'),
('SM13', '1067947103', '4R1'),
('SM13', '1067947103', '10R3'),
('SM12', '1067123456', '9R3'),
('SM12', '1067123456', '3R2'),
('SM12', '1067123456', '5R3'),
('SM12', '1067123456', '7R1'),
('SM12', '1067123456', '6R2'),
('SM12', '1067123456', '4R1'),
('SM12', '1067123456', '8R3'),
('SM12', '1067123456', '10R4');

-- --------------------------------------------------------

--
-- Table structure for table `tema`
--

DROP TABLE IF EXISTS `tema`;
CREATE TABLE IF NOT EXISTS `tema` (
  `id_area` varchar(10) NOT NULL,
  `id_tema` varchar(10) NOT NULL,
  `desc_tema` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tema`
--

INSERT INTO `tema` (`id_area`, `id_tema`, `desc_tema`) VALUES
('PRO1', 'PGEN', 'CLASES'),
('PRO1', 'VEC', 'VECTORES');

-- --------------------------------------------------------

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
CREATE TABLE IF NOT EXISTS `usuario` (
  `id_usuario` varchar(11) NOT NULL,
  `nombres` varchar(100) NOT NULL,
  `user` varchar(45) NOT NULL,
  `password` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `usuario`
--

INSERT INTO `usuario` (`id_usuario`, `nombres`, `user`, `password`) VALUES
('11010181', 'Larry Pacheco Ayazo', 'larry', '$2y$10$TzCEODgY7EGqXGvt/3R7O.CV5JalhHFIZWI0FZefdYbnV9ZHQ41bG');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
