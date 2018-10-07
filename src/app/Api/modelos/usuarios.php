<?php
require_once 'datos/conexionBD.php';
require_once 'utils/constantes.php';
require_once 'utils/ExceptionApi.php';
require_once 'vistas/vistaJSON.php';

class Usuarios {

	const TABLA = "usuario";
    const ID = "id_usuario";
    const NOMBRES = "nombres";
    const ROL = "rol";
    const USER = "user";
    const PASS = "password";
  
	
    public static function insertarUsuario($infoUsuario){
        try{
            $conexion = Conexion::getInstancia()->getConexion();
			
			$query = "INSERT INTO ".self::TABLA."( ".self::ID.", ".self::NOMBRES.",".self::ROL.",".self::USER.",".self::PASS.") VALUES (?, ?, ?, ?, ?);";
        
            $sentencia = $conexion->prepare($query);
            
			$sentencia->bindParam(1, $infoUsuario["id_usuario"]);			
            $sentencia->bindParam(2, $infoUsuario["nombres"]);
            $sentencia->bindParam(3, $infoUsuario["rol"]);
            $sentencia->bindParam(4, $infoUsuario["user"]);
            $sentencia->bindParam(5, $infoUsuario["password"]);
		
            if($sentencia->execute()){
				return 
					[
						"estado" => CREACION_EXITOSA,
						"mensaje" => "Usuario guardado satisfactoriamente."
					];
				
			}else{
				throw new ExceptionApi(CREACION_FALLIDA, "error en la sentencia");
			}
        }catch(PDOException $e){
			throw new ExceptionApi(PDO_ERROR, "ERROR en conexion PDO ".$e->getMessage());
		}
	}
	public static function actualizarUsuario($infoUsuario){
        try{
            $conexion = Conexion::getInstancia()->getConexion();
			
			$query = "UPDATE ".self::TABLA." SET  ".self::NOMBRES." =?, ".self::ROL." =?,".self::USER." =?,".self::PASS." =?  WHERE ".self::ID."=?;";
			
            $sentencia = $conexion->prepare($query);
            
			$sentencia->bindParam(1, $infoUsuario["nombres"]);
            $sentencia->bindParam(2, $infoUsuario["rol"]);            
            $sentencia->bindParam(3, $infoUsuario["user"]);
            $sentencia->bindParam(4, $infoUsuario["password"]);
            $sentencia->bindParam(5, $infoUsuario["id_usuario"]);

		
            if($sentencia->execute()){
				return 
					[
						"estado" => CREACION_EXITOSA,
						"mensaje" => "Usuario editado satisfactoriamente."
					];
				
			}else{
				throw new ExceptionApi(CREACION_FALLIDA, "error en la sentencia");
			}
        }catch(PDOException $e){
			throw new ExceptionApi(PDO_ERROR, "ERROR en conexion PDO ".$e->getMessage());
		}
    }

    public static function getUsuarios(){
        try{
            $conexion = Conexion::getInstancia()->getConexion();

			$sentencia = $conexion->prepare("SELECT * FROM ".self::TABLA.";");
			
		
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

	public static function login($infoUsuario){
		try{
			$conexion = Conexion::getInstancia()->getConexion();

			$query = "select * from usuario where user=? and password =?;";

			$sentencia = $conexion->prepare($query);

			$sentencia->bindParam(1, $infoUsuario["user"]);
			$sentencia->bindParam(2, $infoUsuario["password"]);

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
		
	public static function eliminarUsuario($id){
		try{
			$conexion = Conexion::getInstancia()->getConexion();

			$query = "DELETE FROM ".self::TABLA." WHERE ".self::ID." = ?;";

			$sentencia = $conexion->prepare($query);

			$sentencia->bindParam(1, $id);

			if($sentencia->execute()){
				return
					[
						"estado" => ESTADO_EXITOSO,
						"mensaje" => "Se elimino correctamente el usuario"
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