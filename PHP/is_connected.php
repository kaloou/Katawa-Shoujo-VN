<?php
    session_start();
    include_once('connexion.php');
    header('Content-Type: text/plain; charset=utf-8');

    $reponse["exist"] = isset($_SESSION["user_id"]);
    echo json_encode($reponse);
?>