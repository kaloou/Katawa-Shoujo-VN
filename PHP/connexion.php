<?php
include('config.php');
try
{
    $pdo = new PDO($source_bd, $utilisateur_bd, $passe_bd, $options);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
}
catch (PDOException $e)
{
    echo "Erreur de connexion : " . $e->getMessage();
    exit();
}