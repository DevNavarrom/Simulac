<?php
require_once 'modelos/usuarios.php';
require_once 'utils/constantes.php';
require_once 'utils/ExceptionApi.php';

class UsuariosControlador{

    public static function get($peticion){
		if(count($peticion) == 0){
			return Usuarios::getUsuarios();

		}else if (count($peticion) ==1){
			return Usuarios::buscarPorId($peticion[0]);					

		}else
		{
			return Usuarios::eliminarUsuario($peticion[1]);
		}
	
	}
	
	public static function post($peticion){
        // obtenemos el fichero que viene con la peticion POST
      
		if(!empty($peticion[0])){
			switch ($peticion[0]) {
					case 'registro':
					$id=$_POST["txtIdUsuario"];
					$nombres=$_POST["txtNombres"];
					$rol=$_POST["txtSelRol"];
					$user=$_POST["txtUser"];
					$pass=$_POST["txtPass"];
			
					$datosArray = [
						"id_usuario" => $id,
						"nombres" => $nombres,
						"rol" => $rol,
						"user" => $user,	
						"password" => $pass	
					];
					return Usuarios::insertarUsuario($datosArray);
					break;
				case 'editar':
				$id=$_POST["txtIdUsuario"];
				$nombres=$_POST["txtNombres"];
				$rol=$_POST["txtSelRol"];
				$user=$_POST["txtUser"];
				$pass=$_POST["txtPass"];
		
				$datosArray = [
					"id_usuario" => $id,
					"nombres" => $nombres,
					"rol" => $rol,
					"user" => $user,	
					"password" => $pass	
				];
				return Usuarios::actualizarUsuario($datosArray);
				break;
				case 'login':
		
				$user=$_POST["txtUser"];
				$pass=$_POST["txtPass"];
		
			
				return Usuarios::login($user,$pass);
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