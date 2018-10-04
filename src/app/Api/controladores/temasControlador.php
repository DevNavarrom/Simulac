<?php
require_once 'modelos/temas.php';
require_once 'utils/constantes.php';
require_once 'utils/ExceptionApi.php';

class TemasControlador{

    public static function get($peticion){
		if(count($peticion) == 0){
			return Temas::getTemas();

		}else if (count($peticion) ==1){
			return Temas::buscarPorId($peticion[0]);					

		}else
		{
			return Temas::eliminarTema($peticion[1]);
		}
	
	}
	
	public static function post($peticion){
        // obtenemos el fichero que viene con la peticion POST
        $id=$_POST["txtIdTema"];
		$idArea=$_POST["txtIdArea"];
		$desc=$_POST["txtDescTema"];

		$datosArray = [
            "id_tema" => $id,
			"id_area" => $idArea,
			"desc_tema" => $desc	
		];

		if(!empty($peticion[0])){
			switch ($peticion[0]) {
					case 'registro':
					return Temas::insertarTema($datosArray);
					break;
				case 'editar':
				return Temas::actualizarTema($datosArray);
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