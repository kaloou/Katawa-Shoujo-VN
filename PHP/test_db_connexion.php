<?php
include_once("connexion.php");

// Test connexion avec requête simple
$requete = $pdo->query("SELECT NOW()");
$resultat = $requete->fetch(PDO::FETCH_ASSOC);
echo "Connexion réussie. Heure du serveur PostgreSQL : " . $resultat['now'] . "<br>";


try {
    $_SESSION["story"]["seqid"] = 2;
    $seqid = $_SESSION["story"]["seqid"];
    $seqid_plus_one = $_SESSION["story"]["seqid"] + 1;

    $query = "
         SELECT image.name AS image_name
        FROM image
        LEFT JOIN seqtext ON seqtext.elid = image.iid AND (seqtext.type = 2 OR seqtext.type = 3)
        WHERE seqtext.seqid = :seqid OR (seqtext.seqid = :seqid_plus_one  AND seqtext.seqserial = 1)
    ";

    // Affichage de la requête avec la valeur de :seqid
    echo "Requête exécutée : " . str_replace(':seqid', $seqid, $query) . "<br>";

    $stmt = $pdo->prepare($query);
    $stmt->bindValue(':seqid', $seqid, PDO::PARAM_INT);
    $stmt->bindValue(':seqid_plus_one', $seqid_plus_one, PDO::PARAM_INT);
    $stmt->execute();

    $images = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Affichage des résultats des images
    echo "Résultats des images :<br>";
    $i = 1;
    foreach ($images as $image) {
        echo "$i : Image name: " . $image['image_name'] . "<br>";
        $i++;
    }

} catch (PDOException $e) {
    error_log('load.php -> PDOException: ' . $e->getMessage());
    echo "Erreur de base de données.<br>";
}

// Afficher les 100 premières lignes de la table 'images'
$requete_images = $pdo->query("SELECT * FROM image");
$resultat_images = $requete_images->fetchAll(PDO::FETCH_ASSOC);

echo "<br>Table 'image' :<br>";
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