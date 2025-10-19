<?php
/** @var $utilisateur_bd */
/** @var $passe_bd */
/** @var $source_bd */
/** @var $options */
include('config.php');
try
{
    $connexion = new PDO($source_bd, $utilisateur_bd, $passe_bd, $options);
    // Test connexion
    $requete = $connexion->query("SELECT NOW()");
    $resultat = $requete->fetch(PDO::FETCH_ASSOC);

    echo "Connexion réussie. Heure du serveur PostgreSQL : " . $resultat['now'];
}
catch (PDOException $e)
{
    echo "Erreur de connexion : " . $e->getMessage();
}