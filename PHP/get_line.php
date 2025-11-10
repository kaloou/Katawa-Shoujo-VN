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
               image.w AS image_width,
               image.h AS image_height,
               character.name AS character_name,
               character.color AS character_color,
               character.code as character_code
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
        $_SESSION["story"]["seqid"]++;// later on update seqid with next parameter of story table
        $_SESSION["seqtext"]["seqserial"] = 1;
        echo json_encode(['type' => 'end']);
        exit;
    }

    $_SESSION["seqtext"]["seqserial"]++;

    //BASE RESPONSE
    $response = [
        'type' => (int)$row['type'],
        'data' => $row['data'],
        'elid' => (int)$row['elid'],
        'pos' => (int)$row['pos'],
        'z' => (int)$row['z']
    ];

    // ajouter les propriétés spécifiques selon le type
    switch ($row['type']) {
        case 1: // texte
            $response['text'] = $row['data'];
            $response['character_name'] = $row['character_name'] ?? '';
            $response['character_color'] = $row['character_color'] ?? '';
            $response['character_code'] = $row['character_code'] ?? '';
            break;
            
        case 2: // BG
            $response['image_name'] = $row['image_name'] ?? '';
            $response['width'] = (int)($row['image_width'] ?? 0);
            $response['height'] = (int)($row['image_height'] ?? 0);
            break;
            
        case 3: // Sprites
        case 4: // Remove Sprites
            $response['image_tag'] = $row['data'];
            $response['image_name'] = $row['image_name'] ?? '';
            $response['width'] = (int)($row['image_width'] ?? 0);
            $response['height'] = (int)($row['image_height'] ?? 0);
            break;
            
        case 5: // DIV au milieu de l'écran
            $response['text'] = $row['data'];
            break;
            
        case 6: // HTML à interpréter
            $response['html'] = $row['data'];
            break;
    }

    echo json_encode($response);

    exit;

} catch (PDOException $e) {
    error_log('getLine.php -> PDOException: ' . $e->getMessage());
    http_response_code(500);
    echo json_encode(['type' => 'error', 'message' => $e->getMessage()]);
    exit;
}
