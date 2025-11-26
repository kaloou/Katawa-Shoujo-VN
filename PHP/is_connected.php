<?php
    session_start();
    include_once('connexion.php');
    header('Content-Type: text/plain; charset=utf-8');

    echo json_encode(isset($_SESSION["user_id"]));
?>