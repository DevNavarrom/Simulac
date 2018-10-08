<?php

require_once 'modelos/estudiantes.php';
require_once 'utils/constantes.php';
require_once 'utils/ExceptionApi.php';

class EstudiantesControlador{

    public static function get($peticion){
		if(count($peticion) == 0){
			return Estudiantes::getEstudiantes();

		}else if(count($peticion) == 1){
			
			return Estudiantes::buscarEstudiante($peticion[0]);
			

		}else
	{
		if($peticion[0]=='buscar'){
			return Estudiantes::buscarPorId($peticion[1]);
		}else{
		return Estudiantes::eliminarEstudiante($peticion[1]);
		}
	}
	}
	
	public static function post($peticion){
		
		$data = json_decode(file_get_contents('php://input'), true);
	

		if(!empty($peticion[0])){
			switch ($peticion[0]) {
				
				case 'registro':
					return Estudiantes::insertarEstudiante($data);
					break;
				case 'editar':
					return Estudiantes::actualizarEstudiante($data);
					break;
				default:
					throw new ExceptionApi(PARAMETROS_INCORRECTOS, "parametros incorrectos");
			}
		}else{
			throw new ExceptionApi(PARAMETROS_INCORRECTOS, "parametros incorrectos");
		}
	}
    
}
?>