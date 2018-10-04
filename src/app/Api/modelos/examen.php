<?php
require_once 'datos/conexionBD.php';
require_once 'utils/constantes.php';
require_once 'utils/ExceptionApi.php';
require_once 'vistas/vistaJSON.php';

class Examen {

	const TABLA = "examen";
    const ID = "id_examen";
    const ID_TEMA= "id_tema";
    const DESCRIPCION = "desc_examen";
    const ESTADO = "estado";
   
  
	
    public static function insertarExamen($infoExamen){
        try{
            $conexion = Conexion::getInstancia()->getConexion();
			
			$query = "INSERT INTO ".self::TABLA."( ".self::ID.", ".self::ID_TEMA.",".self::DESCRIPCION.",".self::ESTADO.") VALUES (?, ?, ?, ?);";
        
            $sentencia = $conexion->prepare($query);
            
			$sentencia->bindParam(1, $infoExamen["id_examen"]);			
            $sentencia->bindParam(2, $infoExamen["id_tema"]);
            $sentencia->bindParam(3, $infoExamen["desc_examen"]);
            $sentencia->bindParam(4, $infoExamen["estado"]);
		
            if($sentencia->execute()){
				return 
					[
						"estado" => CREACION_EXITOSA,
						"mensaje" => "Examen guardado satisfactoriamente."
					];
				
			}else{
				throw new ExceptionApi(CREACION_FALLIDA, "error en la sentencia");
			}
        }catch(PDOException $e){
			throw new ExceptionApi(PDO_ERROR, "ERROR en conexion PDO ".$e->getMessage());
		}
	}
	public static function actualizarExamen($infoExamen){
        try{
            $conexion = Conexion::getInstancia()->getConexion();
			
			$query = "UPDATE ".self::TABLA." SET  ".self::ID_TEMA." =?, ".self::DESCRIPCION." =?,".self::ESTADO." =?  WHERE ".self::ID."=?;";
			
			$sentencia = $conexion->prepare($query);
			
			$sentencia->bindParam(4, $infoExamen["id_examen"]);			
            $sentencia->bindParam(1, $infoExamen["id_tema"]);
            $sentencia->bindParam(2, $infoExamen["desc_examen"]);
            $sentencia->bindParam(3, $infoExamen["estado"]);
		
            if($sentencia->execute()){
				return 
					[
						"estado" => CREACION_EXITOSA,
						"mensaje" => "Examen editado satisfactoriamente."
					];
				
			}else{
				throw new ExceptionApi(CREACION_FALLIDA, "error en la sentencia");
			}
        }catch(PDOException $e){
			throw new ExceptionApi(PDO_ERROR, "ERROR en conexion PDO ".$e->getMessage());
		}
    }

    public static function getExamen(){
        try{
            $conexion = Conexion::getInstancia()->getConexion();

			$sentencia = $conexion->prepare("SELECT id_examen,desc_examen,desc_area,desc_tema,(select count(*) from detalle_examen where detalle_examen.id_examen=id_examen) as preguntas
			,estado FROM examen NATURAL JOIN tema NATURAL JOIN area");
			
		
			if($sentencia->execute()){
				http_response_code(200);
				return
					[
						"estado" => ESTADO_EXITOSO,
						"datos" => $sentencia->fetchAll(PDO::FETCH_ASSOC)
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

			$query = "SELECT * FROM ".self::TABLA." NATURAL JOIN tema NATURAL JOIN area WHERE ".self::ID." = ?;";

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
		
	public static function eliminarExamen($id){
		try{
			$conexion = Conexion::getInstancia()->getConexion();

			$query = "DELETE FROM ".self::TABLA." WHERE ".self::ID." = ?;";

			$sentencia = $conexion->prepare($query);

			$sentencia->bindParam(1, $id);

			if($sentencia->execute()){
				return
					[
						"estado" => ESTADO_EXITOSO,
						"mensaje" => "Se elimino correctamente el examen"
                    ];
			}else{
				throw new ExceptionApi(ESTADO_FALLIDO, "ERROR en la consulta");
			}
		}catch(PDOException $e){
			throw new ExceptionApi(PDO_ERROR, "ERROR en conexion PDO".$e->getMessage());
		}
	}
}
?>