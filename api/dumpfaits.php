<?php
session_start();

include "db_connect.php";


$page = isset($_GET['page']) ? (int)$_GET['page'] : 1;
$limit = 10;
$offset = ($page - 1) * $limit;

$query = "SELECT * FROM facts LIMIT $limit OFFSET $offset";
$result = $conn->query($query);

$faits = [];
while ($row = $result->fetch_assoc()) {
    $faits[] = $row;
}

// Calculer le nombre total de pages
$totalQuery = "SELECT COUNT(*) AS total FROM facts";
$totalResult = $conn->query($totalQuery);
$totalRow = $totalResult->fetch_assoc();
$totalPages = ceil($totalRow['total'] / $limit);

header('Content-Type: application/json');
echo json_encode([
    'faits' => $faits,
    'page' => $page,
    'totalPages' => $totalPages
]);
?>
