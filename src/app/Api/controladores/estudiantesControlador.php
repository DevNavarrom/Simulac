<?php
/*header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");*/

require_once 'modelos/estudiantes.php';
require_once 'utils/constantes.php';
require_once 'utils/ExceptionApi.php';

class EstudiantesControlador{

    public static function get($peticion){
		if(count($peticion) == 0){
			return Estudiantes::getEstudiantes();

		}else if(count($peticion) == 1){
			return Estudiantes::buscarPorId($peticion[0]);

		}/*else{
			switch ($peticion[1]) {
				case 'grupos':
					return AlumnosModelo::getGrupos($peticion[0]);

					break;
				default:
					throw new ExceptionApi(PARAMETROS_INCORRECTOS, "parametros incorrectos");
			}
		}*/
	}
	
	public static function post($peticion){
		// obtenemos el fichero que viene con la peticion POST

		$idest=$_POST['idest'];
		$nombre=$_POST['nombre'];
		$grupo=$_POST['grupo'];
		$sexo=$_POST['sexo'];

		$datosArray = [
			"idest" => $idest,
			"nombre" => $nombre,
			"grupo" => $grupo,
			"sexo" => $sexo
		];

		if(!empty($peticion[0])){
			switch ($peticion[0]) {
				case 'login':
					//Usuarios::login($datos);
					break;
				case 'registro':
					Estudiantes::insertarEstudiante($datosArray);
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