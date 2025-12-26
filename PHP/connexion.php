<?php
$serveur_bd = 'student.endor.be';
$nom_bd = 'js2507';
$utilisateur_bd = 'js2507';
$passe_bd = 'daigai28froicla';
//---
$options =  [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,];

$source_bd = "pgsql:host={$serveur_bd};port=5433;dbname={$nom_bd};sslmode=require";


$DEBUG = false;
$default_save_array = array(
    'rep' => array(
        'seqid' => 0,
        'seqserial' => 9999,
        'type' => 1,
        'elid' => 1
    ),
    'bg' => 'bg_op_snowywoods.png',
    'sprite' => array(
        'image_name' => '',
        'width' => 0,
        'height' => 0,
        'image_tag' => '',
        'pos' => 0
    ),
    'music' => 'Lullaby_of_Open_Eyes.mp3',
    'interpreter' => array(
        'ip' => 1,
        'last_qcm_choice' => 0,
        'scenes_viewed' => array(),
        'variables' => array()
    )
);
$default_save = serialize($default_save_array);
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