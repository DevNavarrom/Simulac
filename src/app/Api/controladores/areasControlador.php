<?php
require_once 'modelos/areas.php';
require_once 'utils/constantes.php';
require_once 'utils/ExceptionApi.php';

class AreasControlador{

    public static function get($peticion){
		if(count($peticion) == 0){
			return Areas::getAreas();

		}else if (count($peticion) ==1){
			return Areas::buscarArea($peticion[0]);					

		}else
		{
			return Areas::eliminarArea($peticion[1]);
		}
	
	}
	
	public static function post($peticion){
		$data = json_decode(file_get_contents('php://input'), true);

		if(!empty($peticion[0])){
			switch ($peticion[0]) {
					case 'registro':
					return Areas::insertarArea($data);
					break;
				case 'editar':
				return Areas::actualizarArea($data);
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