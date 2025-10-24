<?php
include_once("connexion.php");
// Test connexion avec requete simple
$requete = $pdo->query("SELECT NOW()");
$resultat = $requete->fetch(PDO::FETCH_ASSOC);
echo "\nConnexion réussie. Heure du serveur PostgreSQL : " . $resultat['now'];