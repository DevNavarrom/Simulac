<?php

class UploadImage
{
    public static function postImagen(){
        if(isset($_FILES['imagenPropia'])){
    
            $imagen_tipo = $_FILES['imagenPropia']['type'];
            $imagen_nombre = $_FILES['imagenPropia']['name'];
            $directorio_final = "imagenes/".$imagen_nombre; 
            
            if($imagen_tipo == "image/jpeg" || $imagen_tipo == "image/jpg" || $imagen_tipo == "image/png"){
            
                if(move_uploaded_file($_FILES['imagenPropia']['tmp_name'], $directorio_final)){
            
                    $data = array(
                        'status' => 'success',
                        'code' => 200,
                        'mensaje' => 'Imagen cargada satisfactoriamente.'
                    );
                    $format = (object) $data;
                    $json = json_encode($format); 
                    echo $json; 
            
                }else{
            
                    $data = array(
                        'status' => 'error',
                        'code' => 400,
                        'mensaje' => 'Error al mover imagen al servidor'
                    );
                    $format = (object) $data;
                    $json = json_encode($format); 
                    echo $json; 
            
                }
            
            }else{
            
                $data = array(
                    'status' => 'error',
                    'code' => 500,
                    'mensaje' => 'Formato no soportado'
                );
                $format = (object) $data;
                $json = json_encode($format); 
                echo $json; 
            
            }
            
            }else{
            
            $data = array(
                'status' => 'error',
                'code' => 400,
                'mensaje' => 'No se recibio ninguna imagen'
            );
            $format = (object) $data;
            $json = json_encode($format); 
            echo $json; 
            
            }  
    }
}




?>