<?php
require_once 'utils/constantes.php';

class Conexion {
	private static $pdo;// Conexion
	private static $instancia = null;// unica instancia de esta clase

	// Constantes para crear la conexion con PDO
	const HOST = "localhost";// Nombre del host
	const BASE_DE_DATOS = "simulacro"; // Nombre de la base de modelos
	const USUARIO = "root"; // Nombre del usuario
	const PASS = "admin123"; // Constraseña

	private static $dsn = "mysql:host=localhost;dbname=secudb";
	private static $myuser = "root"; // Nombre del usuario
	private static $mypass = "admin123"; // Constraseña
	private static $opciones = array(
		PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8'
	);

	private final function __construct(){// patron de diseño SINGLETON
		try{
			self::getConexion();// intentamos conectar
		}catch(PDOException $e){
			throw new ExceptionApi(PDO_ERROR, "error en conexion PDO:".$e->getMessage());
		}
	}

	public static function getInstancia(){
		if(self::$instancia == null){
			self::$instancia = new self();// llamamos al constructor
		}

		return self::$instancia;
	}

	public static function getConexion(){
		if(self::$pdo == null){
			// creamos una instancia de conexion con PDO
			/*$pdo = new PDO('mysql:dbname='.self::BASE_DE_DATOS.';host='.self::HOST.';',
			self::USUARIO, self::PASS,
				array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));*/
			
				self::$pdo = new PDO(self::$dsn, self::$myuser, self::$mypass);
			//$pdo = new mysqli(self::HOST,self::USUARIO,self::PASS,self::BASE_DE_DATOS);

			// habilitamos la excepciones
			self::$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
			
		}

		return self::$pdo;// retornamos la conexion
	}

}

?>
