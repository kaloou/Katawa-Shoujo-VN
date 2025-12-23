<?php
$serveur_bd = 'student.endor.be';
$nom_bd = 'js2507';
$utilisateur_bd = 'js2507';
$passe_bd = 'daigai28froicla';
//---
$options =  [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,];

$source_bd = "pgsql:host={$serveur_bd};port=5433;dbname={$nom_bd};sslmode=require";


$DEBUG = false;
$default_save = "1|1|1|1|bg_op_snowywoods.png||0|0||0|Lullaby_of_Open_Eyes.mp3";
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