<?php
$serveur_bd = 'student.endor.be';
$nom_bd = 'js2507';
$utilisateur_bd = 'js2507';
$passe_bd = 'daigai28froicla';
//---
$options =  [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,];

$source_bd = "pgsql:host={$serveur_bd};port=5433;dbname={$nom_bd};sslmode=require";


$DEBUG = false;
$default_save = 'a:4:{s:3:"rep";a:4:{s:5:"seqid";i:1;s:9:"seqserial";i:1;s:4:"type";i:1;s:4:"elid";i:1;}s:2:"bg";s:20:"bg_op_snowywoods.png";s:6:"sprite";a:5:{s:10:"image_name";s:0:"";s:5:"width";i:0;s:6:"height";i:0;s:9:"image_tag";s:0:"";s:3:"pos";i:0;}s:5:"music";s:24:"Lullaby_of_Open_Eyes.mp3";}';
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