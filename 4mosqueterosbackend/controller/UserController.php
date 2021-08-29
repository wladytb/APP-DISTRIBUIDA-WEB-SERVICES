<?php

    if (isset($_SERVER['HTTP_ORIGIN'])) {  
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");  
    header('Access-Control-Allow-Credentials: true');  
    header('Access-Control-Max-Age: 86400');   
    }  
  
    if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {  
      
        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))  
            header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");  
      
        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))  
            header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");  
    }
    
    header('Content-Type: application/json');

    require_once('..\config\connection.php');
    require_once('..\models\User.php');
    $user = new User();

    $body = json_decode(file_get_contents("php://input"),true);

    switch($_GET["op"]){
        case "Getuser":
            $data = $user->getUser();
            // para poder visualizar ahora los datos en json se añade en un json_encode
            echo json_encode($data);
        break;
        case "Insertuser":
            $data = $user->insert_user($body["userName"],$body["password"],$body["firstName"],$body["lastName"],$body["email"],$body["photo"],$body["idApis"],$body["api"]);
            echo "Usuario insertado correctamente";
        break;
    }
?>