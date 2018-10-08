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
    const ID = "id_estudiante";
    const NOMBRE = "nombre";
    const PROGRAMA = "programa";
	const SEXO = "sexo";
	
    public static function insertarEstudiante($infoEstudiante){
        try{
            $conexion = Conexion::getInstancia()->getConexion();
			
			$query = "INSERT INTO estudiantes". "( ".self::ID.", ".self::NOMBRE.", ".self::PROGRAMA.", ".self::SEXO.") VALUES (?, ?, ?, ?);";
			
                
			$sentencia = $conexion->prepare($query);
			
            $sentencia->bindParam(1, $infoEstudiante["id_estudiante"]);
			$sentencia->bindParam(2, $infoEstudiante["nombre"]);
			$sentencia->bindParam(3, $infoEstudiante["programa"]);
			$sentencia->bindParam(4, $infoEstudiante["sexo"]);
		
		
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
			throw new ExceptionApi($e->getCode(), "ERROR en conexion PDO ");		}
    }

    public static function getEstudiantes(){
        try{
            $conexion = Conexion::getInstancia()->getConexion();

			$sentencia = $conexion->prepare("SELECT * FROM estudiantes order by ".self::NOMBRE." limit 30;");
		
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

			$query = "SELECT * FROM ".self::TABLA." WHERE ".self::ID." = ?;";

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
	public static function buscarEstudiante($dato){// BUSCA estudiante POR ID,NOMBRE,PROGRAMA
		try{
			$conexion = Conexion::getInstancia()->getConexion();

			$query = "call spBuscarEstudiante('".$dato."%')";
            $sentencia = $conexion->prepare($query);


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
			throw new ExceptionApi(PDO_ERROR, "ERROR en conexion PDO".$e->getmessage());
		}
	}

	public static function eliminarEstudiante($id){
		try{
			$conexion = Conexion::getInstancia()->getConexion();

			$query = "DELETE FROM ".self::TABLA." WHERE id_estudiante = ?;";

			$sentencia = $conexion->prepare($query);

			$sentencia->bindParam(1, $id);

			if($sentencia->execute()){
				return
					[
						"estado" => ESTADO_EXITOSO,
						"mensaje" => "Se elimino correctamente el estudiante"
					];
			}else{
				throw new ExceptionApi(ESTADO_FALLIDO, "ERROR en la consulta");
			}
		}catch(PDOException $e){
			throw new ExceptionApi(PDO_ERROR, "ERROR en conexion PDO".$e->getMessage());
		}
	}

	public static function actualizarEstudiante($infoEstudiante){
        try{
            $conexion = Conexion::getInstancia()->getConexion();
			
			$query = "UPDATE ".self::TABLA." SET  ".self::NOMBRE."=?, ".self::PROGRAMA."=?, ".self::SEXO."=? WHERE ".self::ID."=?;";
	
			$sentencia = $conexion->prepare($query);
			
			$sentencia->bindParam(1, $infoEstudiante["nombre"]);
			$sentencia->bindParam(2, $infoEstudiante["programa"]);
			$sentencia->bindParam(3, $infoEstudiante["sexo"]);
			$sentencia->bindParam(4, $infoEstudiante["id_estudiante"]);

            if($sentencia->execute()){
				return 
					[
						"estado" => CREACION_EXITOSA,
						"mensaje" => "Estudiante editado satisfactoriamente."
					];
				
			}else{
				throw new ExceptionApi(CREACION_FALLIDA, "error en la sentencia");
			}
        }catch(PDOException $e){
			throw new ExceptionApi(PDO_ERROR, "ERROR en conexion PDO ".$e->getMessage());
		}
    }

}
?>