<?php
/**
	* Esta clase es creada para tener exceptiones personalizadas a nuestro gusto,
	* con el codigo y mensaje que deseemos
	*/
class ExceptionApi extends Exception {
	public $estado;

	/**
	* Constructor de la exception que nos mostrará el error
	* @param $estado es el codigo que representará el error
	* @param $mensaje es una descripcion textual del error
	* @param $codigo es el codigo HTTP que se mostrará en la cabecera 
	*/
	public function __construct($estado, $mensaje, $codigo = 400){
		$this->estado = $estado;
		$this->message = $mensaje;// mensaje de la clase padre Exception
		$this->code = $codigo;//     codigo  ||    ||     ||     ||
	}
}

?>
