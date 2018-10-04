<?php
require_once 'datos/conexionBD.php';
require_once 'utils/constantes.php';
require_once 'utils/ExceptionApi.php';
require_once 'vistas/vistaJSON.php';

class Respuestas {

	const TABLA = "respuestas";
    const ID = "id_pregunta";
    const ID_RESPUESTA= "id_respuesta";
    const DESCRIPCION = "desc_respuesta";
    const CORRECTA = "correcta";
   
  
	
    public static function insertarRespuesta($infoRespuesta){
        try{
            $conexion = Conexion::getInstancia()->getConexion();
			
			$query = "INSERT INTO ".self::TABLA."( ".self::ID.", ".self::ID_RESPUESTA.",".self::DESCRIPCION.",".self::CORRECTA.") VALUES (?, ?, ?, ?);";
        
            $sentencia = $conexion->prepare($query);
		
			$sentencia->bindParam(1, $infoRespuesta[self::ID]);			
            $sentencia->bindParam(2, $infoRespuesta[self::ID_RESPUESTA]);
            $sentencia->bindParam(3, $infoRespuesta[self::DESCRIPCION]);
            $sentencia->bindParam(4,$infoRespuesta[self::CORRECTA]);
		
            if($sentencia->execute()){
				return 
					[
						"estado" => CREACION_EXITOSA,
						"mensaje" => "Respuesta guardada satisfactoriamente."
					];
				
			}else{
				throw new ExceptionApi(CREACION_FALLIDA, "error en la sentencia");
			}
        }catch(PDOException $e){
			throw new ExceptionApi(PDO_ERROR, "ERROR en conexion PDO ".$e->getMessage());
		}
	}
	public static function actualizarRespuesta($infoRespuesta){
        try{
            $conexion = Conexion::getInstancia()->getConexion();
			
			$query = "UPDATE ".self::TABLA." SET  ".self::ID_RESPUESTA." =?, ".self::DESCRIPCION." =?,".self::CORRECTA." =?  WHERE ".self::ID."=?;";
			
			$sentencia = $conexion->prepare($query);
					
            $sentencia->bindParam(4, $infoRespuesta[self::ID]);			
            $sentencia->bindParam(1, $infoRespuesta[self::ID_RESPUESTA]);
            $sentencia->bindParam(2, $infoRespuesta[self::DESCRIPCION]);
            $sentencia->bindParam(3,$infoRespuesta[self::CORRECTA]);
		
            if($sentencia->execute()){
				return 
					[
						"estado" => CREACION_EXITOSA,
						"mensaje" => "Respuesta editada satisfactoriamente."
					];
				
			}else{
				throw new ExceptionApi(CREACION_FALLIDA, "error en la sentencia");
			}
        }catch(PDOException $e){
			throw new ExceptionApi(PDO_ERROR, "ERROR en conexion PDO ".$e->getMessage());
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
		
	public static function eliminarRespuesta($id){
		try{
			$conexion = Conexion::getInstancia()->getConexion();

			$query = "DELETE FROM ".self::TABLA." WHERE ".self::ID." = ?;";

			$sentencia = $conexion->prepare($query);

			$sentencia->bindParam(1, $id);

			if($sentencia->execute()){
				return
					[
						"estado" => ESTADO_EXITOSO,
						"mensaje" => "Se elimino correctamente la respuesta"
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