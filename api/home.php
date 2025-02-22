<?php
 session_start();
if (isset($_SESSION['username']) && isset($_SESSION['id'])){
    ?>
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Jeu</title>
    <link rel="stylesheet" href="style.css">
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/sammy/lib/min/sammy-latest.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/handlebars/dist/handlebars.min.js"></script>
    </head>
    <body> 
    <div id="menu">
        <a href="logout.php">Logout</a>
        <a href="#/jeu1">Jeu1</a>      
        <a href="#/jeu2">Jeu2</a> 
        </div>
    <div id="main"></div>
    
    <script src="app.js"></script>
</body>
</html>
    </html>
    <?php
}
else{
    header("Location: login.php");
    exit();
}