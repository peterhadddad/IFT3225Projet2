<?php
session_start();

include "db_connect.php";
$response = ['success' => false, 'error' => ''];
if(isset($_POST['username']) && isset($_POST['password'])){
        function validate($data){
            $data = trim($data);
            $data = stripslashes($data);
            $data = htmlspecialchars($data);
            return $data;
        }



 $username = validate($_POST['username']);
 $pass = validate($_POST['password']);

 if(empty($username)) {
    $response['error'] = 'User Name is required';
} else if(empty($pass)) {
    $response['error'] = 'Password is required';
} else {
    // Prepared statement to prevent SQL injection
    $stmt = $conn->prepare("SELECT * FROM users WHERE username=? AND password=?");
    $stmt->bind_param("ss", $username, $pass);
    $stmt->execute();
    $result = $stmt->get_result();

    if($result->num_rows === 1){
        $row = $result->fetch_assoc();
        if($row['username'] === $username && $row['password'] === $pass){
            $_SESSION['username'] = $row['username'];
            $_SESSION['id'] = $row['id'];
            $response['success'] = true;
            $response['redirect'] = 'home.php';
        } else {
            $response['error'] = 'Incorrect User name or password';
        }
    } else {
        $response['error'] = 'Incorrect User name or password';
    }
}
}


echo json_encode($response);
?>