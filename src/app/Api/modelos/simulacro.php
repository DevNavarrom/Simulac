<?php
require_once 'datos/conexionBD.php';
require_once 'utils/constantes.php';
require_once 'utils/ExceptionApi.php';
require_once 'vistas/vistaJSON.php';
	


class Simulacro {

	const TABLA = "simulacro";
	const ID = "id_simulacro";
	const ID_EXAMEN = "id_examen";
    const FECHA = "fecha";
    const RESPONSABLE = "responsable";
	const GRUPO = "grupo";
	const ESTADO= "estado";
	
    public static function insertarSimulacro($infoSimulacro){
        try{
            $conexion = Conexion::getInstancia()->getConexion();
			
			$query = "INSERT INTO ".self::TABLA."( ".self::ID.", ".self::FECHA.", ".self::RESPONSABLE.", ".self::GRUPO.", estado,id_examen) VALUES (?, ?, ?, ?,?,?);";
			
                
			$sentencia = $conexion->prepare($query);
			
            $sentencia->bindParam(1, $infoSimulacro[Self::ID]);
			$sentencia->bindParam(2, $infoSimulacro[self::FECHA]);
			$sentencia->bindParam(3, $infoSimulacro[self::RESPONSABLE]);
			$sentencia->bindParam(4, $infoSimulacro[self::GRUPO]);
			$sentencia->bindParam(5, $infoSimulacro['estado']);
			$sentencia->bindParam(6, $infoSimulacro['id_examen']);
		
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
			throw new ExceptionApi($e->getCode(), "ERROR en conexion PDO ");
		}
	}

	public static function insertarRespuestasSimulacro($infoRespuestas){
        try{
            $conexion = Conexion::getInstancia()->getConexion();
			
			$query = "INSERT INTO simulacro_respuestas (id_simulacro,id_estudiante,id_respuesta) VALUES (?, ?, ?);";

			for($i=0;$i<count($infoRespuestas);++$i){
			$sentencia = $conexion->prepare($query);
			
            $sentencia->bindParam(1, $infoRespuestas[$i]['id_simulacro']);
			$sentencia->bindParam(2, $infoRespuestas[$i]['id_estudiante']);
			$sentencia->bindParam(3, $infoRespuestas[$i]['id_respuesta']);
			
			if(($i==count($infoRespuestas)-1))
			{
				if($sentencia->execute()){
					$q = "call spCalificarSimulacro(?,?);";
					$sentencia = $conexion->prepare($q);
					$sentencia->bindParam(1, $infoRespuestas[0]['id_simulacro']);
					$sentencia->bindParam(2, $infoRespuestas[0]['id_estudiante']);
					if($sentencia->execute()){
					return 
						[
							
							"estado" => CREACION_EXITOSA,
							"mensaje" => "Simulacro guardado correctamente"
						];
					}else{
						throw new ExceptionApi(CREACION_FALLIDA, "error en la sentencia");
					}
					
				}else{
					throw new ExceptionApi(CREACION_FALLIDA, "error en la sentencia");
				}
			}
			else{
				$sentencia->execute();
			}
		}
		    
        }catch(PDOException $e){
			throw new ExceptionApi(PDO_ERROR, "ERROR en conexion PDO ".$e->getMessage());
		}
	}
	public static function actualizarSimulacro($infoSimulacro){
        try{
            $conexion = Conexion::getInstancia()->getConexion();
			
			$query = "UPDATE ".self::TABLA." SET  ".self::FECHA."=?, ".self::RESPONSABLE."=?, ".self::GRUPO."=?, ".self::ESTADO."=? WHERE ".self::ID."=?;";
	
			$sentencia = $conexion->prepare($query);
			
            $sentencia->bindParam(5, $infoSimulacro[Self::ID]);
			$sentencia->bindParam(1, $infoSimulacro[self::FECHA]);
			$sentencia->bindParam(2, $infoSimulacro[self::RESPONSABLE]);
			$sentencia->bindParam(3, $infoSimulacro[self::GRUPO]);
			$sentencia->bindParam(4, $infoSimulacro[self::ESTADO]);

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

			$sentencia = $conexion->prepare("SELECT  ".self::ID.",  DATE_FORMAT(".self::FECHA.",'%d/%m/%Y') as fecha ,".self::RESPONSABLE.","
			.self::GRUPO.", ".self::ESTADO." FROM ".self::TABLA." 
			 ");
		
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

	public static function getSimulacroDetalles($id,$dato){
        try{
            $conexion = Conexion::getInstancia()->getConexion();

			$sentencia = $conexion->prepare("call spVerDetalleSimulacro('$id','%$dato%');");
		
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
			throw new ExceptionApi(PDO_ERROR, "error,, en conexion PDO".$e->getMessage());
		}
	}


	public static function getRespuestaEstudiante($id_simulacro,$id_estudiante){
        try{
            $conexion = Conexion::getInstancia()->getConexion();

			$sentencia = $conexion->prepare("SELECT id_respuesta FROM simulacro_respuestas natural join respuestas 
			natural join preguntas where id_simulacro= ? and id_estudiante = ? order by desc_pregunta;");
			$sentencia->bindParam(1, $id_simulacro);
            $sentencia->bindParam(2, $id_estudiante);
			
		

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
			throw new ExceptionApi(PDO_ERROR, "error,, en conexion PDO".$e->getMessage());
		}
	}



	public static function getSimulacrosActivos($id){
        try{
            $conexion = Conexion::getInstancia()->getConexion();
			$sentencia = $conexion->prepare("CALL `spSimulacrosActivos`(?);" );
			$sentencia->bindParam(1, $id);
		
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


	public static function getBuscarSimulacros($datos){
        try{
            $conexion = Conexion::getInstancia()->getConexion();
			$sentencia = $conexion->prepare("CALL `spBuscarSimulacros`('"
			.$datos['data']."%','".$datos['estado']."%','". $datos['fecha']."%','%".$datos['idExamen']."%');" );

		
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
			throw new ExceptionApi(PDO_ERROR, "error en conexion PDO".$e->getMessage());
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

			$query = "call spEliminarSimulacro(?);";	

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