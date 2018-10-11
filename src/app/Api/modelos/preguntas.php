<?php
require_once 'datos/conexionBD.php';
require_once 'utils/constantes.php';
require_once 'utils/ExceptionApi.php';
require_once 'vistas/vistaJSON.php';

class Preguntas {

	const TABLA = "preguntas";
    const ID = "id_pregunta";
    const ID_TEMA= "id_tema";
    const DESCRIPCION = "desc_pregunta";
    const IMAGEN = "imagen";
   
  
	
    public static function insertarPregunta($infoPregunta){
        try{
            $conexion = Conexion::getInstancia()->getConexion();
			
			$query = "INSERT INTO ".self::TABLA."( ".self::ID_TEMA.",".self::DESCRIPCION.",".self::IMAGEN.") VALUES (?, ?, ?);";
        
            $sentencia = $conexion->prepare($query);
		
			//$sentencia->bindParam(1, $infoPregunta[self::ID]);			
            $sentencia->bindParam(1, $infoPregunta[self::ID_TEMA]);
            $sentencia->bindParam(2, $infoPregunta[self::DESCRIPCION]);
            $sentencia->bindParam(3,$infoPregunta[self::IMAGEN]);
		
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

	
	public static function actualizarPregunta($infoPregunta){
        try{
            $conexion = Conexion::getInstancia()->getConexion();
			
			$query = "UPDATE ".self::TABLA." SET  ".self::ID_TEMA." =?, ".self::DESCRIPCION." =?,".self::IMAGEN." =?  WHERE ".self::ID."=?;";
			
			$sentencia = $conexion->prepare($query);
					
            $sentencia->bindParam(1, $infoPregunta[self::ID_TEMA]);
            $sentencia->bindParam(2, $infoPregunta[self::DESCRIPCION]);
			$sentencia->bindParam(3,$infoPregunta[self::IMAGEN]);
			$sentencia->bindParam(4, $infoPregunta[self::ID]);
		
            if($sentencia->execute()){
				return 
					[
						"estado" => CREACION_EXITOSA,
						"mensaje" => "Pregunta editada satisfactoriamente."
					];
				
			}else{
				throw new ExceptionApi(CREACION_FALLIDA, "error en la sentencia");
			}
        }catch(PDOException $e){
			throw new ExceptionApi(PDO_ERROR, "ERROR en conexion PDO ".$e->getMessage());
		}
    }

    public static function getPreguntas(){
        try{
            $conexion = Conexion::getInstancia()->getConexion();

			$sentencia = $conexion->prepare("SELECT * FROM ".self::TABLA." NATURAL JOIN tema NATURAL JOIN area;");
			
		
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

	public static function buscarPorIdTema($dato){// BUSCA preguntas POR id_tema
		try{
			$conexion = Conexion::getInstancia()->getConexion();

			$query = "call spBuscarPreguntas('".$dato."%')";
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
		
	public static function eliminarPregunta($id){
		try{
			$conexion = Conexion::getInstancia()->getConexion();

			$query = "DELETE FROM ".self::TABLA." WHERE ".self::ID." = ?;";

			$sentencia = $conexion->prepare($query);

			$sentencia->bindParam(1, $id);

			if($sentencia->execute()){
				return
					[
						"estado" => ESTADO_EXITOSO,
						"mensaje" => "Se elimino correctamente la pregunta"
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