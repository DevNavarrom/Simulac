<?php
require_once 'modelos/areas.php';
require_once 'utils/constantes.php';
require_once 'utils/ExceptionApi.php';

class AreasControlador{

    public static function get($peticion){
		if(count($peticion) == 0){
			return Areas::getAreas();

		}else if (count($peticion) ==1){
			return Areas::buscarPorId($peticion[0]);					

		}else
		{
			return Areas::eliminarArea($peticion[1]);
		}
	
	}
	
	public static function post($peticion){
		// obtenemos el fichero que viene con la peticion POST
		$id=$_POST["txtIdArea"];
		$desc=$_POST["txtDescArea"];

		$datosArray = [
			"id_area" => $id,
			"desc_area" => $desc	
		];

		if(!empty($peticion[0])){
			switch ($peticion[0]) {
					case 'registro':
					return Areas::insertarArea($datosArray);
					break;
				case 'editar':
				return Areas::actualizarArea($datosArray);
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