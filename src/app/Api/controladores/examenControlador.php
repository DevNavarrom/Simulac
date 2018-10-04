<?php
require_once 'modelos/examen.php';
require_once 'utils/constantes.php';
require_once 'utils/ExceptionApi.php';

class ExamenControlador{

    public static function get($peticion){
		if(count($peticion) == 0){
			return Examen::getExamen();

		}else if (count($peticion) ==1){
			return Examen::buscarPorId($peticion[0]);					

		}else
		{
			return Examen::eliminarExamen($peticion[1]);
		}
	
	}
	
	public static function post($peticion){
        // obtenemos el fichero que viene con la peticion POST
        $id=$_POST["txtIdExamen"];
		$id_tema=$_POST["txtIdTema"];
        $desc=$_POST["txtDescripcion"];
        $estado=$_POST["txtEstado"];

		$datosArray = [
            "id_examen" => $id,
			"id_tema" => $id_tema,
            "desc_examen" => $desc,
            "estado" => $estado	
		];

		if(!empty($peticion[0])){
			switch ($peticion[0]) {
					case 'registro':
					return Examen::insertarExamen($datosArray);
					break;
				case 'editar':
				return Examen::actualizarExamen($datosArray);
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