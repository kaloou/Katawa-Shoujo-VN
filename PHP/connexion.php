<?php
$serveur_bd = 'student.endor.be';
$nom_bd = 'js2507';
$utilisateur_bd = 'js2507';
$passe_bd = 'daigai28froicla';

$source_bd = "pgsql:host=$serveur_bd;port=5433;dbname=$nom_bd ;sslmode=require";
$options =  [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,];

try {
    $connexion = new PDO($source_bd, $utilisateur_bd, $passe_bd, $options);

    // Test connexion
    $requete = $connexion->query("SELECT NOW()");
    $resultat = $requete->fetch(PDO::FETCH_ASSOC);

    echo "Connexion réussie. Heure du serveur PostgreSQL : " . $resultat['now'];

} catch (PDOException $e) {
    echo "Erreur de connexion : " . $e->getMessage();
}