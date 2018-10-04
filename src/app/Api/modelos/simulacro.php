<?php
require_once 'datos/conexionBD.php';
require_once 'utils/constantes.php';
require_once 'utils/ExceptionApi.php';
require_once 'vistas/vistaJSON.php';
	


class Simulacro {

	const TABLA = "simulacro";
    const ID = "id_simulacro";
    const FECHA = "fecha";
    const RESPONSABLE = "responsable";
	const GRUPO = "grupo";
	
    public static function insertarSimulacro($infoSimulacro){
        try{
            $conexion = Conexion::getInstancia()->getConexion();
			
			$query = "INSERT INTO ".self::TABLA."( ".self::ID.", ".self::FECHA.", ".self::RESPONSABLE.", ".self::GRUPO.") VALUES (?, ?, ?, ?);";
			
                
			$sentencia = $conexion->prepare($query);
			
            $sentencia->bindParam(1, $infoSimulacro[Self::ID]);
			$sentencia->bindParam(2, $infoSimulacro[self::FECHA]);
			$sentencia->bindParam(3, $infoSimulacro[self::RESPONSABLE]);
			$sentencia->bindParam(4, $infoSimulacro[self::GRUPO]);
		
            if($sentencia->execute()){
				return 
					[
						"estado" => CREACION_EXITOSA,
						"mensaje" => "Simulacro creado satisfactoriamente."
					];
				
			}else{
				throw new ExceptionApi(CREACION_FALLIDA, "error en la sentencia");
			}
        }catch(PDOException $e){
			throw new ExceptionApi(PDO_ERROR, "ERROR en conexion PDO ".$e->getMessage());
		}
	}
	public static function actualizarSimulacro($infoSimulacro){
        try{
            $conexion = Conexion::getInstancia()->getConexion();
			
			$query = "UPDATE ".self::TABLA." SET  ".self::FECHA."=?, ".self::RESPONSABLE."=?, ".self::GRUPO."=? WHERE ".self::ID."=?;";
	
			$sentencia = $conexion->prepare($query);
			
            $sentencia->bindParam(4, $infoSimulacro[Self::ID]);
			$sentencia->bindParam(1, $infoSimulacro[self::FECHA]);
			$sentencia->bindParam(2, $infoSimulacro[self::RESPONSABLE]);
			$sentencia->bindParam(3, $infoSimulacro[self::GRUPO]);

            if($sentencia->execute()){
				return 
					[
						"estado" => CREACION_EXITOSA,
						"mensaje" => "Simulacro editado satisfactoriamente."
					];
				
			}else{
				throw new ExceptionApi(CREACION_FALLIDA, "error en la sentencia");
			}
        }catch(PDOException $e){
			throw new ExceptionApi(PDO_ERROR, "ERROR en conexion PDO ".$e->getMessage());
		}
    }

    public static function getSimulacros(){
        try{
            $conexion = Conexion::getInstancia()->getConexion();

			$sentencia = $conexion->prepare("SELECT ".self::ID.",  DATE_FORMAT(".self::FECHA.",'%d/%m/%Y') as fecha ,".self::RESPONSABLE.",".self::GRUPO." FROM ".self::TABLA);
		
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
	
	public static function buscarSimulacros($dato){// BUSCA SIMULACRO POR ID,FECHA,RESPONSABLE, GRUPO
		try{
			$conexion = Conexion::getInstancia()->getConexion();

			$query = "call spBuscarSimulacro('".$dato."%')";
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
		
	public static function eliminarSimulacro($id){
		try{
			$conexion = Conexion::getInstancia()->getConexion();

			$query = "DELETE FROM ".self::TABLA." WHERE ".self::ID." = ?;";

			$sentencia = $conexion->prepare($query);

			$sentencia->bindParam(1, $id);

			if($sentencia->execute()){
				return
					[
						"estado" => ESTADO_EXITOSO,
						"mensaje" => "Se elimino correctamente el simulacro"
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