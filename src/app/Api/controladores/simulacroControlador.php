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
			return Simulacro::eliminarSimulacro($peticion[1]);
		}
	
	}
	
	public static function post($peticion){
		// obtenemos el fichero que viene con la peticion POST
		$id=$_POST["txtIdSimulacro"];
		$fecha=$_POST["txtFecha"];
		$respon=$_POST["txtResponsable"];
		$grupo=$_POST["txtGrupo"];

		$datosArray = [
			"id_simulacro" => $id,
			"fecha" => $fecha,
			"responsable" => $respon,
			"grupo" => $grupo
		];

		if(!empty($peticion[0])){
			switch ($peticion[0]) {
			
				case 'registro':
					return Simulacro::insertarSimulacro($datosArray);
					break;
				case 'editar':
				return Simulacro::actualizarSimulacro($datosArray);
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