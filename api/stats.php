<?php
   include "db_connect.php";

   $conceptsQuery="SELECT COUNT(DISTINCT start)AS startCount, COUNT(DISTINCT end) AS endCount FROM facts";
   $conceptsResult = $conn->query($conceptsQuery);
   $conceptRow=$conceptsResult->fetch_assoc();
   $totalConcepts=$conceptRow['startCount']+$conceptRow['endCount'];


   $relationQuery="SELECT COUNT(DISTINCT relation) AS relationCount FROM facts";
   $relationResult = $conn->query($relationQuery);
   $relationRow=$relationResult->fetch_assoc();
   $totalRelations=$relationRow['relationCount'];


   $faitsQuery="SELECT COUNT(*) AS factCount FROM facts";
   $faitsResult = $conn->query($faitsQuery);
   $faitsRow=$faitsResult->fetch_assoc();
   $totalFacts=$faitsRow['factCount'];

   $usersQuery="SELECT COUNT(*) AS userCount FROM users";
   $usersResult = $conn->query($usersQuery);
   $usersRow=$usersResult->fetch_assoc();
   $totalUsers=$usersRow['userCount'];
 
   $stats = array(
      'totalConcepts' => $totalConcepts,
      'totalRelations' => $totalRelations,
      'totalFacts' => $totalFacts,
      'totalUsers' => $totalUsers
  );
  
  header('Content-Type: application/json');
  echo json_encode($stats);
   ?>