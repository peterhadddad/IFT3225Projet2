<?php
    
    $name="localhost";
    $uname="root";

    $password="";
    $db_name="conceptnet_db";

    $conn = mysqli_connect($name,$uname,$password,$db_name);

    if($conn){
        $db = mysqli_select_db($conn,$db_name);
        if(!$db){
            echo "Database not found";
        }
    }
    else{
        echo "Connection failed";
    }