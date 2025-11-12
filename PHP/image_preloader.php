<?php
session_start();
include_once('connexion.php');
header('Content-Type: application/json; charset=utf-8');

try {
    $seqid = $_SESSION["story"]["seqid"];
    $seqid_plus_one = $seqid + 1;

    $query = "
         SELECT image.name AS image_name
        FROM image
        LEFT JOIN seqtext ON seqtext.elid = image.iid AND (seqtext.type = 2 OR seqtext.type = 3)
        WHERE seqtext.seqid = :seqid OR (seqtext.seqid = :seqid_plus_one  AND seqtext.seqserial = 1)
    ";

    $stmt = $pdo->prepare($query);
    $stmt->bindValue(':seqid', $seqid, PDO::PARAM_INT);
    $stmt->bindValue(':seqid_plus_one', $seqid_plus_one, PDO::PARAM_INT);
    $stmt->execute();

    $images = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode(['images' => $images]);

} catch (PDOException $e) {
    error_log('load.php -> PDOException: ' . $e->getMessage());
    echo json_encode(['error' => 'Database error']);
}
