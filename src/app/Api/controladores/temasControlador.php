<?php
require_once 'modelos/temas.php';
require_once 'utils/constantes.php';
require_once 'utils/ExceptionApi.php';

class TemasControlador{

    public static function get($peticion){
		if(count($peticion) == 0){
			return Temas::getTemas();

		}else if (count($peticion) ==1){
			return Temas::buscarTema($peticion[0]);					

		}	
	}
	
	public static function post($peticion){
		$data = json_decode(file_get_contents('php://input'), true);


		if(!empty($peticion[0])){
			switch ($peticion[0]) {
					case 'registro':
					return Temas::insertarTema($data);
					break;
				case 'editar':
				return Temas::actualizarTema($data);
				break;
				case 'eliminar':
				return Temas::eliminarTema($data);
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