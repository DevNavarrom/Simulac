<?php

require_once 'utils/constantes.php';
require_once 'utils/ExceptionApi.php';
require_once 'vistas/vistaJSON.php';
require_once 'controladores/estudiantesControlador.php';

$vista = new vistaJSON();

// definimos una funcion para manejar las excepciones
set_exception_handler(function($exception) use ($vista){
	$cuerpo = array(
		"estado" => $exception->estado,
		"mensaje" => $exception->getMessage()
	);

	if($exception->getCode()){
		// vistaJson pondrá el codigo en la cabecera
		$vista->estado = $exception->getCode();
	}else{// si el codigo es cero
		$vista->estado = 500;// 500 indica error del servidor
	}

	$vista->imprimir($cuerpo);// imprimimos el JSON y el codigo en la cabecera
});

// convertimos en array lo que redireccionamos con el archivo .htaccess
$peticionArray = explode("/", $_GET["RUTA_INFORMACION"]);

$recursosDisponibles  = array('estudiantes','areas');

$recurso = array_shift($peticionArray);

if(!in_array($recurso, $recursosDisponibles)){
	throw new ExceptionApi(RECURSO_NO_ENCONTRADO, "Recurso no disponible");
}

$metodo = strtolower($_SERVER['REQUEST_METHOD']);//: get,post,... (minusculas)

switch ($metodo) {
    case 'get':
        switch ($recurso) {
            case 'estudiantes':
                $vista->imprimir(EstudiantesControlador::get($peticionArray));
                break;
            
            default:
                throw new ExceptionApi(100, "ERROR URL");
		}
		break;
	case 'post':
        switch ($recurso) {
			case 'estudiantes':
				$vista->imprimir(EstudiantesControlador::post($peticionArray));
                break;
            
            default:
                $vista->imprimir($peticionArray);
                break;
        }
		break;
	case 'put':

		break;
	case 'delete':

		break;
	default:
		throw new ExceptionApi(METODO_NO_SOPORTADO, "metodo no soportado");
}

?>
