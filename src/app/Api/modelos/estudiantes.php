<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

require_once 'datos/conexionBD.php';
require_once 'utils/constantes.php';
require_once 'utils/ExceptionApi.php';
require_once 'vistas/vistaJSON.php';
	
/*define ("tabla", "estudiantes");
define ("id", "idest");
define ("nombre", "nombre");
define ("grupo", "grupo");
define ("sexo", "sexo");*/

class Estudiantes {

	const TABLA = "estudiantes";
    const ID = "idest";
    const NOMBRE = "nombre";
    const GRUPO = "grupo";
	const SEXO = "sexo";
	
    public static function insertarEstudiante($infoEstudiante){
        try{
            $conexion = Conexion::getInstancia()->getConexion();
			
			$query = "INSERT INTO estudiantes". "( ".self::ID.", ".self::NOMBRE.", ".self::GRUPO.", ".self::SEXO.") VALUES (?, ?, ?, ?);";
			
			//echo json_encode($infoEstudiante->idest, JSON_PRETTY_PRINT);
			//$query = "INSERT INTO estudiantes(idest, nombre, grupo, sexo) VALUES ('$infoEstudiante->idest', '$infoEstudiante->nombre', '$infoEstudiante->grupo', '$infoEstudiante->sexo')";
                
			$sentencia = $conexion->prepare($query);
			
            $sentencia->bindParam(1, $infoEstudiante["idest"]);
			$sentencia->bindParam(2, $infoEstudiante["nombre"]);
			$sentencia->bindParam(3, $infoEstudiante["grupo"]);
			$sentencia->bindParam(4, $infoEstudiante["sexo"]);
			/*$sentencia->bindParam(1, $infoEstudiante[0]);
			$sentencia->bindParam(2, $infoEstudiante[1]);
			$sentencia->bindParam(3, $infoEstudiante[2]);
            $sentencia->bindParam(4, $infoEstudiante[3]);*/
		
            if($sentencia->execute()){
				return
					[
						"estado" => CREACION_EXITOSA,
						"mensaje" => "Estudiante creado satisfactoriamente."
					];
			}else{
				throw new ExceptionApi(CREACION_FALLIDA, "error en la sentencia");
			}
        }catch(PDOException $e){
			throw new ExceptionApi(PDO_ERROR, "ERROR en conexion PDO ".$e->getMessage());
		}
    }

    public static function getEstudiantes(){
        try{
            $conexion = Conexion::getInstancia()->getConexion();

			$sentencia = $conexion->prepare("SELECT * FROM estudiantes");
			
			//$sentencia = $conexion->query($query);
			//$vista->imprimir("SELECT * FROM ".tabla);
			if($sentencia->execute()){
				http_response_code(200);
				return
					[
						'datos' => $sentencia->fetchAll(PDO::FETCH_ASSOC)
					];
			}else{
				throw new ExceptionApi(ESTADO_FALLIDO, "error en la consulta");
			}
        }catch(PDOException $e){
			throw new ExceptionApi(PDO_ERROR, "error en conexion PDO");
		}
	}
	
	public static function buscarPorId($id){
		try{
			$conexion = Conexion::getInstancia()->getConexion();

			$query = "SELECT * FROM ".self::TABLA." WHERE idest = ?;";

			$sentencia = $conexion->prepare($query);

			$sentencia->bindParam(1, $id);

			if($sentencia->execute()){
				http_response_code(200);
				return
					[
						"estado" => ESTADO_EXITOSO,
						"datos" => $sentencia->fetchAll(PDO::FETCH_ASSOC)
					];
			}else{
				throw new ExceptionApi(ESTADO_FALLIDO, "ERROR en la consulta");
			}
		}catch(PDOException $e){
			throw new ExceptionApi(PDO_ERROR, "ERROR en conexion PDO");
		}
	}
}
?>