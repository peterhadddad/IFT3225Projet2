<?php
include 'db_connect.php';
$langue=$_GET['langue'];
$concept=$_GET['concept'];
$page=$_GET['page']??1;
$limit=10;
$offset=($page-1)*$limit;

$query="SELECT * FROM concepts WHERE start LIKE'%/$langue/$concept%' LIMIT $limit OFFSET $offset";
$result=$conn->query($query);

$facts=array();

while($row=$result->fetch_assoc()){
    $facts[]=$row;
}

header('Content-Type: application/json');
echo json_encode(['facts'=>$facts,'page'=>$page]);
?>