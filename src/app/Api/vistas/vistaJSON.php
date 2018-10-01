<?php

class VistaJSON{
    public $estado;

	public function __construct($estado = 200){
		$this->estado = $estado;
	}

	/**
	* Imprime el cuerpo de la respuesta y setea el codigo de respuesta
	* @param $cuerpo es el cuerpo de la respuesta a imprimir, un array 
	*/
	public function imprimir($cuerpo){
		if($this->estado){
			http_response_code($this->estado);
		}

		header('Content-Type: application/json; charset=utf8');
		echo json_encode($cuerpo, JSON_PRETTY_PRINT);
    exit;
	}
}
?>