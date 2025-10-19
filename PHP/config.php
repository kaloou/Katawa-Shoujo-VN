<?php
$serveur_bd = 'student.endor.be';
$nom_bd = 'js2507';
$utilisateur_bd = 'js2507';
$passe_bd = 'daigai28froicla';
//---
$options =  [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,];

$source_bd = "pgsql:host={$serveur_bd};port=5433;dbname={$nom_bd};sslmode=require";