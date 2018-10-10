<?php

require_once 'utils/constantes.php';
require_once 'utils/ExceptionApi.php';
require_once 'vistas/vistaJSON.php';
require_once 'controladores/estudiantesControlador.php';
require_once 'controladores/areasControlador.php';
require_once 'controladores/usuariosControlador.php';
require_once 'controladores/temasControlador.php';
require_once 'controladores/simulacroControlador.php';
require_once 'controladores/preguntasControlador.php';

$vista = new vistaJSON();

// definimos una funcion para manejar las excepciones
set_exception_handler(function($exception) use ($vista){
	$cuerpo = array(
		"estado" => $exception->estado,
		"mensaje" => $exception->getMessage()
	);
	if( $exception->estado==23000){// si el error es una clave duplicada retorna el mensaje
		
		$vista->imprimir($cuerpo);
	}else{

	if($exception->getCode()){
		// vistaJson pondrá el codigo en la cabecera
		$vista->estado = $exception->getCode();
	}else{// si el codigo es cero
		$vista->estado = 500;// 500 indica error del servidor
	}

	$vista->imprimir($cuerpo);// imprimimos el JSON y el codigo en la cabecera
}
});

// convertimos en array lo que redireccionamos con el archivo .htaccess
$peticionArray = explode("/", $_GET["RUTA_INFORMACION"]);

$recursosDisponibles  = array('estudiantes','areas','usuarios','temas','simulacros','preguntas');

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
			case 'areas':
			  	$vista->imprimir(AreasControlador::get($peticionArray));
				break;
			case 'temas':
			  $vista->imprimir(TemasControlador::get($peticionArray));
				break;
			case 'preguntas':
				$vista->imprimir(PreguntasControlador::get($peticionArray));
		  		break;
			case 'simulacros':
<<<<<<< HEAD
			$vista->imprimir(SimulacroControlador::get($peticionArray));
		  break;
		  case 'preguntas':
		  $vista->imprimir(PreguntasControlador::get($peticionArray));
		break;
=======
				$vista->imprimir(SimulacroControlador::get($peticionArray));
		  		break;
            
>>>>>>> 8bd224590609203d82bf1039999db96097d2b2ce
            default:
                throw new ExceptionApi(100, "ERROR URL");
		}
		break;
	case 'post':
        switch ($recurso) {
			case 'estudiantes':
				$vista->imprimir(EstudiantesControlador::post($peticionArray));
				break;
				case 'areas':
				$vista->imprimir(AreasControlador::post($peticionArray));
                break;
				case 'usuarios':
				$vista->imprimir(UsuariosControlador::post($peticionArray));
				break;
				case 'temas':
				$vista->imprimir(TemasControlador::post($peticionArray));
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
