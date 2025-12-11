<?php
session_start();
include_once('connexion.php');
header('Content-Type: text/plain; charset=utf-8');

/*
if ($_SESSION["game_state"]["get_line_loaded"] == false){
    echo json_encode(['type' => 'not_loaded']);
    exit;
}
$_SESSION["game_state"]["get_line_loaded"] = false;*/
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
        // here tester si question (qcm in the next seqid)
        exit;
    }

    $_SESSION["seqtext"]["seqserial"]++;

    //BASE RESPONSE
    $response = [
        'seqid' => $seqid,
        'seqserial' => $seqserial,
        'type' => (int)$row['type'],
        'elid' => (int)$row['elid'],
    ];

    $_SESSION['to_save']['rep'] = $response;

    // ajouter les propriétés spécifiques selon le type
    switch ($row['type']) {
        case 1: // texte
            $response['character_name'] = $row['character_name'] ?? '';
            $response['character_color'] = $row['character_color'] ?? '';
            $response['text'] = $row['data'];
            $response['character_code'] = $row['character_code'] ?? '';

            $_SESSION['to_save']['text']['char_name'] = $response['character_name'];
            $_SESSION['to_save']['text']['char_color'] = $response['character_color'];
            $_SESSION['to_save']['text']['content'] = $response['text'];
            $_SESSION['to_save']['text']['char_code'] = $response['character_code'];
            break;

        case 2: // BG
            $response['image_name'] = $row['image_name'] ?? '';
            $response['image_tag'] = $row['data'];
            $_SESSION['to_save']['bg'] = $response['image_name'];
            break;
            
        case 3: // Sprites
            $response['image_name'] = $row['image_name'] ?? '';
            $response['width'] = (int)($row['image_width'] ?? 0);
            $response['height'] = (int)($row['image_height'] ?? 0);
            $response['image_tag'] = $row['data'];
            $response['pos'] = (int)($row['pos'] ?? 0);

            $_SESSION['to_save']['sprite']['image_name'] = $response['image_name'];
            $_SESSION['to_save']['sprite']['width'] = $response['width'];
            $_SESSION['to_save']['sprite']['height'] = $response['height'];
            $_SESSION['to_save']['sprite']['image_tag'] = $response['image_tag'];
            $_SESSION['to_save']['sprite']['pos'] = $response['pos'];
            break;
        case 4: // Remove Sprites
            $response['image_tag'] = $row['data'];

            $_SESSION['to_save']['sprite']['image_name'] = '';
            $_SESSION['to_save']['sprite']['width'] = 0;
            $_SESSION['to_save']['sprite']['height'] = 0;
            $_SESSION['to_save']['sprite']['image_tag'] = '';
            $_SESSION['to_save']['sprite']['pos'] = 0;
            break;

        case 5: // DIV au milieu de l'écran
            $response['text'] = $row['data'];

            $_SESSION['to_save']['centered_text'] = $response['text'];
            break;
            
        case 6: // HTML à interpréter
            $response['html'] = $row['data'];

            $_SESSION['to_save']['html'] = $response['html'];
            break;

        case 7: // music
            $response['music_name'] = $row['data'];

            $_SESSION['to_save']['music'] = $response['music_name'];
            break;

        case 8: //stop music (css style from db (fade))
            $response['fade'] = $row['data'];
            break;
    }

    echo json_encode($response);
    //$_SESSION["game_state"]["get_line_loaded"] = true;
    exit;

} catch (PDOException $e) {
    error_log('getLine.php -> PDOException: ' . $e->getMessage());
    http_response_code(500);
    echo json_encode(['type' => 'error', 'message' => $e->getMessage()]);
    exit;
}
