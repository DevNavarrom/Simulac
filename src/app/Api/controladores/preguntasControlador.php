<?php
require_once 'modelos/preguntas.php';
require_once 'utils/constantes.php';
require_once 'utils/ExceptionApi.php';

class 	PreguntasControlador{

    public static function get($peticion){
		if(count($peticion) == 0){
			return Preguntas::getPreguntas();

		}else if (count($peticion) ==1){
			return Preguntas::buscarPorId($peticion[0]);					

		}else
		{
			if($peticion[0]=='examen')
			{
				return Preguntas::getPreguntasExamen($peticion[1]);
			}else if($peticion[0]=='tema'){
				return Preguntas::buscarPorIdTema($peticion[1]);
				echo $peticion[1];
			}else{
				return Preguntas::eliminarPregunta($peticion[1]);
			}
		}
	
	}
	
	public static function post($peticion){
        // obtenemos el fichero que viene con la peticion POST
        $id=$_POST["txtIdPregunta"];
		$id_tema=$_POST["txtIdTema"];
        $desc=$_POST["txtDescripcion"];
        //$imagen=$_POST["fileImagen"];

		//verifica si se ha subido una imagen
	
		
		$file_path = "imagenes/";

		// pedimos el nombre del archivo subido y lo concatenamos con la ruta
		$file_path = $file_path . basename($_FILES['imagen']['name']);
		
		// si fue exitosa la movida de la carpeta temporar a nuestro folder archivos
		if( move_uploaded_file($_FILES['imagen']['tmp_name'], $file_path) ){// movemos el archivo a la carpeta "archivos"
			$cuerpo = [
						"estado" => 100,
						"mensaje" => utf8_encode("guardado exitoso")
					  ];
		}else{// si ocurrió un error
			$cuerpo = [
						"estado" => 200,
						"mensaje" => utf8_encode("guardado fallido")
					  ];
		}
		
		header('Content-Type: application/json; charset=utf8');// indicamos que vamos a escribir JSON
		echo json_encode($cuerpo, JSON_PRETTY_PRINT);// imprimimos el JSON	

	
		$datosArray = [
            "id_pregunta" => $id,
			"id_tema" => $id_tema,
            "desc_pregunta" => $desc,
            "imagen" => $_FILES['imagen']['name']
		];

		if(!empty($peticion[0])){
			switch ($peticion[0]) {
					case 'registro':
					return Preguntas::insertarPregunta($datosArray);
					break;
				case 'editar':
				return Preguntas::actualizarPregunta($datosArray);
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