<?php

/** @var PDO $connexion */
include 'connexion.php';

try
{
    $stmt = $connexion->query("SELECT * FROM image");
    $images = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if (!$images)
    {
        echo "Aucune image trouvée.";
    }
    else
    {
        foreach ($images as $img)
        {
            echo "ID : " . $img['iid'] . " - Nom fichier : " . $img['name'] . "<br>";
        }
    }

}
catch (PDOException $e)
{
    echo "Erreur lors de la récupération des images : " . $e->getMessage();
}
