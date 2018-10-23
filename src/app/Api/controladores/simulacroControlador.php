<?php
require_once 'modelos/simulacro.php';
require_once 'utils/constantes.php';
require_once 'utils/ExceptionApi.php';

class SimulacroControlador{

    public static function get($peticion){
		if(count($peticion) == 0){
			return Simulacro::getSimulacros();

		}else if (count($peticion) ==1){
			return Simulacro::buscarSimulacros($peticion[0]);					

		}else
		{
			
			if($peticion[0] == 'activos')
			{
				return Simulacro::getSimulacrosActivos($peticion[1]);
			}else if($peticion[0] == 'eliminar'){
			return Simulacro::eliminarSimulacro($peticion[1]);
			}
			else if($peticion[0] == 'detalles'){
				return Simulacro::getSimulacroDetalles($peticion[1],$peticion[2]);
				}
				else if($peticion[0] == 'respuestas'){
					return Simulacro::getRespuestaEstudiante($peticion[1],$peticion[2]);
					}
		}
	
	}
	
	public static function post($peticion){
	
		$data = json_decode(file_get_contents('php://input'), true);

		

		if(!empty($peticion[0])){
			switch ($peticion[0]) {
			
				case 'registro':
				return Simulacro::insertarSimulacro($data);
				break;
				case 'editar':
				return Simulacro::actualizarSimulacro($data);
				break;
				case 'respuestas':
				return Simulacro::insertarRespuestasSimulacro($data);				
				break;
				case 'buscar':
				return Simulacro::getBuscarSimulacros($data);				
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