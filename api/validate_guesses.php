<?php
include 'db_connect.php';  
function getRandomConcept() {
    global $conn;
    $result = mysqli_query($conn, "SELECT start FROM facts ORDER BY RAND() LIMIT 1");
    $row = mysqli_fetch_array($result);
    return $row['start'];
}

function validateGuesses($concept, $guesses) {
    global $conn;
    $validGuesses = [];
    foreach ($guesses as $guess) {
        $query = "SELECT * FROM facts WHERE start = ? AND end = ?";
        $stmt = mysqli_prepare($conn, $query);
        mysqli_stmt_bind_param($stmt, "ss", $concept, $guess);
        mysqli_stmt_execute($stmt);
        $result = mysqli_stmt_get_result($stmt);
        if (mysqli_num_rows($result) > 0) {
            $validGuesses[] = $guess;
        }
        mysqli_stmt_close($stmt);
    }
    return $validGuesses;
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    try{
    $concept = getRandomConcept();
    $guesses = explode(',', $_POST['guesses']);
    $validGuesses = validateGuesses($concept, $guesses);
    
    header('Content-Type: application/json');
echo json_encode([
    'concept' => $concept,
    'validGuesses' => $validGuesses
]);
exit; 
    } catch (Exception $e) {
        echo json_encode(['error' => $e->getMessage()]);
    }
}
?>

