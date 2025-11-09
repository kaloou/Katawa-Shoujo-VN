<?php
include_once("connexion.php");

// Test connexion avec requête simple
$requete = $pdo->query("SELECT NOW()");
$resultat = $requete->fetch(PDO::FETCH_ASSOC);
echo "Connexion réussie. Heure du serveur PostgreSQL : " . $resultat['now'] . "<br>";

// Afficher les 100 premières lignes de la table 'images'
$requete_images = $pdo->query("SELECT * FROM image");
$resultat_images = $requete_images->fetchAll(PDO::FETCH_ASSOC);

echo "<br>Table image :<br>";
foreach ($resultat_images as $ligne) {
    echo implode(" | ", $ligne) . "<br>";
}

// Afficher les 100 premières lignes de la table 'seqtext'
$requete_seqtext = $pdo->query("SELECT * FROM seqtext");
$resultat_seqtext = $requete_seqtext->fetchAll(PDO::FETCH_ASSOC);

echo "<br>1000 premières lignes de la table 'seqtext' :<br>";
foreach ($resultat_seqtext as $ligne) {
    echo implode(" | ", $ligne) . "<br>";
}