<?php
session_start();
include_once('connexion.php');
header('Content-Type: text/plain; charset=utf-8');

try {
    $seqid = $_SESSION["story"]["seqid"];
    $seqserial = $_SESSION["seqtext"]["seqserial"];

    $query = "
        SELECT seqtext.*, 
               image.name AS image_name,
               character.name AS character_name,
               character.color AS character_color
        FROM seqtext
        LEFT JOIN image ON seqtext.elid = image.iid
        LEFT JOIN character ON seqtext.elid = character.cid
        WHERE seqtext.seqid = :seqid
        AND seqtext.seqserial = :seqserial
    ";

    $stmt = $pdo->prepare($query);
    $stmt->bindValue(':seqid', $seqid, PDO::PARAM_INT);
    $stmt->bindValue(':seqserial', $seqserial, PDO::PARAM_INT);
    $stmt->execute();

    $row = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($row === false) {
        $_SESSION["story"]["seqid"]++;
        $_SESSION["seqtext"]["seqserial"] = 1;
        echo "|__END__|";
        exit;
    }

    $_SESSION["seqtext"]["seqserial"]++;

    // Inclure le nom de l'image et les infos du personnage (s'ils existent)
    echo implode('|', [
        $row['seqid'],
        $row['seqserial'],
        $row['type'],
        $row['data'],
        $row['elid'],
        $row['pos'],
        $row['z'],
        $row['image_name'] ?? '',
        $row['character_name'] ?? '',
        $row['character_color'] ?? ''
    ]);

    exit;

} catch (PDOException $e) {
    error_log('getLine.php -> PDOException: ' . $e->getMessage());
    http_response_code(500);
    echo "|__ERROR__|";
    exit;
}
