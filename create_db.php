<?php

$host = "localhost";
$user = "root";  // Set the MySQL user
$password = "";  // Set the MySQL password, which can be empty for local connections

$name = "conceptnet_db";  // Set the name of the database
$table = "facts";  // Set the name of the table

// Define the facts to be inserted into the table
$fact = [
    ["/c/fr/cité universitaire", "RelatedTo", "/c/fr/étudiant"],
    ["/c/fr/Un boulanger", "UsedFor", "/c/fr/faire le pain"],
    // Add more facts based on the collected data
];

// Connect to MySQL
$conn = new mysqli($host, $user, $password, $name);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: ". $conn->connect_error);
}

// Create the table if it does not exist
$sql = "CREATE TABLE IF NOT EXISTS $table (
    id INT AUTO_INCREMENT PRIMARY KEY,
    start VARCHAR(255),
    relation VARCHAR(255),
    end VARCHAR(255)
)";

if ($conn->query($sql)!== TRUE) {
    echo "Error creating table: ". $conn->error;
}

// Insert the facts into the table
$sql = "INSERT INTO $table (start, relation, end) VALUES (?,?,?)";

$stmt = $conn->prepare($sql);
$stmt->bind_param("sss", $start, $relation, $end);

foreach ($fact as $item) {
    $start = $item[0];
    $relation = $item[1];
    $end = $item[2];
    $stmt->execute();
}

$stmt->close();

// Close the connection
$conn->close();

echo "Database and table initialized, and facts inserted successfully.";

?>